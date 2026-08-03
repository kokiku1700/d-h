type Option<T extends string | boolean> = {
    label: string;
    value: T;
};

type Props<T extends string | boolean> = {
    label: string;
    value: T;
    options: Option<T>[];
    onChange: (value: T) => void;
};

export default function ProjectOptionSelector<T extends string | boolean>({
    label, 
    value,
    options,
    onChange,
}: Props<T>) {
    return (
        <div className="flex flex-col gap-2">
            <span>{label}</span>

            <ul className="flex flex-wrap gap-2">
                {options.map(option => {
                    const isSelected = value === option.value;

                    return (
                        <li key={String(option.value)}>
                            <button
                                type="button"
                                onClick={() => onChange(option.value)}
                                aria-pressed={isSelected}
                                className={`
                                    min-w-20 p-2
                                    rounded-md
                                    ring-1 ring-amber-500
                                    transition duration-200
                                    ${
                                        isSelected
                                            ? "bg-amber-500 cursor-default"
                                            : "cursor-pointer hover:bg-amber-100"
                                    }
                                `}
                            >
                                {option.label}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};