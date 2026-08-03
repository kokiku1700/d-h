type Props = {
    text: string;
    type?: "button" | "submit";
    variant: "primary" | "secondary";
    loading?: boolean;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const variants = {
    primary: `
        bg-amber-500
        text-zinc-950
        hover:bg-amber-400
        active:bg-amber-600
    `,
    secondary: `
        border border-zinc-300
        bg-white
        text-zinc-700
        hover:bg-zinc-100

        dark:border-zinc-600
        dark:bg-zinc-500
        dark:text-stone-200
        dark:hover:bg-zinc-400
    `,
};

export default function Button({
    text,
    type,
    variant,
    loading = false,
    disabled,
    onClick
}: Props) {
    return (
        <button
            type={type}
            disabled={loading}
            onClick={onClick}
            className={`
                inline-flex min-w-36
                items-center justify-center gap-2
                rounded-xl
                bg-amber-500
                px-6 py-3

                text-sm font-semibold
                text-zinc-950

                shadow-sm
                transition-all duration-200

                cursor-pointer

                ${variants[variant]}

                hover:-translate-y-0.5
                hover:bg-amber-400
                hover:shadow-md

                active:translate-y-0
                active:bg-amber-600

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-amber-500
                focus-visible:ring-offset-2

                disabled:cursor-not-allowed
                disabled:opacity-60
                disabled:hover:translate-y-0

                dark:ring-offset-zinc-900`}>
                {loading && (
                    <span
                        className="
                            h-4 w-4
                            animate-spin
                            rounded-full
                            border-2 border-zinc-950/30
                            border-t-zinc-950"/>
                )}
            {text}
        </button>
    );
}