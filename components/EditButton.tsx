import settingDarkMode from "@/public/settingDarkMode.png";
import settingLightMode from "@/public/settingLightMode.png";
import { Theme } from "@/store/useThemeStore";
import Image from "next/image";

type Props = {
    handleEdit: () => void;
    theme: Theme;
}

export default function EditButton ({ handleEdit, theme }: Props) {
    return (
        <button
            type="button"
            onClick={handleEdit}
            aria-label="히어로 섹션 수정"
            className="
                absolute right-5 bottom-5 z-20
                flex size-11 items-center justify-center
                rounded-full
                bg-white/70 shadow-sm backdrop-blur-sm
                cursor-pointer
                transition duration-200
                hover:-translate-y-0.5 hover:shadow-md
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-amber-500
                dark:bg-stone-100">
            <Image 
                className="size-6"
                src={theme === "dark" ? settingDarkMode : settingLightMode}
                alt="수정" />
        </button>
    )
    
}