import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { StatusVaga, Vaga } from '../types/Vaga';
import { stages } from '../types/stages';
import { validateVaga } from '../security/vagaValidation';
export function NewVagaModal({ status, onClose, onSave }: { status: StatusVaga; onClose: () => void; onSave: (vaga: Vaga) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState('');
  useEffect(() => { dialog.current?.showModal(); }, []);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      const vaga = validateVaga({ id: crypto.randomUUID(), empresa: data.get('empresa'), cargo: data.get('cargo'), status: data.get('status'), link: data.get('link'), salario: data.get('salario'), modalidade: data.get('modalidade') });
      setError('');
      onSave(vaga);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível adicionar a vaga.');
    }
  }
  return <dialog ref={dialog} className="vaga-modal" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }} aria-labelledby="modal-title"><div className="modal-heading"><div><p className="eyebrow">UMA NOVA POSSIBILIDADE</p><h2 id="modal-title">Adicionar vaga</h2></div><button className="close-modal" onClick={onClose} aria-label="Fechar">×</button></div><p>Guarde uma oportunidade e acompanhe cada etapa.</p><form onSubmit={submit}>
    <label>Empresa *<input autoFocus name="empresa" required maxLength={100} pattern=".*\S.*" placeholder="Ex.: Nubank" /></label>
    <label>Cargo *<input name="cargo" required maxLength={120} pattern=".*\S.*" placeholder="Ex.: Desenvolvedor Júnior" /></label>
    <div className="form-row"><label>Etapa<select name="status" defaultValue={status}>{stages.map(s => <option key={s.status} value={s.status}>{s.title}</option>)}</select></label><label>Modalidade<select name="modalidade"><option>A definir</option><option>Remoto</option><option>Híbrido</option><option>Presencial</option></select></label></div>
    <label>Link da vaga<input name="link" type="url" maxLength={2048} placeholder="https://..." /></label><label>Salário mensal (R$)<input name="salario" type="number" min="0" max="999999999.99" step="0.01" placeholder="Ex.: 4500" /></label>
    {error && <p role="alert" className="storage-error">{error}</p>}
    <div className="modal-actions"><button type="button" className="secondary" onClick={onClose}>Cancelar</button><button className="primary" type="submit">Salvar vaga ↗</button></div></form></dialog>;
}

