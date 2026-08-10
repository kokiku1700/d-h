"use client";

import Image from "next/image";
import ProjectInputField from "./ProjectInputField";
import { useEffect, useState } from "react";

type Props = {
    preview: File | null;
    alt: string;
    caption: string;
    onChangeImage: React.ChangeEventHandler<HTMLInputElement>;
    onChangeAlt: React.ChangeEventHandler<HTMLInputElement>;
    onChangeCaption: React.ChangeEventHandler<HTMLInputElement>;
    onClick: () => void;
};

export default function ProjectImage({
    preview,
    alt,
    caption,
    onChangeImage,
    onChangeAlt,
    onChangeCaption,
    onClick
}: Props) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if ( !preview ) {
            setPreviewUrl(null);
            return;
        };

        const url = URL.createObjectURL(preview);

        setPreviewUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [preview]);

    return (
        <div
            className="
                grid grid-cols-1 gap-6
                rounded-2xl border border-zinc-200
                bg-white p-5

                lg:grid-cols-[minmax(0,1fr)_minmax(320px,1.2fr)]

                dark:border-zinc-700
                dark:bg-zinc-800/40">
            {/* 입력 영역 */}
            <div className="flex min-w-0 flex-col gap-5">
                

                <ProjectInputField
                    label="이미지"
                    name="image"
                    type="file"
                    onChange={onChangeImage}/>

                <ProjectInputField
                    label="이미지 이름"
                    value={alt}
                    name="alt"
                    type="text"
                    onChange={onChangeAlt}
                    placeholder="이미지의 내용을 설명해주세요"/>

                <ProjectInputField
                    label="이미지 설명"
                    value={caption}
                    name="caption"
                    type="text"
                    onChange={onChangeCaption}
                    placeholder="이미지에 대한 간단한 설명"/>
            </div>

            {/* 미리보기 영역 */}
            <div className="flex min-w-0 flex-col gap-2">
                <span
                    className="
                        text-sm text-zinc-600
                        dark:text-zinc-300">
                    미리보기
                </span>

                <div
                    className="
                        relative flex aspect-video w-full
                        items-center justify-center
                        overflow-hidden rounded-xl
                        border border-dashed border-zinc-300
                        bg-zinc-100

                        dark:border-zinc-600
                        dark:bg-zinc-900/60">
                    {previewUrl ? (
                        <Image
                            src={previewUrl}
                            alt={alt || "프로젝트 이미지 미리보기"}
                            fill
                            sizes="
                                (max-width: 1024px) 100vw,
                                50vw"
                            className="
                                object-contain
                                p-2"/>
                    ) : (
                        <div
                            className="
                                flex flex-col items-center gap-2
                                text-zinc-400
                                dark:text-zinc-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <rect
                                    width="18"
                                    height="18"
                                    x="3"
                                    y="3"
                                    rx="2"/>
                                <circle cx="9" cy="9" r="2" />
                                <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
                            </svg>

                            <span className="text-sm">
                                선택된 이미지가 없습니다
                            </span>
                        </div>
                    )}
                </div>

                <p
                    className="
                        text-xs text-zinc-400
                        dark:text-zinc-500">
                    원본 비율을 유지하여 표시됩니다.
                </p>
            </div>
        </div>        
    );
};