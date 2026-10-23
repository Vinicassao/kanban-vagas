import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { CreateVagaInput } from "../types/Vaga";
import { validateCreateVaga } from "../security/vagaValidation";
export function NewVagaModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (vaga: CreateVagaInput) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      const vaga = validateCreateVaga({
        empresa: data.get("empresa"),
        cargo: data.get("cargo"),
        link_vaga: data.get("link_vaga"),
        salario: data.get("salario"),
      });
      setError("");
      onSave(vaga);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Não foi possível adicionar a vaga.",
      );
    }
  }
  return (
    <dialog
      ref={dialog}
      className="vaga-modal"
      onCancel={onClose}
      aria-labelledby="modal-title"
    >
      <div className="modal-heading">
        <div>
          <p className="eyebrow">UMA NOVA POSSIBILIDADE</p>
          <h2 id="modal-title">Adicionar vaga</h2>
        </div>
        <button type="button" className="close-modal" onClick={onClose} aria-label="Fechar">
          ×
        </button>
      </div>
      <p>Novas vagas começam na etapa Aplicado. Depois, você pode movê-las no quadro.</p>
      <form onSubmit={submit}>
        <label>
          Empresa *
          <input
            autoFocus
            name="empresa"
            required
            maxLength={100}
            pattern=".*\S.*"
            placeholder="Ex.: Nubank"
          />
        </label>
        <label>
          Cargo *
          <input
            name="cargo"
            required
            maxLength={120}
            pattern=".*\S.*"
            placeholder="Ex.: Desenvolvedor Júnior"
          />
        </label>
        <label>
          Link da vaga
          <input
            name="link_vaga"
            type="url"
            maxLength={2048}
            placeholder="https://..."
          />
        </label>
        <label>
          Salário mensal (R$)
          <input
            name="salario"
            type="number"
            min="0"
            max="999999999.99"
            step="0.01"
            placeholder="Ex.: 4500"
          />
        </label>
        {error && (
          <p role="alert" className="storage-error">
            {error}
          </p>
        )}
        <div className="modal-actions">
          <button type="button" className="secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="primary" type="submit">
            Salvar vaga ↗
          </button>
        </div>
      </form>
    </dialog>
  );
}
