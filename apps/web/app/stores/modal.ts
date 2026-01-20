import { create } from 'zustand'

interface IModalOpen<T = void> {
    isOpen: boolean,
    handleMenu: () => void,
}

interface Notification {
    id: string
    type: 'message' | 'like' | 'warning' | 'system'
    title: string
    message: string
    time: string
    read: boolean
    icon?: React.ReactNode
}

interface INoteModal extends IModalOpen {
    notifications: Notification[]
    setNotifications: (note: Notification[])=> void
}

interface IGanreBtn{
    isOpen: boolean,
    handleMenu: (params: boolean) => void
}

const initialNotifications: Notification[] = [
        {
            id: '1',
            type: 'message',
            title: 'New Message',
            message: 'You have a new message from Alex',
            time: '2 min ago',
            read: false
        },
        {
            id: '2',
            type: 'like',
            title: 'Movie Liked',
            message: 'Sarah liked your review of "Inception"',
            time: '1 hour ago',
            read: false
        },
        {
            id: '3',
            type: 'warning',
            title: 'Storage Warning',
            message: 'You are running low on storage space',
            time: '3 hours ago',
            read: true
        },
        {
            id: '4',
            type: 'system',
            title: 'System Update',
            message: 'New features are available in the latest update',
            time: '1 day ago',
            read: true
        }
    ]

export const useSidebar = create<IModalOpen>((set) => ({
    isOpen: false,
    handleMenu: ()=> set((state) => ({ isOpen: !state.isOpen })),
}))


export const useGanreBtn = create<IGanreBtn>((set) => ({
    isOpen: false,
    handleMenu: (params)=> set({ isOpen: params}),
}))

export const useNotification = create<INoteModal>((set) => ({
    notifications: initialNotifications,
    setNotifications: (note)=> set({notifications: note}),
    isOpen: false,
    handleMenu: ()=> set((state) => ({ isOpen: !state.isOpen })),
}))

