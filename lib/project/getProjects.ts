import { ProjectListItem } from "@/type/project";
import { sql } from "../sql";

// 프로젝트 목록을 가져온다.
export async function getProjects () {
    const project = await sql<ProjectListItem[]>`
        select *
        from projects;
    `;

    return project;
};