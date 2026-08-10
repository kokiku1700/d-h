"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Project, ProjectStatus, ProjectType } from "@/type/project";
import ProjectInputField from "@/app/projects/write/component/ProjectInputField";
import ProjectTextArea from "./component/ProjectTextArea";
import ProjectOptionSelector from "./component/ProjectOptionSelector";
import ProjectFeature from "./component/ProjectFeature";
import ProjectTechStack from "./component/ProjectTechStack";
import AddButton from "./component/AddButton";
import ProjectImage from "./component/ProjectImage";
import ProjectTroubleShooting from "./component/ProjectTroubleshooting";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { uplaodImage } from "@/lib/uploadImage";

const projectTypeOptions : {
    label: string;
    value: ProjectType;
}[] = [
    { label: "개인", value: "개인" },
    { label: "팀", value: "팀" },
];

const projectStatusOptions: {
    label: string;
    value: ProjectStatus;
}[] = [
    { label: "기획", value: "기획" },
    { label: "진행 중", value: "진행 중" },
    { label: "완료", value: "완료" },
    { label: "유지보수", value: "유지보수" },
];

const featuredOptions: {
    label: string;
    value: boolean;
}[] = [
    { label: "노출", value: true },
    { label: "숨김", value: false },
];

export default function Write () {
    const [project, setProject] = useState<Project>({
        // 프로젝트 기본 정보 테이블 데이터
        title: "",
        summary: "",
        description: "",
        date: {
            start: null as Date | null,
            end: null as Date | null,
        },
        url: {
            thumbnail: null,
            github: "",
            demo: "", 
        },
        type: "개인",
        role: "",
        status: "완료",
        retrospective: "",
        featured: true,
        // sortOrder: 0

        feature: [
            { 
                title: "", 
                description: "", 
                sortOrder: 0
            }
        ],
        techStack: [
            { 
                name: "", 
                category: "프론트엔드", 
                description: "", 
                sortOrder: 0 
            }
        ],
        troubleshooting: [
            { 
                title: "", 
                problem: "", 
                cause: "", 
                solution: "", 
                result: "", 
                sortOrder: 0 
            }
        ],
        image: [
            { 
                url: null, 
                alt: "", 
                caption: "", 
                sortOrder: 0 
            }
        ],
    });
    const [preview, setPreview] = useState<string | null>(null);
    const router = useRouter();

    const handleAddImage = () => {
        setProject(prev => ({
            ...prev,
            image: [...prev.image, { url: null, alt: "", caption: "", sortOrder: 0 }]
        }));
    };
    
    const handleAddFeature = () => {
        setProject(prev => ({
            ...prev,
            feature: [...prev.feature, { title: "", description: "", sortOrder: 0 }]
        }));
    };

    const handleAddTechStack = () => {
        setProject(prev => ({
            ...prev,
            techStack: [...prev.techStack, { name: "", category: "프론트엔드", description: "", sortOrder: 0 }]
        }));
    };

    const handleAddTroubleShooting = () => {
        setProject(prev => ({
            ...prev,
            troubleshooting: [...prev.troubleshooting, { title: "", problem: "", cause: "", solution: "", result: "", sortOrder: 0 }]
        }));
    };

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if ( !project.url.thumbnail ) {
                alert("썸네일을 선택해주세요.");
                return;
            };

            const thumbnailUrl = await uplaodImage(project.url.thumbnail);

            const uploadedImage = await Promise.all(
                project.image
                .filter((image): image is typeof image & { file: File } => 
                    image.url instanceof File
                )
                .map(async (image, idx) => {
                    if ( !image.url ) {
                        throw new Error (
                            `${idx + 1}번 째 이미지 파일이 없습니다.`
                        );
                    };

                    const imageUrl = await uplaodImage(image.url);

                    return {
                        url: imageUrl,
                        alt: image.alt,
                        caption: image.caption,
                        sortOrder: image.sortOrder,
                    };
                })
            );

            const body = {
                ...project,

                url: {
                    ...project.url,
                    thumbnail: thumbnailUrl,
                },

                image: uploadedImage,
            };

            const res = await fetch("/api/project/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const data = await res.json();

            if ( !res.ok ) {
                throw new Error( data.message || "프로젝트 저장에 실패했습니다.");
            };

            alert("프로젝트가 등록되었습니다.");
            router.replace("/projects");
            router.refresh();
        } catch ( error ) {
            console.log(error);

            const message = error instanceof Error 
                ? error.message
                : "프로젝트 등록 중 오류가 발생했습니댜.";

            alert(message);
        };
    };

    const onCancel = () => {
        router.push("/projects");
    };

    return (
        <main 
            className="
                w-full min-h-dvh
                flex flex-col items-center
                py-10">
            <h1
                className="
                    text-2xl font-medium 
                    mb-10
                    dark:text-stone-100">
                포트폴리오 작성
            </h1>
            <form 
                onSubmit={onSubmit}
                className="w-[90%] flex flex-col gap-5">
                
                <div className="w-[40%]">                        
                    <ProjectInputField 
                        label="º 프로젝트 이름"
                        name="title" type="text"
                        value={project.title}
                        onChange={e => {
                            setProject({...project, [e.target.name]: e.target.value})
                        }}/>  
                </div>

                <div className="w-[70%]">
                    <ProjectInputField 
                        label="º 프로젝트 요약"
                        name="summary" type="text" 
                        value={project.summary}
                        onChange={e => {
                            setProject({...project, [e.target.name]: e.target.value})
                        }}/>
                </div>

                <div className="flex flex-col">
                    <ProjectTextArea 
                        label="º 프로젝트 설명"
                        name="description"
                        value={project.description}
                        onChange={e => {
                            setProject({...project, [e.target.name]: e.target.value})
                        }}/>
                </div>

                <div className="w-[30%] flex flex-col">
                    <label className="group flex w-full flex-col gap-2">
                        <span
                            className="
                                text-zinc-800
                                transition-colors duration-500
                                group-focus-within:text-amber-500
                                dark:text-stone-300">
                            º 작업 기간
                        </span>

                        <div
                            className="
                                relative
                                border-b border-zinc-400
                                transition-colors duration-300
                                dark:border-zinc-600

                                after:absolute
                                after:-bottom-px
                                after:left-0
                                after:h-[1px]
                                after:w-full
                                after:origin-left
                                after:scale-x-0
                                after:bg-amber-500
                                after:transition-transform
                                after:duration-800
                                after:ease-out

                                focus-within:after:scale-x-100">
                            <DatePicker
                                selectsRange
                                startDate={project.date.start}
                                endDate={project.date.end}
                                onChange={(dates) => {
                                    const [start, end] = dates;

                                    setProject((prev) => ({
                                        ...prev,
                                        date: {
                                            start,
                                            end,
                                        },
                                    }));
                                }}
                                dateFormat="yyyy년 MM월 dd일"
                                dateFormatCalendar="yyyy년 MM월"
                                placeholderText="시작 날짜 ~ 완료 날짜"
                                className="
                                    w-full
                                    bg-transparent
                                    py-2 pl-9 text-center
                                    text-sm text-zinc-900
                                    outline-none
                                    placeholder:text-zinc-400
                                    dark:text-stone-100
                                    dark:placeholder:text-zinc-500"
                                wrapperClassName="w-full"/>
                        </div>
                    </label>
                </div>

                <div className="flex flex-col">
                    <ProjectInputField 
                        label="º 썸네일"
                        name="thumbnail" type="file"
                        onChange={e => {
                            const file = e.target.files?.[0];

                            if ( !file ) return;

                            setProject(prev => ({
                                ...prev,
                                url: {...prev.url, thumbnail: file}
                            }))
                        }}/>
                </div>

                <div className="w-[30%]">
                    <ProjectInputField 
                        label="º 깃허브 주소"
                        name="github" type="text" 
                        value={project.url.github}
                        onChange={e => {
                            setProject(prev => ({
                                ...prev,
                                url: {...prev.url, [e.target.name]: e.target.value}
                            }))
                        }}/>
                </div>
                <div className="w-[30%]">
                    <ProjectInputField 
                        label="º 배포 주소"
                        name="demo" type="text" 
                        value={project.url.demo}
                        onChange={e => {
                            setProject(prev => ({
                                ...prev,
                                url: {...prev.url, [e.target.name]: e.target.value}
                            }))
                        }}/>
                </div>
                
                <ProjectOptionSelector 
                    label="º 프로젝트 단위"
                    value={project.type}
                    options={projectTypeOptions}
                    onChange={type => {
                        setProject(prev => ({
                            ...prev,
                            type,
                        }))
                    }}/>

                <ProjectOptionSelector 
                    label="º 프로젝트 상태"
                    value={project.status}
                    options={projectStatusOptions}
                    onChange={status => {
                        setProject(prev => ({
                            ...prev,
                            status,
                        }))
                    }}/>
                <ProjectOptionSelector 
                    label="º 메인 슬라이드 노출 여부"
                    value={project.featured}
                    options={featuredOptions}
                    onChange={featured => {
                        setProject(prev => ({
                            ...prev,
                            featured,
                        }))
                    }}/>
                
                <div className="w-full">
                    <ProjectTextArea 
                        label="º 맡은 역할"
                        name="role"
                        value={project.role}
                        onChange={e => {
                            setProject({...project, [e.target.name]: e.target.value})
                        }}/>
                </div>

                <div className="w-full flex flex-col gap-2">
                    <div className="mb-2 flex items-center gap-2">
                        <h3
                            className="
                                text-base font-medium text-zinc-800
                                dark:text-stone-200">
                            º 프로젝트 이미지
                        </h3>
                        <AddButton type="button" onClick={handleAddImage} />
                    </div>
                    {project.image.map((img, idx) => (
                        <ProjectImage 
                            key={idx}
                            preview={img.url}
                            alt={img.alt}
                            caption={img.caption}
                            onClick={handleAddImage}
                            onChangeImage={e => {
                                const file = e.target.files?.[0];

                                if ( !file ) return;
                                
                                setProject(prev => {
                                    const image = [...prev.image];

                                    image[idx] = {
                                        ...image[idx],
                                        url: file,
                                    };

                                    return {
                                        ...prev,
                                        image
                                    };
                                })   
                            }}
                            onChangeAlt={e => {
                                setProject(prev => {
                                    const image = [...prev.image];

                                    image[idx] = {
                                        ...image[idx],
                                        alt: e.target.value,
                                    };

                                    return {
                                        ...prev,
                                        image
                                    };
                                })   
                            }}
                            onChangeCaption={e => {
                                setProject(prev => {
                                    const image = [...prev.image];

                                    image[idx] = {
                                        ...image[idx],
                                        caption: e.target.value,
                                    };

                                    return {
                                        ...prev,
                                        image
                                    };
                                })   
                            }}/>
                    ))}
                </div>
                
                <div className="w-full flex flex-col gap-2">
                    <div className="mb-2 flex items-center gap-2">
                        <h3
                            className="
                                text-base font-medium text-zinc-800
                                dark:text-stone-200">
                            º 트러블 슈팅
                        </h3>
                        <AddButton type="button" onClick={handleAddTroubleShooting} />
                    </div>
                    {project.troubleshooting.map((t, idx) => (
                        <ProjectTroubleShooting 
                            key={idx}
                            title={t.title} problem={t.problem}
                            cause={t.cause} solution={t.solution}
                            result={t.result}
                            onChangeTitle={e => {
                                setProject(prev => {
                                    const troubleshooting = [...prev.troubleshooting];

                                    troubleshooting[idx] = {
                                        ...troubleshooting[idx],
                                        title: e.target.value,
                                    };

                                    return {
                                        ...prev,
                                        troubleshooting
                                    }
                                })
                            }}
                            onChangeProblem={e => {
                                setProject(prev => {
                                    const troubleshooting = [...prev.troubleshooting];

                                    troubleshooting[idx] = {
                                        ...troubleshooting[idx],
                                        problem: e.target.value,
                                    };

                                    return {
                                        ...prev,
                                        troubleshooting
                                    }
                                })
                            }}
                            onChangeCause={e => {
                                setProject(prev => {
                                    const troubleshooting = [...prev.troubleshooting];

                                    troubleshooting[idx] = {
                                        ...troubleshooting[idx],
                                        cause: e.target.value,
                                    };

                                    return {
                                        ...prev,
                                        troubleshooting
                                    }
                                })
                            }}
                            onChangeSolution={e => {
                                setProject(prev => {
                                    const troubleshooting = [...prev.troubleshooting];

                                    troubleshooting[idx] = {
                                        ...troubleshooting[idx],
                                        solution: e.target.value,
                                    };

                                    return {
                                        ...prev,
                                        troubleshooting
                                    }
                                })
                            }}
                            onChangeResult={e => {
                                setProject(prev => {
                                    const troubleshooting = [...prev.troubleshooting];

                                    troubleshooting[idx] = {
                                        ...troubleshooting[idx],
                                        result: e.target.value,
                                    };

                                    return {
                                        ...prev,
                                        troubleshooting
                                    }
                                })
                            }}/>
                    ))}
                </div>
                
                
                <ProjectTextArea 
                    label="º 회고"
                    name="retrospective"
                    value={project.retrospective}
                    onChange={e => {
                        setProject({...project, [e.target.name]: e.target.value})
                    }}/>
                
                {/* 프로젝트 기능 작성 */}
                <div className="flex flex-col gap-3">
                    <div className="flex gap-5 items-center">
                        <h3
                            className="
                                text-zinc-800
                                transition-colors
                                duration-500
                                group-focus-within:text-amber-500
                                
                                dark:text-stone-300">
                            º 주요 기능
                        </h3>
                        <AddButton type="button" onClick={handleAddFeature}/>
                    </div>
                    {project.feature.map((f, idx) => (
                        <ProjectFeature 
                            key={idx}
                            title={f.title}
                            preview={preview}
                            description={f.description}
                            onChangeInput={e => {
                                setProject(prev => {
                                    const feature = [...prev.feature];

                                    feature[idx] = {
                                        ...feature[idx],
                                        title: e.target.value,
                                    };

                                    return {
                                        ...prev,
                                        feature,
                                    }
                                })
                            }}
                            onChangeTextArea={e => {
                                setProject(prev => {
                                    const feature = [...prev.feature];

                                    feature[idx] = {
                                        ...feature[idx],
                                        description: e.target.value,
                                    };

                                    return {
                                        ...prev,
                                        feature,
                                    }
                                })
                            }}/>
                        ))}
                </div>

                {/* 기술 스택 */}
                <div className="w-full group flex flex-col gap-3">
                    <div className="flex gap-5 items-center">
                        <h3
                            className="
                                text-zinc-800
                                transition-colors
                                duration-500
                                group-focus-within:text-amber-500
                                
                                dark:text-stone-300">
                            º 기술 스택
                        </h3>
                        <AddButton type="button" onClick={handleAddTechStack}/>
                    </div>
                    <div 
                        className="
                            grid grid-cols-[repeat(auto-fit,minmax(400px,400px))] gap-5">
                        {project.techStack.map((tech, idx) => (
                        
                            <ProjectTechStack 
                                key={idx}
                                name={tech.name}
                                category={tech.category}
                                description={tech.description}
                                onChangeName={e => {
                                    setProject(prev => {
                                        const techStack = [...prev.techStack];
                                        
                                        techStack[idx] = {
                                            ...techStack[idx],
                                            name: e.target.value,
                                        }

                                        return {
                                            ...prev,
                                            techStack
                                        }
                                    })
                                }}
                                onChangeCategory={category => {
                                    setProject(prev => ({
                                        ...prev,
                                        techStack: prev.techStack.map((item, itemIdx) =>
                                            itemIdx === idx
                                            ? {...item, category}
                                            : item
                                        )
                                    }))
                                }}
                                onChangeDescription={e => {
                                    setProject(prev => {
                                        const techStack = [...prev.techStack];
                                        
                                        techStack[idx] = {
                                            ...techStack[idx],
                                            description: e.target.value,
                                        }

                                        return {
                                            ...prev,
                                            techStack
                                        }
                                    })
                            }}/>
                        ))}
                    </div>
                </div>
                <div
                    className="
                        mt-10
                        flex justify-end gap-3
                        border-t border-zinc-200
                        pt-6

                        dark:border-zinc-700">
                    <Button 
                        text="취소" type="button" 
                        variant="secondary" 
                        onClick={onCancel}/>
                    <Button 
                        text="등록" type="submit" 
                        variant="primary" />
                </div>
                
            </form>
        </main>
    );
};