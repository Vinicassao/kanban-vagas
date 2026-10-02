import { stages } from "../types/stages";
import { useState } from "react";
import { Column } from "./Column";
import { NewVagaModal } from "./NewVagaModal";
import type { StatusVaga } from "../types/Vaga";
import { useVagas } from "../hooks/useVagas";

export function Board() {
  const { vagas, storageError, stats, addVaga, moveVaga: move } = useVagas();
  const [modal, setModal] = useState<StatusVaga | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("TODAS");
  const [view, setView] = useState<"board" | "list">("board");
  const filtered = vagas.filter(
    (v) =>
      `${v.empresa} ${v.cargo}`
        .toLocaleLowerCase("pt-BR")
        .includes(query.toLocaleLowerCase("pt-BR")) &&
      (filter === "TODAS" || v.status === filter),
  );
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#">
          <span className="brand-mark">
            k<span>v</span>
          </span>
          <span>
            kanban<span className="brand-light">vagas</span>
            <small>SEU PRÓXIMO PASSO</small>
          </span>
        </a>
        <nav className="sidebar-nav" aria-label="Navegação principal">
          <a
            className="nav-item selected"
            href="#candidaturas"
            onClick={() => {
              setQuery("");
              setFilter("TODAS");
              setView("board");
            }}
          >
            <span aria-hidden="true">▦</span> Candidaturas <b>{vagas.length}</b>
          </a>
        </nav>
        <div className="profile">
          <span className="avatar">EU</span>
          <div>
            Meu espaço<small>Uma carreira de possibilidades</small>
          </div>
        </div>
      </aside>
      <div className="main-area">
        <main id="candidaturas">
          <div className="page-heading">
            <div>
              <p className="eyebrow">ORGANIZE HOJE. CONQUISTE AMANHÃ.</p>
              <h1>
                Seu próximo capítulo começa aqui<span>.</span>
              </h1>
              <p>
                Acompanhe suas oportunidades, do primeiro contato à conquista.
              </p>
            </div>
            <button className="primary" onClick={() => setModal("APLICADO")}>
              <span>＋</span> Nova vaga
            </button>
          </div>
          <section className="stats" aria-label="Resumo das candidaturas">
            {[
              [
                "Total de candidaturas",
                stats.total,
                "Todas as suas oportunidades",
                "▤",
              ],
              [
                "Em andamento",
                stats.active,
                "Possibilidades em movimento",
                "↗",
              ],
              [
                "Entrevistas",
                stats.interviews,
                "Hora de mostrar seu potencial",
                "◷",
              ],
              ["Conquistas", stats.hired, "O começo de um novo capítulo", "✧"],
            ].map(([label, value, detail, icon], index) => (
              <article className={`stat stat-${index}`} key={label}>
                <div className="stat-label">
                  {label}
                  <span className="stat-icon">{icon}</span>
                </div>
                <strong>{value.toString().padStart(2, "0")}</strong>
                <small>{detail}</small>
              </article>
            ))}
          </section>
          <section className="pipeline">
            <div className="section-heading">
              <div>
                <h2>
                  Minhas candidaturas <span>{vagas.length}</span>
                </h2>
                <p>Pequenos passos, grandes oportunidades.</p>
              </div>
              <span className="board-hint">
                Arraste os cartões para mudar de etapa
              </span>
            </div>
            <div className="toolbar">
              <div className="view-switch">
                <button
                  aria-pressed={view === "board"}
                  onClick={() => setView("board")}
                >
                  ▦ <span>Quadro</span>
                </button>
                <button
                  aria-pressed={view === "list"}
                  onClick={() => setView("list")}
                >
                  ☰ <span>Lista</span>
                </button>
              </div>
              <div className="filters">
                <label className="search">
                  <span aria-hidden="true">⌕</span>
                  <input
                    aria-label="Buscar vaga ou empresa"
                    placeholder="Buscar vaga ou empresa..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
                <select
                  aria-label="Filtrar por etapa"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="TODAS">Todas as etapas</option>
                  {stages.map((s) => (
                    <option key={s.status} value={s.status}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {storageError && (
              <p role="alert" className="storage-error">
                Não foi possível salvar no navegador. As alterações estão
                disponíveis apenas nesta sessão.
              </p>
            )}
            {view === "board" ? (
              <div className="board">
                {stages
                  .filter((s) => filter === "TODAS" || filter === s.status)
                  .map((s) => (
                    <Column
                      key={s.status}
                      {...s}
                      vagas={filtered.filter((v) => v.status === s.status)}
                      onAdd={() => setModal(s.status)}
                      onMove={move}
                    />
                  ))}
              </div>
            ) : (
              <div className="list-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Empresa</th>
                      <th>Cargo</th>
                      <th>Etapa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((v) => (
                      <tr key={v.id}>
                        <td>{v.empresa}</td>
                        <td>{v.cargo}</td>
                        <td>
                          <select
                            aria-label={`Etapa de ${v.empresa}`}
                            value={v.status}
                            onChange={(e) =>
                              move(v.id, e.target.value as StatusVaga)
                            }
                          >
                            {stages.map((s) => (
                              <option key={s.status} value={s.status}>
                                {s.title}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!filtered.length && (
                  <p className="empty-list">
                    Nenhuma vaga encontrada. Tente outra busca ou adicione uma
                    oportunidade.
                  </p>
                )}
              </div>
            )}
            <footer className="board-footer">
              <span>
                <i /> {filtered.length} oportunidades no seu radar
              </span>
              <span>Seu futuro, uma etapa de cada vez.</span>
            </footer>
          </section>
        </main>
      </div>
      {modal && (
        <NewVagaModal
          status={modal}
          onClose={() => setModal(null)}
          onSave={(vaga) => {
            addVaga(vaga);
            setModal(null);
          }}
        />
      )}
    </div>
  );
}
