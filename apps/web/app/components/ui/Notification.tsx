'use client'
import { motion, AnimatePresence } from 'motion/react'
import { IoMdNotificationsOutline } from "react-icons/io";

import { useState } from 'react'
import { useNotification } from '@/app/stores/modal';
import { usePathname } from 'next/navigation';

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

export default function NotificationButton({
  className = ""
}: NotificationButtonProps) {
//   const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
    const { isOpen, handleMenu } = useNotification()
    const [hasUnread, setHasUnread] = useState(false)
    const isPath = usePathname().slice(1) === 'notifications';
    
//   const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className={`relative ${className}`}>
      {/* Кнопка уведомлений */}
      <motion.button
        onClick={handleMenu}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative
          h-12
          w-12
          flex justify-center items-center
          rounded-xl
          bg-(--first-bg-color)
          border border-(--first-border-color)
          text-(--second-text-color)
          hover:text-(--link-color)
          hover:border-(--link-color)/50
          transition-colors
          shadow-sm
          ${isOpen && 'opacity-40 pointer-events-none'}
          ${isPath && 'opacity-0 pointer-events-none'}

        `}
      >
        <IoMdNotificationsOutline className="w-5 h-5" />
        
        {/* Badge с количеством непрочитанных */}
        <AnimatePresence>
          {hasUnread && (
            <motion.div
              key="notification-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="
                absolute -top-1.5 -right-1.5
                min-w-5 h-5
                px-1
                bg-linear-to-br from-red-500 to-pink-500
                text-white
                text-[10px]
                font-bold
                rounded-full
                flex items-center justify-center
                border-2 border-(--first-bg-color)
                shadow-lg
              "
            >
              {/* {unreadCount > 9 ? '9+' : unreadCount} */}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Dropdown с уведомлениями */}
      
    </div>
  )
}

interface NotificationItemProps {
  notification: Notification
  onClick: () => void
  icon: React.ReactNode
}

