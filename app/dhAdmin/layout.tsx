import { Metadata } from "next";


export const metadata: Metadata = {
    title: "D.H - 관리자 로그인",
    description: "포트폴리오 관리를 위한 접속 페이지",
};

export default function RootLayout ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div>
            {children}
        </div>
    )
}