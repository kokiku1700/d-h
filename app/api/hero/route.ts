import { sql } from "@/lib/sql";


export async function GET () {
    try {
        const rows = await sql`
            select id, title, name, suffix, description
            from hero_sections
            limit 1;
        `;

        if ( rows.length === 0 ) {
            return Response.json(
                {
                    ok: false,
                    message: "Hero section의 데이터가 없습니다."
                },
                {
                    status: 404,
                }
            );
        };
        return Response.json(rows[0]);
    } catch {
        return Response.json(
            {
                ok: false,
                message: "Hero section의 데이터를 불러오지 못했습니다."
            },
            {
                status: 500,
            }
        );
    };
};

export async function POST ( req: Request ) {
    const { title, name, suffix, description } = await req.json();

    const hero = await sql`
        select id
        from hero_sections
        limit 1;
    `;

    if ( hero.length === 0 ) {
        await sql`
            insert into hero_sections (
                title,
                name, 
                suffix,
                description
            )
            values (
                ${title},
                ${name},
                ${suffix},
                ${description}
            )
        `;
        return Response.json({ ok: true });
    } else {
        await sql`
            update hero_sections
            set 
            title = ${title},
            name = ${name},
            suffix = ${suffix},
            description = ${description}
            where id = ${hero[0].id};
        `;
        return Response.json({ ok: true });
    };
};