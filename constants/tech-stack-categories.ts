export const TECH_STACK_CATEGORIES = [
    "프론트엔드",
    "백엔드",
    "데이터베이스",
    "배포",
    "테스트",
    "도구",
    "라이브러리",
    "기타",
] as const;

export type TechStackCategory = typeof TECH_STACK_CATEGORIES[number];