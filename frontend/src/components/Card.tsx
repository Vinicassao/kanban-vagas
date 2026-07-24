interface CardProps {
    empresa: string;
    cargo: string;
}

export function Card({empresa, cargo}: CardProps) {
    return (
        <div>
            <p>{empresa}</p>
            <p>{cargo}</p>
        </div>
    )
}