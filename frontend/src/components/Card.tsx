import type { StatusVaga, Vaga } from "../types/Vaga";
import { stages } from "../types/stages";
import { safeExternalUrl } from "../security/vagaValidation";
export function Card({
  vaga,
  onMove,
}: {
  vaga: Vaga;
  onMove: (id: string, status: StatusVaga) => void;
}) {
  const { empresa, cargo } = vaga;
  const externalUrl = safeExternalUrl(vaga.link);
  return (
    <article
      className="job-card"
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/plain", vaga.id)}
    >
      <div className="card-top">
        <span
          className={`company-logo logo-${empresa.toLowerCase().replace(/[^a-z]/g, "")}`}
        >
          {empresa.slice(0, 2).toUpperCase()}
        </span>
        <span className="drag-handle" aria-hidden="true">
          ⠿
        </span>
      </div>
      <p className="company-name">{empresa}</p>
      <h4>{cargo}</h4>
      <div className="card-tags">
        <span>{vaga.modalidade || "A definir"}</span>
        <span>Oportunidade</span>
      </div>
      {vaga.salario && (
        <p className="salary">
          {Number(vaga.salario).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
          <small> / mês</small>
        </p>
      )}
      <div className="card-footer">
        <select
          aria-label={`Etapa de ${empresa}`}
          value={vaga.status}
          onChange={(e) => onMove(vaga.id, e.target.value as StatusVaga)}
        >
          {stages.map((s) => (
            <option key={s.status} value={s.status}>
              {s.title}
            </option>
          ))}
        </select>
        {externalUrl ? (
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir vaga de ${empresa}`}
          >
            ↗
          </a>
        ) : (
          <span aria-hidden="true">↗</span>
        )}
      </div>
    </article>
  );
}
