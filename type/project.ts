import { TechStackCategory } from "@/constants/tech-stack-categories";

// 주요 기능 입력 타입
export type ProjectFeature = {
    title: string;
    description: string;
    sortOrder: number;
};

// 기술 스택 입력 타입
export type ProjectTechStack = {
    name: string;
    category: TechStackCategory;
    description: string;
    sortOrder: number;
};

// 트러블 슈팅 입력 타입
export type ProjectTroubleshooting = {
    title: string;
    problem: string;
    cause: string;
    solution: string;
    result: string;
    sortOrder: number;
};

// 프로젝트 이지미 입력 타입
export type ProjectImage = {
    url: File | null;
    alt: string;
    caption: string;
    sortOrder: number;
}

// 프로젝트 기본 정보 입력 타입
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

// 프로젝트 조회 타입
export type ProjectListItem = {
    project_id: number;
    title: string;
    summary: string;
    description: string;
    started_at: string | null;
    ended_at: string | null;
    thumbnail_url: string | null;
    github_url: string;
    demo_url: string;
    project_type: ProjectType;
    status: ProjectStatus;
    role: string;
    is_featured: boolean;
    retrospective: string;
    sort_order: number;
};

// 프로젝트 주요 기능 조회 타입
export type DetailProjectFeature = {
    feature_id: number;
    project_id: number;
    title: string;
    description: string;
    sort_order: number;
};

// 프로젝트 기술 스택 조회 타입
export type DetailProjectTechStack = {
    tech_stack_id: number;
    project_id: number;
    name: string;
    category: string;
    sort_order: number;
};

// 프로젝트 트러블슈팅 조회 타입
export type DetailProjectTroubleshooting = {
    troubleshooting_id: number;
    project_id: number;
    title: string;
    problem: string;
    cause: string;
    solution: string;
    result: string;
    sort_order: string;
};

// 프로젝트 상세 이미지 조회 타입 
export type DetailProjectImage = {
    image_id: number;
    project_id: number;
    image_url: string;
    alt_text: string;
    caption: string;
    sort_order: number;
};