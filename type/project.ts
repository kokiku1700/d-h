import { TechStackCategory } from "@/constants/tech-stack-categories";

export type ProjectFeature = {
    title: string;
    description: string;
    sortOrder: number;
};

export type ProjectTechStack = {
    name: string;
    category: TechStackCategory;
    description: string;
    sortOrder: number;
};

export type ProjectTroubleshooting = {
    title: string;
    problem: string;
    cause: string;
    solution: string;
    result: string;
    sortOrder: number;
};

export type ProjectImage = {
    url: File | null;
    alt: string;
    caption: string;
    sortOrder: number;
}

export type Project = {
    title: string;
    summary: string;
    description: string;
    date: {
        start: Date | null,
        end: Date | null,
    },
    url: {
        thumbnail: File | null;
        github: string;
        demo: string;
    },
    type: "개인" | "팀",
    role: string,
    status: "기획" | "진행 중" | "완료" | "유지보수";
    retrospective: string;
    featured: boolean;
    //sortOrder: number;
    feature: ProjectFeature[];
    techStack: ProjectTechStack[];
    troubleshooting: ProjectTroubleshooting[];
    image: ProjectImage[];
};

export type ProjectType = "개인" | "팀";

export type ProjectStatus = "기획" | "진행 중" | "완료" | "유지보수";
