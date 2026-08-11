import { getProject } from "@/lib/project/getProject";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ id: string }>;
};

// 동적 metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const { project } = await getProject(id);

    if ( !project ) {
        return {
            title: "프로젝트를 찾을 수 없습니다.",
        };
    };

    return {
        title: `윤동현 - ${project.title}`,
        description: project.summary,
    };
};

export default async function Project({ params }: Props) {
    const { id } = await params;

    const {
        project,
        projectFeatures,
        projectTechStacks,
        projectTroubleshootings,
        projectImages,
    } = await getProject(id);

    if (!project) notFound();

    return (
        <main
            className="
                min-h-screen
                bg-stone-50
                text-zinc-800

                dark:bg-zinc-900
                dark:text-stone-200">
            <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
                
                <section className="mb-20">
                    <div className="mb-6 flex flex-wrap items-center gap-2">
                        <span
                            className="
                                rounded-full
                                bg-amber-100
                                px-3 py-1
                                text-sm font-medium
                                text-amber-700

                                dark:bg-amber-500/10
                                dark:text-amber-400">
                            {project.project_type}
                        </span>

                        <span
                            className="
                                rounded-full
                                bg-zinc-200
                                px-3 py-1
                                text-sm
                                text-zinc-600

                                dark:bg-zinc-800
                                dark:text-zinc-400">
                            {project.status}
                        </span>
                    </div>

                    <h1
                        className="
                            text-4xl
                            font-bold
                            tracking-tight

                            md:text-6xl">
                        {project.title}
                    </h1>

                    <p
                        className="
                            mt-6
                            w-full
                            text-lg
                            leading-8
                            text-zinc-600
                        
                            dark:text-zinc-400">
                        {project.summary}
                    </p>

                    <div
                        className="
                            mt-8
                            flex flex-wrap
                            items-center
                            gap-4">
                        {project.github_url && (
                            <Link
                                href={project.github_url}
                                target="_blank"
                                className="
                                    rounded-xl
                                    border border-zinc-300
                                    px-5 py-2.5
                                    text-sm font-medium
                                    transition

                                    hover:border-amber-500
                                    hover:text-amber-500

                                    dark:border-zinc-700">
                                GitHub
                            </Link>
                        )}

                        {project.demo_url && (
                            <Link
                                href={project.demo_url}
                                target="_blank"
                                className="
                                    rounded-xl
                                    bg-amber-500
                                    px-5 py-2.5
                                    text-sm font-semibold
                                    text-white
                                    transition

                                    hover:bg-amber-600">
                                Demo
                            </Link>
                        )}
                    </div>
                </section>

                {/* 썸네일 */}
                {project.thumbnail_url && (
                    <section className="mb-20">
                        <div
                            className="
                                w-[70%] mx-auto
                                relative
                                aspect-video
                                overflow-hidden
                                rounded-3xl
                                border border-zinc-200
                                bg-zinc-100

                                dark:border-zinc-800
                                dark:bg-zinc-800">
                            <Image
                                src={project.thumbnail_url}
                                alt={`${project.title} 썸네일`}
                                fill
                                priority
                                sizes="(max-width: 1200px) 100vw, 1200px"
                                className="object-cover"
                            />
                        </div>
                    </section>
                )}

                {/* 소개 */}
                <section
                    className="
                        mb-24
                        grid gap-12

                        lg:grid-cols-[220px_1fr]">
                    <div>
                        <p
                            className="
                                text-sm font-semibold
                                text-amber-500">
                            01
                        </p>

                        <h2 className="mt-2 text-2xl font-bold">
                            프로젝트 소개
                        </h2>
                    </div>

                    <div>
                        <p
                            className="
                                whitespace-pre-line
                                text-base
                                leading-8
                                text-zinc-600

                                dark:text-zinc-400">
                            {project.description}
                        </p>

                        <div
                            className="
                                mt-10
                                grid grid-cols-2
                                gap-6
                                rounded-2xl
                                border border-zinc-200
                                p-6

                                md:grid-cols-3

                                dark:border-zinc-800">
                            <InfoItem
                                label="진행 기간"
                                value={`
                                    ${project.started_at ? new Date(project.started_at).toLocaleDateString() : ""} 
                                    ~ 
                                    ${project.ended_at ? new Date(project.ended_at).toLocaleDateString() : "진행 중"}`}
                            />

                            <InfoItem
                                label="프로젝트 유형"
                                value={project.project_type}
                            />

                            <InfoItem
                                label="담당 역할"
                                value={project.role}
                            />
                        </div>
                    </div>
                </section>

                {/* 주요 기능 */}
                {projectFeatures.length > 0 && (
                    <section
                        className="
                            mb-24
                            grid gap-12

                            lg:grid-cols-[220px_1fr]">
                        <SectionTitle number="02" title="주요 기능" />

                        <div className="grid gap-4 md:grid-cols-2">
                            {projectFeatures.map((feature, idx) => (
                                <article
                                    key={feature.feature_id}
                                    className="
                                        rounded-2xl
                                        border border-zinc-200
                                        bg-white
                                        p-6

                                        hover:border-amber-400

                                        dark:border-zinc-800
                                        dark:bg-zinc-800/40">
                                    <div
                                        className="
                                            mb-4
                                            flex h-9 w-9
                                            items-center justify-center
                                            rounded-lg
                                            bg-amber-100
                                            text-sm font-semibold
                                            text-amber-600

                                            dark:bg-amber-500/10
                                            dark:text-amber-400">
                                        {idx + 1}
                                    </div>

                                    <h3 className="text-lg font-semibold">
                                        {feature.title}
                                    </h3>

                                    <p
                                        className="
                                            mt-3
                                            leading-7
                                            text-zinc-600

                                            dark:text-zinc-400">
                                        {feature.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {/* 기술 스택 */}
                {projectTechStacks.length > 0 && (
                    <section
                        className="
                            mb-24
                            grid gap-12

                            lg:grid-cols-[220px_1fr]">
                        <SectionTitle number="03" title="기술 스택" />

                        <div className="flex flex-wrap gap-3">
                            {projectTechStacks.map((stack) => (
                                <div
                                    key={stack.tech_stack_id}
                                    className="
                                        rounded-xl
                                        border border-zinc-200
                                        bg-white
                                        px-4 py-3

                                        dark:border-zinc-800
                                        dark:bg-zinc-800/40">
                                    <p className="font-medium">
                                        {stack.name}
                                    </p>

                                    <p
                                        className="
                                            mt-0.5
                                            text-xs
                                            text-zinc-400">
                                        {stack.category}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Images */}
                {projectImages.length > 0 && (
                    <section
                        className="
                            mb-24
                            grid gap-12

                            lg:grid-cols-[220px_1fr]">
                        <SectionTitle number="04" title="프로젝트 화면" />

                        <div className="space-y-10">
                            {projectImages.map((image) => (
                                <figure key={image.image_id}>
                                    <div
                                        className="
                                            relative
                                            aspect-video
                                            overflow-hidden
                                            rounded-2xl
                                            border border-zinc-200

                                            dark:border-zinc-800">
                                        <Image
                                            src={image.image_url}
                                            alt={
                                                image.alt_text ??
                                                project.title
                                            }
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 900px"
                                            className="object-cover"
                                        />
                                    </div>

                                    {image.caption && (
                                        <figcaption
                                            className="
                                                mt-3
                                                text-center
                                                text-sm
                                                text-zinc-500">
                                            {image.caption}
                                        </figcaption>
                                    )}
                                </figure>
                            ))}
                        </div>
                    </section>
                )}

                {/* 트러블슈팅 */}
                {projectTroubleshootings.length > 0 && (
                    <section
                        className="
                            mb-24
                            grid gap-12

                            lg:grid-cols-[220px_1fr]">
                        <SectionTitle
                            number="05"
                            title="트러블슈팅"
                        />

                        <div className="space-y-6">
                            {projectTroubleshootings.map(
                                (trouble, index) => (
                                    <article
                                        key={trouble.troubleshooting_id}
                                        className="
                                            rounded-2xl
                                            border border-zinc-200
                                            bg-white
                                            p-7

                                            dark:border-zinc-800
                                            dark:bg-zinc-800/40
                                        "
                                    >
                                        <p
                                            className="
                                                mb-2
                                                text-sm font-medium
                                                text-amber-500
                                            "
                                        >
                                            Trouble {index + 1}
                                        </p>

                                        <h3 className="text-xl font-semibold">
                                            {trouble.title}
                                        </h3>

                                        <div className="mt-7 space-y-6">
                                            <TroubleItem
                                                title="문제"
                                                content={trouble.problem}
                                            />

                                            <TroubleItem
                                                title="원인"
                                                content={trouble.cause}
                                            />

                                            <TroubleItem
                                                title="해결"
                                                content={trouble.solution}
                                            />

                                            <TroubleItem
                                                title="결과"
                                                content={trouble.result}
                                            />
                                        </div>
                                    </article>
                                )
                            )}
                        </div>
                    </section>
                )}

                {/* 회고 */}
                {project.retrospective && (
                    <section
                        className="
                            grid gap-12
                            border-t border-zinc-200
                            pt-20

                            lg:grid-cols-[220px_1fr]

                            dark:border-zinc-800">
                        <SectionTitle number="06" title="회고" />

                        <p
                            className="
                                whitespace-pre-line
                                text-lg
                                leading-9
                                text-zinc-600

                                dark:text-zinc-400">
                            {project.retrospective}
                        </p>
                    </section>
                )}
            </div>
        </main>
    );
}

function SectionTitle({
    number,
    title,
}: {
    number: string;
    title: string;
}) {
    return (
        <div>
            <p className="text-sm font-semibold text-amber-500">
                {number}
            </p>

            <h2 className="mt-2 text-2xl font-bold">
                {title}
            </h2>
        </div>
    );
}

function InfoItem({
    label,
    value,
}: {
    label: string;
    value: string | null;
}) {
    return (
        <div>
            <p
                className="
                    text-sm
                    text-zinc-400">
                {label}
            </p>

            <p className="mt-1 font-medium">
                {value || "-"}
            </p>
        </div>
    );
}

function TroubleItem({
    title,
    content,
}: {
    title: string;
    content: string;
}) {
    return (
        <div>
            <h4 className="text-sm font-semibold text-zinc-800 dark:text-stone-300">
                {title}
            </h4>

            <p
                className="
                    mt-2
                    whitespace-pre-line
                    leading-7
                    text-zinc-600

                    dark:text-zinc-400">
                {content}
            </p>
        </div>
    );
}