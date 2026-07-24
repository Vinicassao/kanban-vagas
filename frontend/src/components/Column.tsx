import { Card } from "./Card";

interface ColumnProps {
  title: string;
}

export function Column({title}: ColumnProps) {
  return (
    <div>
      <h1>{title}</h1>
      <Card
      empresa=""
      cargo=""
      />
    </div>
  );
}
