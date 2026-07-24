"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect, useState } from "react";
import settingDarkMode from "@/public/settingDarkMode.png";
import settingLightMode from "@/public/settingLightMode.png";
import Image from "next/image";
import { useHeroQuery } from "@/hooks/useHeroQuery";
import { useQueryClient } from "@tanstack/react-query";

export default function HeroSection () {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const isAuthchecked = useAuthStore(state => state.isAuthchecked);
    const currentTheme = useThemeStore(state => state.currentTheme);
    const { data: hero, isLoading, isError } = useHeroQuery();
    const [editStatus, setEditStatus] = useState(false);
    const [heroView, setHeroView] = useState([
        { view: "" },
        { view: "" },
        { view: "" },
        { view: "" },
    ]);
    const queryClient = useQueryClient();

    useEffect(() => {
        if ( !hero ) return;

        setHeroView([
            { view: hero?.title ?? "" },
            { view: hero?.name ?? "" },
            { view: hero?.suffix ?? "" },
            { view: hero?.description ?? "" },
        ])
    }, [hero])

    if ( isLoading ) {
        return <div className="w-full h-dvh">로딩 중...</div>;
    };

    if ( isError ) {
        return <div className="w-full h-dvh">Hero section의 정보를 불러오지 못했습니다.</div>
    };

    // 서버에서 불러 온 hero 섹션의 정보를 배열로 저장

    
    // 클릭 시 수정 모드로 변경
    const handleEdit = () => {
        setEditStatus(true);
    };

    // 수정한 내용을 저장하는 함수
    const handleSave = async () => {
        const res = await fetch("/api/hero", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: heroView[0].view,
                name: heroView[1].view,
                suffix: heroView[2].view,
                description: heroView[3].view,
            })
        });
        queryClient.invalidateQueries({ queryKey: ["hero"] });
        setEditStatus(false);
    };

    return (
        <section 
            id="hero" data-section
            className="
                relative isolate overflow-hidden
                w-full h-dvh 
                flex justify-center items-center
                bg-stone-50 px-6
                dark:bg-zinc-900">
            <div
                aria-hidden="true"
                className="
                    pointer-events-none absolute inset-0 -z-30
                    opacity-[0.035] dark:opacity-[0.06]
                    [background-image:linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)]
                    [background-size:48px_48px]
                    dark:[background-image:linear-gradient(to_right,#fafaf9_1px,transparent_1px),linear-gradient(to_bottom,#fafaf9_1px,transparent_1px)]"/>
            <div
                aria-hidden="true"
                className="
                    pointer-events-none absolute
                    -left-32 top-10 -z-20
                    h-80 w-80 rounded-full
                    bg-amber-400/20 blur-[120px]
                    dark:bg-amber-500/15"/>
            <div
                aria-hidden="true"
                className="
                    pointer-events-none absolute
                    -bottom-20 right-0 -z-20
                    h-96 w-96 rounded-full
                    bg-orange-300/20 blur-[140px]
                    dark:bg-orange-500/10"/>
            {/* 관리자 로그인 시 표시되는 수정 아이콘 */}
            {isAuthchecked && isLoggedIn && 
            <button
                type="button"
                onClick={handleEdit}
                aria-label="히어로 섹션 수정"
                className="
                    absolute right-5 top-5 z-20
                    flex size-11 items-center justify-center
                    rounded-full
                    bg-white/70 shadow-sm backdrop-blur-sm
                    cursor-pointer
                    transition duration-200
                    hover:-translate-y-0.5 hover:shadow-md
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-amber-500
                    dark:bg-stone-100">
                <Image 
                    className="size-6"
                    src={currentTheme === "dark" ? settingDarkMode : settingLightMode}
                    alt="수정" />
            </button>}
            
            {/* 옵션에 따라 표시되는 화면 */}
            {editStatus 
                ? 
            // 수정 화면
            <div 
                className="
                    w-full max-w-xl
                    rounded-3xl border border-stone-200
                    bg-white/80 p-6
                    shadow-xl backdrop-blur-md
                    dark:border-zinc-700
                    dark:bg-zinc-800/80">
                <div
                    className="flex flex-col gap-3">
                    {heroView.map((e, idx) => (
                        <input 
                            key={idx} value={e.view}
                            onChange={(e) => {
                                const value = e.target.value;

                                setHeroView(prev => 
                                    prev.map((item, i) => 
                                        i === idx ? {...item, view: value} : item
                                    )    
                                )
                            }} 
                            className="
                                w-full rounded-xl
                                border border-stone-300
                                bg-white px-4 py-3
                                text-zinc-800 outline-none
                                transition
                                focus:border-amber-500
                                focus:ring-2 focus:ring-amber-500/20
                                dark:border-zinc-600
                                dark:bg-zinc-900
                                dark:text-stone-100"/>
                    ))}
                </div>
                <button 
                    type="button"
                    onClick={handleSave}
                    className="
                        mt-5 w-full rounded-xl
                        bg-amber-500 px-4 py-3
                        font-semibold text-white
                        cursor-pointer
                        transition duration-300
                        hover:bg-amber-600
                        active:scale-[0.98]">
                    완료
                </button>
            </div>
                :
            // 보여지는 화면
            <div 
                className="
                    mx-auto flex max-w-4xl
                    flex-col items-center
                    text-center
                    text-zinc-800
                    dark:text-stone-100">
                <h1 
                    className="
                        hero-fade-up
                        text-xl font-medium
                        tracking-[0.15em]
                        text-zinc-500
                        dark:text-stone-400">
                    {heroView[0].view}
                </h1>
                <div 
                    className="
                        flex items-end
                        hero-fade-up hero-delay-1
                        mt-8
                        tracking-tight">
                    <h1 
                        className="
                            text-amber-500
                            text-4xl font-bold
                            sm:text-5xl
                            lg:text-7xl">
                        {heroView[1].view}
                    </h1>
                    <h1 className="ml-2 text-xl">
                        {heroView[2].view}
                    </h1>
                </div>
                <p 
                    className="
                        hero-fade-up hero-delay-2
                        mt-12 max-w-2xl
                        text-base font-medium
                        leading-8
                        text-zinc-600
                        sm:text-xl
                        lg:text-3xl
                        dark:text-stone-300">
                    {heroView[3].view}
                </p>
                <div
                    aria-hidden="true"
                    className="
                        hero-fade-up hero-delay-3
                        mt-15 h-px w-16
                        bg-amber-500"/>
            </div>}
        </section>
    );
};