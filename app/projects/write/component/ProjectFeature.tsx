import ProjectInputField from "./ProjectInputField";

type Props = {
    title: string;
    description: string;
    preview: string | null;
    onChangeInput: React.ChangeEventHandler<HTMLInputElement>;
    onChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement>;
    onChangeImage: React.ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
};

export default function ProjectFeature ({ 
    title, 
    description, 
    onChangeInput, 
    onChangeTextArea 
}: Props) {

    return (
        <div
            className="
                flex flex-col gap-5
                rounded-xl border border-zinc-400
                bg-white/50
                p-5

                dark:border-zinc-700
                dark:bg-zinc-800/30">
            
            <ProjectInputField
                label="기능"
                name="feature"
                type="text" value={title} 
                onChange={onChangeInput}
                placeholder="기능을 작성해주세요"/>

            <label className="group/textarea flex flex-col gap-1">
                <span 
                    className="
                        text-zinc-800
                        transition-colors
                        duration-500
                        group-focus-within/textarea:text-amber-500

                        dark:text-stone-300">
                    설명
                </span>
                <textarea 
                    value={description}
                    onChange={onChangeTextArea}
                    className="
                        min-h-40 w-full
                        resize-y rounded-lg
                        border border-zinc-300
                        bg-transparent
                        px-3 py-2.5
                        text-sm text-zinc-900
                        outline-none
                        transition-[border-color,box-shadow] duration-300
                        placeholder:text-zinc-400

                        focus:border-amber-500
                        focus:ring-2
                        focus:ring-amber-500/10

                        dark:border-zinc-600
                        dark:text-stone-100
                        dark:placeholder:text-zinc-500"/>
            </label>
        </div>    
    )
}