import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "윤동현 - 포트폴리오 작성/수정",
  	description: "프론트엔드 개발자 윤동현의 포트폴리오 수정.",
};

export default function RootLayout({
  	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
  	return (
		<>
		    {children}	
		</>
  	);
}
