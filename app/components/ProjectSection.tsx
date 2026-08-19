"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import EditButton from "@/components/EditButton";
import { useThemeStore } from "@/store/useThemeStore";
import ViewMoreButton from "@/components/ViewMoreButton";
import ProjectCard from "./projectComponents/ProjectCard";
import { useProjectsQuery } from "@/hooks/useProjectsQuery";


export default function ProjectSection () {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const isAuthchecked = useAuthStore(state => state.isAuthchecked);
    const [editStatus, setEditStatus] = useState(false);
    const currentTheme = useThemeStore(state => state.currentTheme);
    const { data: projects } = useProjectsQuery();

    const handleEdit = () => {
        setEditStatus(true);
    }

    return (
        <section 
            id="project"
            data-section
            className="
                relative w-full p-5
                flex flex-col justify-center items-center">
            <h1 
                className="
                    mb-5 italic text-2xl font-medium
                    dark:text-stone-100">
                프로젝트
            </h1>
            
            {isLoggedIn && isAuthchecked && 
            <EditButton handleEdit={handleEdit} theme={currentTheme} />}
            
            {
                projects?.map((project, index) => (
                    <ProjectCard 
                        key={index}
                        project={project} index={index} />
                ))
            }
            <ViewMoreButton url="projects" />
        </section>
    )
}