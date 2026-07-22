"use client";
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react";


export default function Logo () {
    // 클릭마다 불필요한 리렌더링을 막기 위해 클릭 변수를 useRef로 사용
    const clickCountRef = useRef(0);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const router = useRouter();

    const handleMoveAdmin = async () => {
        clickCountRef.current += 1;

        // 클릭을 시작하면 2초 카운트 시작
        if ( clickCountRef.current === 1 ) {
            timerRef.current = setTimeout(() => {
                clickCountRef.current = 0;
                timerRef.current = null;
            }, 2000);
        };

        // 2초안에 5번 클릭을 성공하면 관리자 페이지로 이동
        // 그리고 타이머 변수, 클릭 변수 초기화
        if ( clickCountRef.current >= 5 ) {
            // 로그인 상태 확인
            const res = await fetch('/api/admin/session');
            const data = await res.json();
            
            // 로그인 중이라면 메시지 출력
            if ( data ) return alert("이미 로그인 중");

            if ( timerRef.current ) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }

            clickCountRef.current = 0;

            router.push("/dhAdmin");
        };
    };

    useEffect(() => {
        return() => {
            if ( timerRef.current ) {
                clearTimeout(timerRef.current);
            };
        };
    }, []);

    return (
        <span 
            onClick={handleMoveAdmin}
            className="
                text-4xl font-bold tracking-widest
                cursor-default select-none
                dark:text-white">
            D.H
        </span>
    );
};