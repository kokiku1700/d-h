"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export default function AuthInitializer () {
    const setLoggedIn = useAuthStore(state => state.setLoggedIn);
    const setAuthchecked = useAuthStore(state => state.setAuthChecked);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/admin/session");

                setLoggedIn(res.ok);
            } catch {
                setLoggedIn(false);
            } finally {
                setAuthchecked(true);
            }
        };

        checkAuth();
    }, [setLoggedIn, setAuthchecked]);

    return null;
};