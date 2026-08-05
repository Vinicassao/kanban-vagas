import { Card } from "./Card";

interface ColumnProps {
  title: string;
}

export function Column({title}: ColumnProps) {
  return (
    <div className="bg-gray-100/50 p-4 rounded-xl w-80 min-h-[500px]">
      <h1 className="font-bold text-gray-700 text-lg mb-4">{title}</h1>
      <Card
      empresa=""
      cargo=""
      />
    </div>
  );
}
