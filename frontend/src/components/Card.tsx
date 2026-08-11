interface CardProps {
  empresa: string;
  cargo: string;
}

export function Card({ empresa, cargo }: CardProps) {
  return (
    <div className="p-5 max-w-sm rounded-xl bg-white border border-gray-100 shadow-md transition-all duration-200 hover:shadow-lg hover:border-blue-100 hover:-translate-y-1 cursor-grab">
      <div className="flex gap-3">
        <span className="text-gray-400 select-none">⋮⋮</span>
        <div>
          <p className="text-xs font-semibold tracking-wider text-blue-600 uppercase mb-1">
            {empresa}
          </p>
          <p className="text-lg font-bold text-gray-800">{cargo}</p>
        </div>
      </div>
    </div>
  );
}
