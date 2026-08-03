
type Porps = {
    label: string;
    name: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    placeholder?: string;
}

export default function ProjectTextArea ({ label, name, value, onChange, placeholder }: Porps) {

    return (
        <label className="group flex flex-col">
             <span
                className="
                    text-zinc-800
                    transition-colors
                    duration-500
                    group-focus-within:text-amber-500

                    dark:text-stone-300">
                {label}
            </span>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="
                    w-full h-60 resize-y rounded-lg
                    border border-zinc-800
                    bg-transparent px-4 py-3 mt-2
                    text-zinc-900 outline-none
                    transition-[border-color,box-shadow] duration-300
                    placeholder:text-zinc-400

                    focus:border-amber-500
                    focus:ring-1
                    focus:ring-amber-500/15

                    dark:border-zinc-600
                    dark:text-stone-100
                    dark:placeholder:text-zinc-500"/>
        </label>
    );
};