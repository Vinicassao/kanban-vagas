import { Column } from "./Column";

export function Board() {
  return (
    <div className="flex gap-6 p-8">
      <Column title="Aplicado"/>
      <Column title="Teste"/>
      <Column title="Entrevista"/>
      <Column title="Contratado"/>
      <Column title="Rejeitado"/>
    </div>
  );
}
