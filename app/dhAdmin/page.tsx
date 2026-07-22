"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"

export default function DHAdmin () {
    const [password, setPassword] = useState("");
    const router = useRouter();

    // 입력한 비밀번호를 서버로 전송
    const handleLogin = async () => {
        if ( !password.trim() ) return;

        const res = await fetch("/api/password-check", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ password: password })
        });
        const data = await res.json();
        
        if ( data.ok ) {
            router.replace("/");
        } else {
            alert("비밀번호 확인")
        };
    };

    // 엔터를 누르면 로그인 기능 실행 
    const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ( e.key !== "Enter" ) return;

        handleLogin();
    };

    return (
        <main 
            className="
                w-full h-dvh bg-gray-100
                flex justify-center items-center
                dark:bg-black">
            <input 
                type="password" 
                value={password} onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleEnterKeyDown}
                className="
                    w-[10%] p-2 border
                    focus:outline-none 
                    dark:border-white dark:placeholder-white
                    dark:text-white" 
                placeholder="pw"/>
        </main>
    )
}