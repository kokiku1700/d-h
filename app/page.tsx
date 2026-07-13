"use client";

import { useSectionStore } from "@/store/useSectionStore";
import HeroSection from "./components/HeroSection";
import PortfolioSection from "./components/PortfolioSection";
import { useEffect } from "react";

export default function Home() {
	const setCurrentSection = useSectionStore(state => state.setCurrentSection);

	useEffect(() => {
		const sections = document.querySelectorAll("[data-section");
		
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if ( !entry.isIntersecting ) return;

					setCurrentSection(entry.target.id as any);
				});
			},
			{
				threshold: 0.5,
			}
		);

		sections.forEach(section => observer.observe(section));

		return () => observer.disconnect();
	}, [setCurrentSection]);

    return (
        <main>
			<HeroSection />
			<PortfolioSection />
        </main>
    );
};