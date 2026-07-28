import { Project } from "@/type/project";

type ProjectUnit = "기획" | "진행 중" | "완료" | "유지보수";

type Props = {
    projectStatus: ProjectUnit,
    setProjectStatus: React.Dispatch<React.SetStateAction<Project>>
};

export default function ProjectStatus ({ projectStatus, setProjectStatus }: Props) {

    const handleTypeChange = (type: ProjectUnit) => {
        setProjectStatus(prev => ({
            ...prev,
            status: type,
        }))
    }

    return (
        <div>
            <label>
                º 프로젝트 상태
            </label>
            <ul className="flex gap-2">
                <li>
                    <button 
                        type="button" name="기획"
                        onClick={() => handleTypeChange("기획")}
                        className={`
                            w-20 p-2
                            cursor-pointer
                            ${projectStatus === "기획" && "bg-amber-400 cursor-default"}
                            rounded-md
                            transition duration-200`}>
                        기획
                    </button>
                </li>
                <li>
                    <button 
                        type="button" name="진행 중"
                        onClick={() => handleTypeChange("진행 중")}
                        className={`
                            w-20 p-2
                            cursor-pointer
                            ${projectStatus === "진행 중" && "bg-amber-400 cursor-default"}
                            rounded-md
                            transition duration-200`}>
                        진행 중
                    </button>
                </li>
                <li>
                    <button 
                        type="button" name="완료"
                        onClick={() => handleTypeChange("완료")}
                        className={`
                            w-20 p-2
                            cursor-pointer
                            ${projectStatus === "완료" && "bg-amber-400 cursor-default"}
                            rounded-md
                            transition duration-200`}>
                        완료
                    </button>
                </li>
                <li>
                    <button 
                        type="button" name="유지보수"
                        onClick={() => handleTypeChange("유지보수")}
                        className={`
                            w-20 p-2
                            cursor-pointer
                            ${projectStatus === "유지보수" && "bg-amber-400 cursor-default"}
                            rounded-md
                            transition duration-200`}>
                        유지보수
                    </button>
                </li>
            </ul>
        </div>
    );
}