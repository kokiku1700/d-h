import { createSession } from "@/lib/session";
import bcrypt from "bcrypt";

export async function POST ( req: Request ) {
    const { password } = await req.json();

    if ( !process.env.ADMIN_PASSWORD_HASH ) {
        return Response.json({ ok: false, message: "환경 변수 비밀번호가 없습니다."});
    };

    const isMatch = await bcrypt.compare(
        password,
        process.env.ADMIN_PASSWORD_HASH!
    );

    if ( !isMatch ) {
        return Response.json(
            {
                ok: false, 
                message: "비밀번호가 일치하지 않습니다.",
            },
            {
                status: 401,
            }
        );
    };

    await createSession();

    return Response.json({ ok: true });
};