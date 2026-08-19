import Image from "next/image";
import Link from "next/link";
import { ProjectListItem } from "@/type/project";


type Props = {
    project: ProjectListItem;
    index: number;
};

export default function ProjectCard({
    project,
    index,
}: Props) {
    const isReverse = index % 2 !== 0;

    return (
        <article
            className={`
                w-full my-5
                flex flex-col gap-8
                md:items-center
                md:gap-14
                ${isReverse
                    ? "md:flex-row-reverse"
                    : "md:flex-row"
                }
            `}>
            {/* 이미지 */}
            <div
                className="
                    relative group
                    aspect-[16/10]
                    w-full
                    overflow-hidden
                    rounded-2xl
                    border border-stone-200
                    bg-stone-100 cursor-pointer
                    md:w-1/2
                    dark:border-zinc-700
                    dark:bg-zinc-800">
                {project.thumbnail_url ? (
                    <div>
                        <Image
                            src={project.thumbnail_url}
                            alt={`${project.title} 썸네일`}
                            fill
                            sizes="
                                (max-width: 768px) 100vw,
                                50vw"
                            className="
                                object-cover
                                transition-transform
                                duration-500
                                group-hover:scale-[1.03]"/>
                        <Link
                            href={`/projects/${project.project_id}`}
                            className="
                                absolute inset-0
                                flex items-center justify-center
                                bg-black/0
                                text-white/0
                                transition-all duration-300
                                group-hover:bg-black/20
                                group-hover:text-white">
                            프로젝트 보기 →
                        </Link>
                    </div>
                    
                ) : (
                    <div
                        className="
                            flex h-full
                            items-center justify-center
                            text-sm
                            text-stone-400
                            dark:text-zinc-500">
                        No Image
                    </div>
                )}
            </div>

            {/* 설명 */}
            <div
                className="
                    flex w-full
                    flex-col
                    md:w-1/2">
                <div
                    className="
                        mb-4
                        flex items-center
                        gap-2">
                    <span
                        className="
                            rounded-full
                            border border-amber-300
                            px-3 py-1
                            text-xs font-medium
                            text-amber-600
                            dark:border-amber-500/60
                            dark:text-amber-400">
                        {project.project_type}
                    </span>

                    <span
                        className="
                            text-xs
                            text-stone-400
                            dark:text-zinc-500">
                        {project.status}
                    </span>
                </div>

                <h3
                    className="
                        text-3xl font-bold
                        tracking-tight
                        text-zinc-900
                        md:text-4xl
                        dark:text-zinc-100">
                    {project.title}
                </h3>

                <p
                    className="
                        mt-5
                        max-w-xl
                        text-base
                        leading-7
                        text-stone-600
                        dark:text-zinc-300">
                    {project.summary}
                </p>

                {project.role && (
                    <p
                        className="
                            mt-5
                            text-sm
                            text-stone-500
                            dark:text-zinc-400">
                        {project.role}
                    </p>
                )}

                <div
                    className="
                        mt-8
                        flex items-center
                        gap-5">
                    {project.demo_url && (
                        <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                flex items-center gap-2
                                rounded-full border border-zinc-300
                                px-4 py-2
                                text-sm text-zinc-600
                                transition-all duration-300
                                hover:border-amber-400
                                hover:text-amber-500
                                dark:text-zinc-400">
                            Demo
                            <span>↗</span>
                        </a>
                    )}

                    {project.github_url && (
                        <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                flex items-center gap-2
                                rounded-full border border-zinc-300
                                px-4 py-2
                                text-sm text-zinc-600
                                transition-all duration-300
                                hover:border-amber-400
                                hover:text-amber-500
                                dark:text-zinc-400">
                            GitHub
                            <span>↗</span>
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
};