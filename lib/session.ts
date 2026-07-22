import crypto from "crypto";
import { cookies } from "next/headers";
import { sql } from "./sql";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_DURAION = 1000 * 60 * 60 *24 * 7;

type Session = {
    session_id: number;
    session_token_hash: string;
    expires_at: Date;
    created_at: Date;
};

const hashSessionToken = (token: string) => {
    return crypto.createHash("sha256").update(token).digest("hex");
};

export async function createSession () {
    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = hashSessionToken(token);
    const expiresAt = new Date(Date.now() + SESSION_DURAION);

    await sql`
        insert into sessions (
            session_token_hash,
            expires_at
        )
        values (
            ${tokenHash},
            ${expiresAt}
        )
    `;

    const cookieStore = await cookies();

    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: expiresAt,
        path: "/",
    }); 
};

export async function getSession (): Promise<Session | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    
    if ( !token ) return null;

    const tokenHash = hashSessionToken(token);

    const rows = await sql<Session[]>`
        select * 
        from sessions
        where session_token_hash = ${tokenHash}
        limit 1;
    `;

    const session = rows[0];

    if ( !session ) return null;

    const isExpired = new Date(session.expires_at).getTime() <= Date.now();

    if ( isExpired ) {
        await sql`
            delete from sessions
            where session_id = ${session.session_id}
        `;

        cookieStore.delete(SESSION_COOKIE_NAME);

        return null;
    }

    return session;
}