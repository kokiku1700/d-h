import {
    TECH_STACK_CATEGORIES,
    TechStackCategory,
} from "@/constants/tech-stack-categories";

type Props = {
    name: string;
    category: TechStackCategory;
    description: string;
    onChangeName: React.ChangeEventHandler<HTMLInputElement>;
    onChangeCategory: (category: TechStackCategory) => void;
    onChangeDescription: React.ChangeEventHandler<HTMLTextAreaElement>;
};

export default function ProjectTechStack({
    name,
    category,
    description,
    onChangeName,
    onChangeCategory,
    onChangeDescription,
}: Props) {
    return (
        <div
            className="
                flex flex-col gap-5
                rounded-xl border border-zinc-200
                bg-white/50
                p-5

                dark:border-zinc-700
                dark:bg-zinc-800/30">
            {/* 기술 스택명 */}
            <label className="group/input flex flex-col gap-1">
                <span
                    className="
                        text-sm font-medium text-zinc-700
                        transition-colors duration-300
                        group-focus-within/input:text-amber-500

                        dark:text-stone-300">
                    기술 스택명
                </span>

                <div
                    className="
                        relative
                        border-b border-zinc-300

                        after:absolute
                        after:bottom-[-1px]
                        after:left-0
                        after:h-px
                        after:w-full
                        after:origin-left
                        after:scale-x-0
                        after:bg-amber-500
                        after:transition-transform
                        after:duration-800

                        focus-within:after:scale-x-100

                        dark:border-zinc-600">
                    <input
                        type="text"
                        value={name}
                        onChange={onChangeName}
                        placeholder="예: Next.js"
                        className="
                            w-full
                            bg-transparent
                            px-1 py-2
                            text-sm text-zinc-900
                            outline-none
                            placeholder:text-zinc-400

                            dark:text-stone-100
                            dark:placeholder:text-zinc-500"/>
                </div>
            </label>

            {/* 카테고리 */}
            <fieldset className="flex flex-col gap-2">
                <legend
                    className="
                        mb-2
                        text-sm font-medium text-zinc-700
                        dark:text-stone-300">
                    카테고리
                </legend>

                <ul className="flex flex-wrap gap-1.5">
                    {TECH_STACK_CATEGORIES.map((currentCategory) => {
                        const isSelected = category === currentCategory;

                        return (
                            <li key={currentCategory}>
                                <button
                                    type="button"
                                    aria-pressed={isSelected}
                                    onClick={() =>
                                        onChangeCategory(currentCategory)
                                    }
                                    className={`
                                        rounded-full border
                                        px-3 py-1
                                        text-xs font-medium
                                        transition-colors duration-200
                                        cursor-pointer

                                        ${
                                            isSelected
                                                ? `
                                                    border-amber-500
                                                    bg-amber-500
                                                    text-white
                                                `
                                                : `
                                                    border-zinc-300
                                                    bg-transparent
                                                    text-zinc-600
                                                    hover:border-amber-500
                                                    hover:text-amber-500

                                                    dark:border-zinc-600
                                                    dark:text-stone-300
                                                    dark:hover:border-amber-500
                                                    dark:hover:text-amber-400
                                                `
                                        }
                                    `}
                                >
                                    {currentCategory}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </fieldset>

            {/* 사용 이유 */}
            <label className="group/textarea flex max-w-2xl flex-col gap-2">
                <span
                    className="
                        text-sm font-medium text-zinc-700
                        transition-colors duration-300
                        group-focus-within/textarea:text-amber-500

                        dark:text-stone-300">
                    사용 이유
                </span>

                <textarea
                    value={description}
                    onChange={onChangeDescription}
                    placeholder="프로젝트에서 이 기술을 사용한 이유를 작성해 주세요."
                    className="
                        min-h-24 w-full
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
    );
}