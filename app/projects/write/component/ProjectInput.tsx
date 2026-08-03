type Porps = {
    name: string;
    type: string;
    value?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
}

export default function ProjectInput ({ name, type, value, onChange, placeholder }: Porps) {
    return (
        <input
            name={name} type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="
                w-full
                bg-transparent
                px-1 py-2
                text-zinc-900
                outline-none
                placeholder:text-zinc-400
                dark:text-stone-100
                dark:placeholder:text-zinc-500"/>
    )
}