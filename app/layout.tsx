import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

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
		<html lang="ko">
			<body>
				<Header />
				{children}
			</body>
		</html>
  	);
}
