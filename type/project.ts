export type Project = {
    title: string;
    summary: string;
    description: string;
    date: {
        start: Date | null,
        end: Date | null,
    },
    url: {
        thumbnail: string;
        github: string;
        demo: string;
    },
    type: "개인" | "팀",
    role: string,
    status: "기획" | "진행 중" | "완료" | "유지보수";
    retrospective: string;
};