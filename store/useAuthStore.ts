import { create } from "zustand";

type AuthStore = {
    // 로그인 상태
    isLoggedIn: boolean;
    // 로그인 여부를 확인했는 지
    isAuthchecked: boolean;
    setLoggedIn: (status: boolean) => void;
    setAuthChecked: (status: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    isLoggedIn: false,
    isAuthchecked: false,

    setLoggedIn: status => set({
        isLoggedIn: status,
    }),
    setAuthChecked: status => set({
        isAuthchecked: status,
    }),
}));