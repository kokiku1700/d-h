import Link from "next/link";

type Props = {
    url: string;
}

export default function ViewMoreButton ({ url }: Props) {

    return (
        <Link
            href={`/${url}`}
            className="
                group inline-flex items-center gap-2
                p-5 m-5
                text-sm font-medium
                text-zinc-600
                transition-colors duration-200

                hover:text-amber-500

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-amber-500
                focus-visible:ring-offset-4

                dark:text-zinc-300
                dark:hover:text-amber-400">
            More
            <span
                className="
                    transition-transform duration-300
                    group-hover:translate-x-1">
                →
            </span>  
        </Link>
    );
};