import githubBlack from "@/public/githubBlack.svg";
import githubWhite from "@/public/githubWhite.svg";
import lightMode from"@/public/lightMode.png";
import darkMode from "@/public/darkMode.png";
import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";

export default function Header () {

    return ( 
        <header
            className="  
                sticky top-0 left-0
                w-full h-15 shadow-sm
                bg-white">
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
                        basis-1/3 text-center">
                    
                </div>

                {/* 이름, 깃허브 링크, 다크모드 */}
                <div
                    className="
                        basis-1/3 flex justify-center items-center gap-10">
                    <span>
                        윤동현
                    </span>
                    <Link
                        href="https://github.com/kokiku1700"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            relative w-10 h-10">
                        <Image 
                            src={githubBlack} 
                            alt="깃허브 링크"
                            fill
                            priority/>
                    </Link>
                    <button
                        className="
                            relative w-10 h-10
                            cursor-pointer">
                        <Image 
                            src={darkMode}
                            alt="다크모드"
                            fill
                            priority/>
                    </button>
                </div>
            </div>
            
        </header>
    )
}