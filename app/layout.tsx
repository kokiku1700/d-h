import type { Metadata } from "next";
import "./globals.css";
import AuthInitializer from "@/components/AuthInitializer";
import Providers from "./providers";
import Script from "next/script";

export const metadata: Metadata = {
	title: "윤동현 - 포트폴리오",
  	description: "프론트엔드 개발자 윤동현의 포트폴리오입니다.",
};

export default function RootLayout({
  	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
  	return (
		<html lang="ko" suppressHydrationWarning>
			<body 
				className="
					bg-stone-50 text-zinc-900
      				dark:bg-zinc-900 
					dark:text-stone-100">
				<Script id="theme" strategy="beforeInteractive">
					{`
						const theme = localStorage.getItem("theme");
						const prefersDark = window.matchMedia("(prefers-color-scjeme: dark)").matchs;

						if ( theme === "dark" || ( !theme && window.matchMedia("(prefers-color-scheme: dark)")) ) {
							document.documentElement.classList.add("dark");
						}
					`}
				</Script>
				<Providers>
					<AuthInitializer />
					{children}
				</Providers>
			</body>
		</html>
  	);
}
