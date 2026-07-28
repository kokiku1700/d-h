import { Project } from "@/type/project";

type Props = {
    projectRetrospective: string;
    setProjectRetrospective: React.Dispatch<React.SetStateAction<Project>>;
};

export default function ProjectRetrospective ({ projectRetrospective, setProjectRetrospective }: Props) {

    return (
        <div className="flex flex-col">
            <label>
                º 회고
            </label>
            <textarea  
                name="role"
                value={ projectRetrospective }
                onChange={e => {
                    setProjectRetrospective(prev => ({
                        ...prev,
                        retrospective: e.target.value,
                    }))
                }}
                className="
                    border-b p-2
                    focus:outline-none
                    focus:border-b-2"/>
        </div>       
    );
};