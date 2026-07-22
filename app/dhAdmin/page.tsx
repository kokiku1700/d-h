import { getSession } from "@/lib/session";
import AdminLogin from "./component/AdminLogin";
import { redirect } from "next/navigation";

export default async function DHAdmin () {
    const session = await getSession();

    if ( session ) {
        redirect("/");
    };

    return (
        <>
            <AdminLogin />
        </>
    );
};