
type Props = {
    type: "submit" | "reset" | "button" | undefined;
    onClick: () => void;
};

export default function AddButton ({ type, onClick }: Props) {

    return (
        <button
            type={type}
            onClick={onClick}
            className="
                inline-flex w-fit items-center gap-1.5
                rounded-lg
                border border-zinc-300
                bg-white/60
                px-3 py-2
                text-sm font-medium
                text-zinc-700
                shadow-sm
                transition-all duration-300
                cursor-pointer

                hover:-translate-y-0.5
                hover:border-amber-500
                hover:bg-amber-50
                hover:text-amber-600
                hover:shadow-md

                active:translate-y-0
                active:scale-[0.98]

                focus-visible:outline-none
                focus-visible:ring-1
                focus-visible:ring-amber-500/40

                dark:border-zinc-600
                dark:bg-zinc-800/60
                dark:text-stone-300
                dark:hover:border-amber-500
                dark:hover:bg-amber-500/10
                dark:hover:text-amber-400">
            <span className="text-base leading-none">+</span>
        </button>
    )
}