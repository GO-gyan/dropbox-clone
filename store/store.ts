import { create } from "zustand";

interface AppState {
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (open: boolean) => void;

    isRenameModalOpen: boolean;
    setIsRenameModalOpen: (open: boolean) => void;

    fileId: string | null;
    setFileId: (id: string) => void;

    filename: string;
    setFilename: (filename: string) => void;
}

export const useAppStore = create<AppState>()((set) => ({
    fileId: null,
    setFileId: (fileId: string) => set((state) => ({ ...state, fileId })),

    filename: "",
    setFilename: (filename: string) => set((state) => ({ ...state, filename })),

    isDeleteModalOpen: false,
    setIsDeleteModalOpen: (open: boolean) => set((state) => ({ ...state, isDeleteModalOpen: open })),
    
    isRenameModalOpen: false,
    setIsRenameModalOpen: (open: boolean) => set((state) => ({ ...state, isRenameModalOpen: open })),
}))