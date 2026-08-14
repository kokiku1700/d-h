import { sql } from "@/lib/sql";

export async function DELETE ( req: Request ) {
    const { title } = await req.json();

    await sql`
        delete from projects
        where title = ${title};   
    `;

    return Response.json({
        ok: true,
    });
};