import { useQuery } from "@tanstack/react-query"

type Hero = {
    id: number;
    title: string;
    name: string;
    suffix: string;
    description: string;
};

export const useHeroQuery = () => {
    return useQuery<Hero>({
        queryKey: ["hero"],
        queryFn: async () => {
            const res = await fetch("/api/hero");

            if ( !res.ok ) {
                throw new Error("fetch error");
            };

            return res.json();
        },
        staleTime: 1000 * 60 * 5,
    });
};