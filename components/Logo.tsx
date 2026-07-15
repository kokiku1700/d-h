"use client";
import { useRouter } from "next/navigation"


export default function Logo () {
    const router = useRouter();

    const handleMoveHome = () => {
        router.push("/");
    };

    return (
        <span 
            onClick={handleMoveHome}
            className="
                text-4xl font-bold tracking-widest
                cursor-pointer
                dark:text-white">
            D.H
        </span>
    );
};