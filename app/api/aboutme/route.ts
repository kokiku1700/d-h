import { getSession } from "@/lib/session";
import { sql } from "@/lib/sql";


export async function GET () {
    const rows = await sql`
        select *
        from aboutme_sections
        limit 1;
    `;

    return Response.json(rows[0]);
};

export async function PATCH ( req: Request ) {
    const session = await getSession();

    if ( !session ) {
        return Response.json(
            {
                ok: false,
                message: "로그인이 필요합니다."
            },
            {
                status: 401,
            }
        );
    };
    
    const { content } = await req.json();

    const rows = await sql`
        update aboutme_sections
        set content = ${content} 
        where id = (
            select id 
            from aboutme_sections
            limit 1
        )
        returning *;
    `;

    return Response.json(rows[0]);
};