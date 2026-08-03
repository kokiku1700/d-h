"use client";

import { useSectionStore, Section } from "@/store/useSectionStore";
import HeroSection from "./HeroSection";
import ProjectSection from "./ProjectSection";
import { useEffect } from "react";
import Header from "@/components/Header";
import MyInfoSection from "./MyInfoSection";

export default function Main () {
	// zustand 상태 변경을 위한 변수 선언
	const setCurrentSection = useSectionStore(state => state.setCurrentSection);

	// 섹션 이동 시 세션 이름 표시
	useEffect(() => {
		// 메인 페이지에서 data-section을 가진 모든 섹션을 불러옴.
		const sections = document.querySelectorAll("[data-section]");
		
		// 불러온 섹션을 순환
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					// isIntersecting은 해당 섹션이 밖에 있으면 false,
					// 안에 있으면 true를 반환

					if ( !entry.isIntersecting ) return;

					// true일 시 스토어에 해당 섹션 이름 저장
					setCurrentSection(entry.target.id as Section);
				});
			},
			{
				// 화면에 얼마나 보여야 true를 반환하는 지 기준
				// 0.7은 70%
				// 즉, 해당 섹션이 화면에 70%이상 보이면 true
				threshold: 0,
            	rootMargin: "-45% 0px -45% 0px",
			}
		);

		sections.forEach(section => observer.observe(section));

		return () => observer.disconnect();
		// setCurrentSection 함수를 의존성 배열로 넣었는데 
		// 이건 거의 변경될 일이 없어서 []이랑 동일하게 보면 된다. 
		// 그런데 넣은 이유는 Hook 규칙과 ESLint는 안에 들어간 외부 값을 
		// 의존성 배열에 넣는 것을 권장한다.  
	}, [setCurrentSection]);

    return (
        <main 
			className="relative isolate">
			<div
                aria-hidden="true"
                className="
                    pointer-events-none absolute inset-0 -z-10
                    opacity-[0.035] dark:opacity-[0.06]
                    [background-image:linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)]
                    [background-size:48px_48px]
                    dark:[background-image:linear-gradient(to_right,#fafaf9_1px,transparent_1px),linear-gradient(to_bottom,#fafaf9_1px,transparent_1px)]"/>
			<Header mainWhether={true} />
			<HeroSection />
			<ProjectSection />
			<MyInfoSection />
        </main>
    )
}