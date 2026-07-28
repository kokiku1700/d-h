"use client";

import { useState } from "react";
import Slides from "./projectComponents/Slides";
import { useAuthStore } from "@/store/useAuthStore";
import EditButton from "@/components/EditButton";
import { useThemeStore } from "@/store/useThemeStore";
import ViewMoreButton from "@/components/ViewMoreButton";


export default function ProjectSection () {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const isAuthchecked = useAuthStore(state => state.isAuthchecked);
    const [editStatus, setEditStatus] = useState(false);
    const currentTheme = useThemeStore(state => state.currentTheme);

    const handleEdit = () => {
        setEditStatus(true);
    }

    return (
        <section 
            id="project"
            data-section
            className="
                relative w-full h-dvh 
                flex flex-col justify-center items-center">
            <h1 
                className="
                    mb-5 italic text-2xl font-medium
                    dark:text-stone-100">
                프로젝트
            </h1>
            <ViewMoreButton url="projects" />
            {isLoggedIn && isAuthchecked && 
            <EditButton handleEdit={handleEdit} theme={currentTheme} />}
            <div className="w-[80%] h-[80%]">
                <Slides />
            </div>
            
        </section>
    )
}