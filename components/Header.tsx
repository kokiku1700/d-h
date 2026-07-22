"use client";

import githubBlack from "@/public/githubBlack.svg";
import githubWhite from "@/public/githubWhite.svg";
import lightMode from"@/public/lightMode.png";
import darkMode from "@/public/darkMode.png";
import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";
import { useSectionStore } from "@/store/useSectionStore";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function Header () {
    const currentSection = useSectionStore(state => state.currentSection);
    const { currentTheme, setCurrentTheme } = useThemeStore();
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);

    // 로컬 스토리지에 저장되어 있는 다크모드를 확인하고 적용
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        const initialTheme: "dark" | "light" = savedTheme === "dark" ? "dark" : "light";
        
        setCurrentTheme(initialTheme);

        document.documentElement.classList.toggle("dark", initialTheme === "dark");
    }, [setCurrentTheme]);

    // 다크모드 아이콘 클릭 시 각 모드로 변환
    const handleThemeToggle = () => {

        const html = document.documentElement;

        if ( html.classList.contains("dark") ) {
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }

        setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
    };

    return ( 
        <header
            className="  
                sticky top-0 left-0
                w-full h-15 shadow-sm shadow-gray-200
                bg-white
                dark:bg-black dark:shadow-white">
            <div 
                className="
                    w-full h-full
                    flex justify-center items-center">
                {/* 로고 */}
                <div
                    className="
                        basis-1/3 text-center">
                    <Logo />
                </div>

                {/* 섹션 제목 (메인 섹션이 아닐 경우 hidden) */}
                <div
                    className="
                        basis-1/3 text-center italic font-semibold
                        dark:text-white">
                    {currentSection}
                </div>

                {/* 이름, 깃허브 링크, 다크모드 */}
                <div
                    className="
                        basis-1/3 flex justify-center items-center gap-10">
                    <span className="dark:text-white">
                        윤동현
                    </span>
                    <Link
                        href="https://github.com/kokiku1700"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            relative w-10 h-10">
                        <Image 
                            src={currentTheme === "light" ? githubBlack : githubWhite} 
                            alt="깃허브 링크"
                            fill
                            priority/>
                    </Link>
                    <button
                        onClick={handleThemeToggle}
                        className="
                            relative w-10 h-10
                            cursor-pointer">
                        <Image 
                            src={currentTheme === "light" ? darkMode : lightMode}
                            alt="다크모드"
                            fill
                            sizes="(max-width: 768px) 40px, 64px"
                            priority/>
                    </button>
                </div>
            </div>
            
        </header>
    )
}