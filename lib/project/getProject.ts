import { DetailProjectFeature, DetailProjectImage, DetailProjectTechStack, DetailProjectTroubleshooting, ProjectListItem } from "@/type/project";
import { sql } from "../sql";


export async function getProject ( id: string ) {
    const project = await sql<ProjectListItem[]>`
        select *
        from projects
        where project_id = ${id};
    `;

    const projectFeatures = await sql<DetailProjectFeature[]>`
        select *
        from project_features
        where project_id = ${id};
    `;

    const projectTechStacks = await sql<DetailProjectTechStack[]>`
        select * 
        from project_tech_stacks
        where project_id = ${id};
    `;

    const projectTroubleshootings = await sql<DetailProjectTroubleshooting[]>`
        select * 
        from project_troubleshootings
        where project_id = ${id};
    `;

    const projectImages = await sql<DetailProjectImage[]>`
        select *
        from project_images
        where project_id = ${id};
    `;

    return { 
        project: project[0] ?? null, 
        projectFeatures, 
        projectTechStacks,
        projectTroubleshootings,
        projectImages
    };
};