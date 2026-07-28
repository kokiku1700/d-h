"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProjectType from "./component/ProjectType";
import { Project } from "@/type/project";
import ProjectRole from "./component/ProjectRole";
import ProjectStatus from "./component/ProjectStatus";
import ProjectRetrospective from "./component/ProjectRetrospective";



export default function Write () {
    const [project, setProject] = useState<Project>({
        title: "",
        summary: "",
        description: "",
        date: {
            start: null as Date | null,
            end: null as Date | null,
        },
        url: {
            thumbnail: "",
            github: "",
            demo: "", 
        },
        type: "개인",
        role: "",
        status: "완료",
        retrospective: "",
    });

    const onClick = () => {
        console.log(project)
    }

    return (
        <main 
            className="
                w-full min-h-dvh bg-red-100
                flex flex-col items-center">
            <h1 onClick={onClick}
                className="
                    text-2xl font-medium 
                    my-10
                    dark:text-stone-100">
                포트폴리오 작성
            </h1>
            <form 
                className="w-full flex flex-col gap-5">
                <div className="flex flex-col">
                    <label>
                        º 프로젝트 이름
                    </label>
                    <input  
                        name="title" type="text" 
                        value={project.title}
                        onChange={e => {
                            setProject({...project, [e.target.name]: e.target.value})
                        }}
                        className="
                            border-b p-2
                            focus:outline-none
                            focus:border-b-2"/>
                </div>
                <div className="flex flex-col">
                    <label>
                        º 프로젝트 요약
                    </label>
                    <input  
                        name="summary" type="text" 
                        value={project.summary}
                        onChange={e => {
                            setProject({...project, [e.target.name]: e.target.value})
                        }}
                        className="
                            border-b px-2 py-1
                            focus:outline-none
                            focus:border-b-2"/>
                </div>
                <div className="flex flex-col">
                    <label>
                        º 프로젝트 설명
                    </label>
                    <textarea  
                        name="description"
                        value={project.description}
                        onChange={e => {
                            setProject({...project, [e.target.name]: e.target.value})
                        }}
                        className="
                            border-b px-2 py-1
                            focus:outline-none
                            focus:border-b-2"/>
                </div>
                <div className="flex flex-col">
                    <label>
                        º 작업 기간
                    </label>
                    <DatePicker 
                        selectsRange
                        startDate={project.date.start}
                        endDate={project.date.end}
                        onChange={dates => {
                            const [start, end] = dates;

                            setProject(prev => ({
                                ...prev,
                                date: {start, end}
                            }))
                        }}    
                        dateFormat="yyyy년 MM월 dd일"
                        dateFormatCalendar="yyyy년 MM월"
                        placeholderText="시작 날짜 ~ 완료 날짜"
                    />
                </div>
                <div className="flex flex-col">
                    <label>
                        º 썸네일
                    </label>
                    <input 
                        type="file"
                        className="border"/>
                </div>
                <div className="flex flex-col">
                    <label>
                        º 깃허브 주소
                    </label>
                    <input 
                        type="text"
                        value={project.url.github}
                        onChange={e => {
                            setProject(prev => ({
                                ...prev,
                                url: {...prev.url, github: e.target.value}
                            }))
                        }}
                        className="
                            border-b px-2 py-1
                            focus:outline-none
                            focus:border-b-2"/>
                </div>
                <div className="flex flex-col">
                    <label>
                        º 배포 주소
                    </label>
                    <input 
                        type="text"
                        value={project.url.demo}
                        onChange={e => {
                            setProject(prev => ({
                                ...prev,
                                url: {...prev.url, demo: e.target.value}
                            }))
                        }}
                        className="
                            border-b px-2 py-1
                            focus:outline-none
                            focus:border-b-2"/>
                </div>
                <ProjectType projectType={project.type} setProjectType={setProject}/>
                <ProjectRole projectRole={project.role} setProjectRole={setProject}/>
                <ProjectStatus projectStatus={project.status} setProjectStatus={setProject}/>
                <ProjectRetrospective projectRetrospective={project.retrospective} setProjectRetrospective={setProject}/>
            </form>
        </main>
    );
};