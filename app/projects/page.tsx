import Header from "@/components/Header"
import Link from "next/link"


export default function Projects () {

    return (
        <main 
            className="
                relative
                w-full min-h-dvh 
                text-center
                dark:bg-zinc-800">
            <Header mainWhether={false} />
            <div className="grid grid-cols-3 w-full py-10">
                <div />
                <h1 
                    className="
                        text-2xl font-medium ">
                    프로젝트 목록
                </h1>
                <div>
                    <Link 
                        href="/projects/write"
                        className="
                            rounded-lg
                            border border-amber-400
                            px-5 py-2
                            font-medium
                            text-amber-500 cursor-pointer
                            transition duration-200
                            hover:bg-amber-50">
                        <span className="text-lg leading-none">+</span>
                        작성
                    </Link>
                </div>

            </div>
            
            <section
                className="
                    w-[95%] mx-auto
                    grid gap-6 
                    [grid-template-columns:repeat(auto-fit,minmax(400px,1fr))]">
                <div className="border">
                    프로젝트 1
                </div>
                <div className="border">
                    프로젝트 1
                </div>
                <div className="border">
                    프로젝트 1
                </div>
                <div className="border">
                    프로젝트 1
                </div>
                <div className="border">
                    프로젝트 1
                </div>

            </section>
            
        </main>
    )
}