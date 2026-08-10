import { ProjectListItem } from "@/type/project"
import Image from "next/image";
import Link from "next/link";

type Props = {
    project: ProjectListItem;
};

export default function ProjectListCard ({ project }: Props) {

    return (
        <Link
            href={`/projects/${project.project_id}`}
            className="
                group
                grid grid-cols-1
                overflow-hidden
                rounded-2xl
                border border-zinc-200
                bg-white
                transition-all duration-300

                hover:-translate-y-1
                hover:border-amber-400
                hover:shadow-lg

                md:grid-cols-[280px_1fr]

                dark:border-zinc-700
                dark:bg-zinc-800/40
                dark:hover:border-amber-500">
            {/* 썸네일 */}
            <div
                className="
                    relative
                    aspect-video
                    overflow-hidden
                    bg-zinc-100

                    md:aspect-auto
                    md:min-h-[200px]

                    dark:bg-zinc-800">
                {project.thumbnail_url && (
                    <Image
                        src={project.thumbnail_url}
                        alt={`${project.title} 썸네일`}
                        fill
                        sizes="(max-width: 768px) 100vw, 280px"
                        className="
                            object-cover
                            transition-transform duration-500
                            group-hover:scale-105"/>
                )}
            </div>

            {/* 프로젝트 정보 */}
            <div className="flex flex-col justify-between gap-6 p-6">
                <div>
                    {/* 프로젝트 종류 / 상태 */}
                    <div
                        className="
                            mb-3
                            flex items-center gap-2
                            text-sm
                            text-zinc-500
                            dark:text-zinc-400">
                        <span>{project.project_type}</span>

                        <span>·</span>

                        <span>{project.status}</span>

                        <span>·</span>

                        <span>
                            {project.started_at
                                ? new Date(project.started_at).toLocaleDateString()
                                : "" 
                            } 
                            ~ 
                            {project.ended_at
                                ? new Date(project.ended_at).toLocaleDateString()
                                : ""}
                        </span>
                    </div>

                    {/* 제목 */}
                    <h2
                        className="
                            text-xl font-semibold
                            text-zinc-900
                            transition-colors
                            group-hover:text-amber-500

                            dark:text-stone-100">
                        {project.title}
                    </h2>

                    {/* 요약 */}
                    <p
                        className="
                            mt-3
                            line-clamp-2
                            leading-7
                            text-zinc-600

                            dark:text-zinc-400">
                        {project.summary}
                    </p>
                </div>

                {/* 하단 */}
                <div
                    className="
                        flex items-end justify-between
                        border-t border-zinc-100
                        pt-4
                        dark:border-zinc-700">
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                        {project.role}
                    </div>

                    <span
                        className="
                            text-sm font-medium
                            text-zinc-500
                            transition-all
                            group-hover:translate-x-1
                            group-hover:text-amber-500

                            dark:text-zinc-400">
                        자세히 보기 →
                    </span>
                </div>
            </div>
        </Link>
    );
}