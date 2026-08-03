import ProjectInput from "./ProjectInput";

type Porps = {
    label: string;
    name: string;
    type: string;
    value?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
}

export default function ProjectInputField ({ label, name, type, value, onChange, placeholder }: Porps) {

    return (
        <label className="group flex flex-col">
             <span
                className="
                    text-zinc-800
                    transition-colors
                    duration-500
                    group-focus-within:text-amber-500
                    
                    dark:text-stone-300">
                {label}
            </span>
            <div
                className="
                    relative
                    w-full
                    border-b border-zinc-800
                    dark:border-stone-300

                    after:absolute
                    after:left-0
                    after:bottom-[-1px]
                    after:h-[1px]
                    after:w-full
                    after:origin-left
                    after:scale-x-0
                    after:bg-amber-500
                    after:transition-transform
                    after:duration-800
                    after:ease-out

                    focus-within:after:scale-x-100">
                <ProjectInput 
                    name={name} value={value}
                    type={type} 
                    onChange={onChange}
                    placeholder={placeholder}/>
            </div>
        </label>
        
    );
};