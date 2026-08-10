import { sql } from "@/lib/sql";


// 프로젝트 저장
export async function POST ( req: Request ) {
    try {
        const body = await req.json();

        // 트랜잭션. 
        // 이렇게 묶으면 하나의 테이블에서 실패하게 되면 
        // 다른 테이블에도 값이 저장되지 않는다. 
        const res = await sql.begin(async (tx) => {
            const [{ max }] = await tx`
                select coalesce(max(sort_order), 0) as max
                from projects;
            `;

            const sortOrder = Number(max) + 1

            const projects = await tx `
                insert into projects (
                    title,
                    summary,
                    description,
                    started_at,
                    ended_at,
                    thumbnail_url,
                    github_url,
                    demo_url,
                    project_type,
                    role,
                    status,
                    retrospective,
                    is_featured,
                    sort_order
                ) values (
                    ${body.title},
                    ${body.summary},
                    ${body.description},
                    ${body.date.start},
                    ${body.date.end},
                    ${body.url.thumbnail},
                    ${body.url.github},
                    ${body.url.demo},
                    ${body.type},
                    ${body.role},
                    ${body.status},
                    ${body.retrospective},
                    ${body.featured},
                    ${sortOrder}
                )
                RETURNING project_id;
            `;

            const projectId = projects[0].project_id;

            for ( const feature of body.feature ) {
                await tx`
                    insert into project_features (
                        project_id,
                        title,
                        description,
                        sort_order
                    ) values (
                        ${projectId},
                        ${feature.title},
                        ${feature.description},
                        ${feature.sortOrder}
                    );
                `;
            };
            
            for ( const techStack of body.techStack ) {
                await tx`
                    insert into project_tech_stacks (
                        project_id,
                        name,
                        category,
                        description,
                        sort_order
                    ) values (
                        ${projectId},
                        ${techStack.name},
                        ${techStack.category},
                        ${techStack.description},
                        ${techStack.sortOrder} 
                    );
                `;
            };

            for ( const troubleshooting of body.troubleshooting ) {
                await tx`
                    insert into project_troubleshootings (
                        project_id,
                        title,
                        problem,
                        cause,
                        solution,
                        result,
                        sort_order
                    ) values (
                        ${projectId},
                        ${troubleshooting.title},
                        ${troubleshooting.problem},
                        ${troubleshooting.cause},
                        ${troubleshooting.solution},
                        ${troubleshooting.result},
                        ${troubleshooting.sortOrder} 
                    );
                `;
            };

            for ( const image of body.image ) {
                await tx`
                    insert into project_images (
                        project_id,
                        image_url,
                        alt_text,
                        caption,
                        sort_order
                    ) values (
                        ${projectId},
                        ${image.url},
                        ${image.alt},
                        ${image.caption || null},
                        ${image.sortOrder} 
                    );
                `;
            };

            return { projectId };
        });

        return Response.json(
            {
                ok: true,
                projectId: res.projectId,
            },
            {
                status: 201,
            }
        );
    } catch ( error ) {
        console.log(error);

        return Response.json(
            {
                ok: false,
                message: 
                    error instanceof Error
                        ? error.message
                        : "프로젝트 저장 중 오류가 발생했습니다.",
            },
            {
                status: 500,
            }
        )
    };
};