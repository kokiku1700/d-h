import Link from "next/link";

type Props = {
    url: string;
}

export default function ViewMoreButton ({ url }: Props) {

    return (
        <Link
            href={`/${url}`}
            className="
                absolute right-5 top-5 z-20
                flex size-11 items-center justify-center
                rounded-full
                bg-white/70 shadow-sm backdrop-blur-sm
                cursor-pointer
                transition duration-200
                hover:-translate-y-0.5 hover:shadow-md
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-amber-500
                dark:bg-stone-100">
            <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
            </svg>   
        </Link>
    );
};