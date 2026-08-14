import Header from "@/components/Header"
import { getProjects } from "@/lib/project/getProjects"
import Link from "next/link"
import ProjectListCard from "./components/ProjectListCard";

export const dynamic = "force-dynamic";

export default async function Projects () {
    const projects = await getProjects();


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
                    [grid-template-columns:repeat(auto-fit,minmax(500px,1fr))]">
                {projects.map(project => (
                    <ProjectListCard key={project.title} project={project}/>
                ))}
            </section>
        </main>
    );
};