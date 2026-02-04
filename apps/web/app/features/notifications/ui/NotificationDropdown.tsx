'use client'
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { CiStar } from "react-icons/ci";
import { TbAlertCircle } from "react-icons/tb";
import { FaRegWindowClose } from "react-icons/fa";
import { GrTechnology } from "react-icons/gr";
import { useNotification } from "@/shared/stores/modal";
import Link from "next/link";

interface Notification {
    id: string
    type: 'message' | 'like' | 'warning' | 'system'
    title: string
    message: string
    time: string
    read: boolean
    icon?: React.ReactNode
}

interface NotificationButtonProps {
    notifications?: Notification[]
    onNotificationClick?: (id: string) => void
    onMarkAllRead?: () => void
    className?: string
}

interface NotificationItemProps {
    notification: Notification
    onClick: () => void
    icon: React.ReactNode
}

export function NotificationDropdown({
    onNotificationClick,
    onMarkAllRead,
    className = ""
}: NotificationButtonProps) {
    const { isOpen, handleMenu, notifications, setNotifications } = useNotification()
    const [hasUnread, setHasUnread] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const unreadCount = notifications.filter(n => !n.read).length

    const memoizedHandleMenu = useCallback(() => {
        handleMenu();
    }, [handleMenu]);

    useEffect(() => {
        setHasUnread(unreadCount > 0);
    }, [notifications, unreadCount]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                memoizedHandleMenu();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, memoizedHandleMenu]);

    const handleNotificationClick = (id: string) => {
        setNotifications(
            notifications.map(notif =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        )
        onNotificationClick?.(id)
    }

    const handleMarkAllRead = () => {
        setNotifications(
            notifications.map(notif => ({ ...notif, read: true }))
        )
        onMarkAllRead?.()
    }

    const handleClearAll = () => {
        setNotifications([])
        memoizedHandleMenu()
    }

    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'message':
                return <FiMessageSquare className="w-4 h-4 text-blue-500" />
            case 'like':
                return <CiStar className="w-4 h-4 text-yellow-500" />
            case 'warning':
                return <TbAlertCircle className="w-4 h-4 text-red-500" />
            case 'system':
                return <GrTechnology className="w-4 h-4 text-purple-500" />
            default:
                return <IoMdNotificationsOutline className="w-4 h-4 text-gray-500" />
        }
    }
    
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="
                        fixed right-6 top-16 mt-5
                        w-80 sm:w-96
                        max-h-125
                        bg-(--first-bg-color)
                        border border-(--first-border-color)
                        rounded-xl
                        shadow-xl
                        overflow-hidden
                        z-50
                    "
                >
                    <div className="
                        p-4
                        border-b border-(--first-border-color)/50
                        flex items-center justify-between
                    ">
                        <div>
                            <h3 className="font-semibold text-(--first-text-color)">Notifications</h3>
                            <p className="text-sm text-(--second-text-color)">
                                {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            {notifications.length > 0 && (
                                <>
                                    <motion.button
                                        onClick={handleMarkAllRead}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="
                                            p-1.5
                                            rounded-lg
                                            text-(--link-color)
                                            hover:bg-(--link-color)/10
                                            transition-colors
                                            text-sm font-medium
                                        "
                                    >
                                        <CiCircleCheck className="w-4 h-4" />
                                    </motion.button>

                                    <motion.button
                                        onClick={handleClearAll}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="
                                            p-1.5
                                            rounded-lg
                                            text-red-500
                                            hover:bg-red-500/10
                                            transition-colors
                                        "
                                    >
                                        <FaRegWindowClose className="w-4 h-4" />
                                    </motion.button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="overflow-y-auto overflow-x-hidden max-h-96">
                        {notifications.length > 0 ? (
                            <div className="divide-y divide-(--first-border-color)/50">
                                {notifications.map((notification) => (
                                    <NotificationItem
                                        key={notification.id}
                                        notification={notification}
                                        onClick={() => handleNotificationClick(notification.id)}
                                        icon={getIcon(notification.type)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="
                                p-8
                                text-center
                                text-(--second-text-color)
                            ">
                                <CiCircleCheck className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                <p className="font-medium">No notifications</p>
                                <p className="text-sm mt-1">You're all caught up!</p>
                            </div>
                        )}
                    </div>

                    {notifications.length > 0 && (
                        <div className="
                            p-3
                            w-full
                            flex justify-center
                            border-t border-(--first-border-color)/50
                            bg-(--first-bg-color)/80
                            backdrop-blur-sm
                        ">
                            <Link 
                            href='/notifications'
                            onClick={handleMenu}
                            className="
                                px-6
                                py-2 
                                text-md font-medium
                                text-(--link-color)
                                hover:text-(--link-color-hover)
                                hover:bg-(--link-color)/5
                                rounded-lg
                                transition-colors
                            ">
                                View all notifications
                            </Link>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function NotificationItem({ notification, onClick, icon }: NotificationItemProps) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ x: 4 }}
            className={`
                w-full
                p-4
                text-left
                transition-colors
                ${!notification.read ? 'bg-(--link-color)/5' : 'hover:bg-(--first-border-color)/20'}
            `}
        >
            <div className="flex items-start gap-3">
                <div className={`
                    w-10 h-10
                    rounded-xl
                    flex items-center justify-center
                    flex-shrink-0
                    ${!notification.read
                        ? 'bg-gradient-to-br from-(--link-color)/20 to-purple-500/20'
                        : 'bg-(--first-border-color)/30'
                    }
                `}>
                    {icon}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <h4 className={`
                            text-sm font-medium
                            ${!notification.read
                                ? 'text-(--first-text-color)'
                                : 'text-(--second-text-color)'
                            }
                        `}>
                            {notification.title}
                        </h4>
                        <span className="
                            text-xs
                            text-(--second-text-color)
                            whitespace-nowrap
                            flex-shrink-0
                        ">
                            {notification.time}
                        </span>
                    </div>

                    <p className={`
                        text-sm mt-1
                        ${!notification.read
                            ? 'text-(--first-text-color)'
                            : 'text-(--second-text-color)/80'
                        }
                        line-clamp-2
                    `}>
                        {notification.message}
                    </p>
                </div>

                {!notification.read && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="
                            w-2 h-2
                            rounded-full
                            bg-gradient-to-br from-(--link-color) to-purple-500
                            flex-shrink-0
                            mt-2
                        "
                    />
                )}
            </div>
        </motion.button>
    )
}

