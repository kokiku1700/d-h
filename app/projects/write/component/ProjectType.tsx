import { Project } from "@/type/project";
import React from "react";

type ProjectUnit = "개인" | "팀";

type Props = {
    projectType: ProjectUnit,
    setProjectType: React.Dispatch<React.SetStateAction<Project>>
};

export default function ProjectType ({ projectType, setProjectType }: Props) {

    const handleTypeChange = (type: ProjectUnit) => {
        setProjectType(prev => ({
            ...prev,
            type: type,
        }))
    }

    return (
        <div>
            <label>
                º 프로젝트 단위
            </label>
            <ul className="flex gap-2">
                <li>
                    <button 
                        type="button" name="개인"
                        onClick={() => handleTypeChange("개인")}
                        className={`
                            w-20 p-2
                            cursor-pointer
                            ${projectType === "개인" && "bg-amber-400 cursor-default"}
                            rounded-md
                            transition duration-200`}>
                        개인
                    </button>
                </li>
                <li>
                    <button 
                        type="button" name="팀"
                        onClick={() => handleTypeChange("팀")}
                        className={`
                            w-20 p-2
                            cursor-pointer
                            ${projectType === "팀" && "bg-amber-400 cursor-default"}
                            rounded-md
                            transition duration-200`}>
                        팀
                    </button>
                </li>
            </ul>
        </div>
    );
};