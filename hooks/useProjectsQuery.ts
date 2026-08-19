import { useQuery } from "@tanstack/react-query";
import { ProjectListItem } from "@/type/project";

export const useProjectsQuery = () => {
    return useQuery<ProjectListItem[]>({
        queryKey: ["projects"],
        queryFn: async () => {
            const res = await fetch("/api/project");

            if ( !res.ok ) {
                throw new Error("fetch error");
            };

            return res.json();
        },
        staleTime: 1000 * 60 * 5,
    });
};