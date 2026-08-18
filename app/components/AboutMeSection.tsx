
import { useAboutMeQuery } from "@/hooks/useAboutMeQuery"
import { useAuthStore } from "@/store/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import EditButton from "@/components/EditButton";
import { useThemeStore } from "@/store/useThemeStore";


export default function AboutMeSection () {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const isAuthchecked = useAuthStore(state => state.isAuthchecked);
    const currentTheme = useThemeStore(state => state.currentTheme);
    const { data: aboutme, isLoading, isError } = useAboutMeQuery();
    const [editStatus, setEditStatus] = useState(false);
    const [aboutmeView, setAboutmeView] = useState("");
    const queryClient = useQueryClient();

    useEffect(() => {
        if ( !aboutme ) return;

        setAboutmeView(aboutme?.content ?? "");
    }, [aboutme]);

    const handleEdit = () => {
        setEditStatus(!editStatus);
    };

    const handleSave = async () => {
        const res = await fetch("/api/aboutme", {
            method: "PATCH",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({content: aboutmeView}),
        });

        queryClient.invalidateQueries({ queryKey: ["aboutme"] });
        setEditStatus(false);
    };

    return (
        <section 
            id="about me"
            data-section
            className="
                relative isolate overflow-hidden
                w-full bg-amber-100/10 p-5
                flex justify-center items-center">
            {isAuthchecked && isLoggedIn && 
            <EditButton handleEdit={handleEdit} theme={currentTheme} />}
                {editStatus
                    ?
                    <div 
                        className="
                            w-full max-w-xl
                            rounded-3xl border border-stone-200
                            bg-white/80 p-6
                            shadow-xl backdrop-blur-md
                            dark:border-zinc-700
                            dark:bg-zinc-800/80">
                        <div
                            className="flex flex-col gap-3">
                            <textarea 
                                value={aboutmeView}
                                onChange={e => setAboutmeView(e.target.value)} 
                                className="
                                    w-full rounded-xl min-h-[50vh]
                                    border border-stone-300
                                    bg-white px-4 py-3
                                    text-zinc-800 outline-none
                                    transition
                                    focus:border-amber-500
                                    focus:ring-2 focus:ring-amber-500/20
                                    dark:border-zinc-600
                                    dark:bg-zinc-900
                                    dark:text-stone-100"/>
                        </div>
                        <button 
                            type="button"
                            onClick={handleSave}
                            className="
                                mt-5 w-full rounded-xl
                                bg-amber-500 px-4 py-3
                                font-semibold text-white
                                cursor-pointer
                                transition duration-300
                                hover:bg-amber-600
                                active:scale-[0.98]">
                            완료
                        </button>
                    </div>
                    :
                    <div className="flex flex-col gap-6">
                        <span className="text-sm font-medium tracking-[0.2em] text-amber-500">
                            ABOUT ME
                        </span>

                        <div
                            className="
                                max-w-4xl
                                border-l-2 border-amber-400
                                pl-6
                                whitespace-pre-line
                                break-keep
                                text-lg leading-9
                                text-zinc-600
                                dark:border-amber-500
                                dark:text-zinc-300
                                md:pl-8
                                md:text-xl md:leading-10">
                            {aboutme?.content}
                        </div>
                    </div>
                }
        </section>
    )
}