import { useQuery } from "@tanstack/react-query";


type AboutMe = {
    id: number;
    content: string;
};

export const useAboutMeQuery = () => {
    return useQuery<AboutMe>({
        queryKey: ["aboutme"],
        queryFn: async () => {
            const res = await fetch("/api/aboutme");

            if ( !res.ok ) {
                throw new Error("fetch error");
            };

            return res.json();
        },

        staleTime: 1000 * 60 * 5,
    });
};