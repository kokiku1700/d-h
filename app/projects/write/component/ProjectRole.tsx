import { Project } from "@/type/project";

type Props = {
    projectRole: string;
    setProjectRole: React.Dispatch<React.SetStateAction<Project>>;
};

export default function ProjectRole ({ projectRole, setProjectRole }: Props) {

    return (
        <div className="flex flex-col">
            <label>
                º 맡은 역할
            </label>
            <input  
                name="role" type="text" 
                value={ projectRole }
                onChange={e => {
                    setProjectRole(prev => ({
                        ...prev,
                        role: e.target.value,
                    }))
                }}
                className="
                    border-b p-2
                    focus:outline-none
                    focus:border-b-2"/>
        </div>
    );
};