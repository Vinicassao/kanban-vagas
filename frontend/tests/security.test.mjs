import assert from 'node:assert/strict';
import { test } from 'node:test';
import { safeExternalUrl, validateVaga, validateVagas } from '../src/security/vagaValidation.ts';
import { loadVagas, saveVagas } from '../src/services/vagasStorage.ts';

const valid = { id: '1', empresa: 'Empresa', cargo: 'Desenvolvedor', status: 'APLICADO' };

for (const url of [
  'javascript:alert(1)', 'JaVaScRiPt:alert(1)', 'data:text/html,<script>alert(1)</script>',
  'vbscript:msgbox(1)', '//example.com', '/relative', 'https://user:secret@example.com',
  'java\nscript:alert(1)', 'https://example.com/\u0000', 'not a url', {},
]) {
  test(`bloqueia URL insegura: ${JSON.stringify(url)}`, () => {
    assert.equal(safeExternalUrl(url), null);
  });
}

test('normaliza URL absoluta HTTP/HTTPS e preserva query string', () => {
  assert.equal(safeExternalUrl(' HTTPS://EXAMPLE.COM/vaga?q=react '), 'https://example.com/vaga?q=react');
  assert.equal(safeExternalUrl('http://example.com'), 'http://example.com/');
});

test('valida, apara espaços e descarta campos não previstos', () => {
  const vaga = validateVaga({ ...valid, empresa: ' Empresa ', token: 'nao-persistir', admin: true });
  assert.equal(vaga.empresa, 'Empresa');
  assert.equal('token' in vaga, false);
  assert.equal('admin' in vaga, false);
});

test('rejeita tipos, tamanhos, controles e enums inválidos', () => {
  for (const changes of [
    { empresa: '' }, { empresa: '   ' }, { empresa: 'a'.repeat(101) },
    { cargo: 'a'.repeat(121) }, { empresa: {} }, { cargo: 'texto\u0000' },
    { status: 'ADMIN' }, { modalidade: 'desconhecida' }, { modalidade: {} },
    { link: [] }, { link: 'javascript:alert(1)' }, { link: `https://example.com/${'a'.repeat(2048)}` },
    { salario: '-1' }, { salario: 'Infinity' }, { salario: 'NaN' }, { salario: '1.234' },
    { salario: '1000000000' }, { salario: 100 },
  ]) assert.throws(() => validateVaga({ ...valid, ...changes }));
});

test('aceita salário zero, centavos, acentos e texto literal', () => {
  assert.equal(validateVaga({ ...valid, salario: '0' }).salario, '0');
  assert.equal(validateVaga({ ...valid, salario: '4500.50' }).salario, '4500.50');
  const empresa = '<img src=x onerror=alert(1)>';
  assert.equal(validateVaga({ ...valid, empresa, cargo: 'Desenvolvedor Sênior' }).empresa, empresa);
});

test('rejeita listas inválidas e IDs duplicados', () => {
  assert.throws(() => validateVagas({}));
  assert.throws(() => validateVagas([valid, valid]));
  assert.throws(() => validateVagas([valid, null]));
  assert.deepEqual(validateVagas([]), []);
});

test('armazenamento valida leitura e gravação sem confiar no JSON local', () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  let saved = null;
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
    getItem: () => saved,
    setItem: (_key, value) => { saved = value; },
  } });
  try {
    saveVagas([{ ...valid, token: 'segredo' }]);
    assert.equal(saved.includes('segredo'), false);
    assert.equal(loadVagas()[0].empresa, valid.empresa);
    const before = saved;
    assert.throws(() => saveVagas([{ ...valid, link: 'javascript:alert(1)' }]));
    assert.equal(saved, before);
    saved = JSON.stringify([{ ...valid, link: 'data:text/html,unsafe' }]);
    assert.ok(loadVagas().every(vaga => !vaga.link));
    assert.equal(saved.includes('data:text/html'), true); // A leitura não apaga dados.
    saved = '{broken';
    assert.doesNotThrow(loadVagas);
    saved = '[]';
    assert.deepEqual(loadVagas(), []);
  } finally {
    if (original) Object.defineProperty(globalThis, 'localStorage', original);
    else delete globalThis.localStorage;
  }
});
