import { useState } from 'react';
import { Card } from './Card';
import type { StatusVaga, Vaga } from '../types/Vaga';
interface ColumnProps { title: string; status: StatusVaga; color: string; vagas: Vaga[]; onAdd: () => void; onMove: (id: string, status: StatusVaga) => void }
export function Column({ title, status, color, vagas, onAdd, onMove }: ColumnProps) {
  const [over, setOver] = useState(false);
  return <section aria-label={title} className={`column ${color} ${over ? 'drag-over' : ''}`} onDragOver={e => { e.preventDefault(); setOver(true); }} onDragLeave={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOver(false); }} onDrop={e => { e.preventDefault(); setOver(false); onMove(e.dataTransfer.getData('text/plain'), status); }}>
    <div className="column-heading"><h3><i />{title}<span>{vagas.length}</span></h3><button aria-label={`Adicionar vaga em ${title}`} onClick={onAdd}>＋</button></div>
    <div className="column-cards">{vagas.map(v => <Card key={v.id} vaga={v} onMove={onMove} />)}{!vagas.length && <div className="empty-column"><span>{status === 'CONTRATADO' ? '✧' : '▧'}</span><p>{status === 'CONTRATADO' ? 'Sua próxima conquista' : 'Novas possibilidades'}</p><small>{status === 'CONTRATADO' ? 'Uma boa notícia merece este espaço.' : 'Arraste uma vaga para esta etapa.'}</small></div>}</div>
    <button className="add-card" onClick={onAdd}>＋ Adicionar vaga</button>
  </section>;
}
