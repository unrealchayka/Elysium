'use client'
import { motion, AnimatePresence } from 'motion/react'
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { LuCircleChevronDown } from "react-icons/lu";
import { useState, useRef, useEffect } from 'react'

interface UserProfile {
  name: string
  email: string
  avatar?: string
}

interface ProfileProps {
  user: UserProfile
  onLogout?: () => void
  onSettings?: () => void
}

export function ProfileBtn({ 
  user, 
  onLogout, 
  onSettings 
}: ProfileProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="
          flex items-center gap-3
          px-3 py-2
          rounded-xl
          bg-(--first-bg-color)
          border border-(--first-border-color)
          text-(--second-text-color)
          hover:text-(--link-color)
          hover:border-(--link-color)/50
          transition-colors
          shadow-sm
        "
      >
        <div className="relative">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="
              w-8 h-8
              rounded-full
              bg-linear-to-br from-(--link-color) to-purple-600
              flex items-center justify-center
            ">
              <FaRegUser className="w-4 h-4 text-white" />
            </div>
          )}
          
          <div className="
            absolute -bottom-0.5 -right-0.5
            w-3 h-3
            bg-green-500
            rounded-full
            border-2 border-(--first-bg-color)
          " />
        </div>

        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-(--first-text-color) leading-tight">
            {user.name}
          </p>
          <p className="text-xs text-(--second-text-color) leading-tight">
            {user.email}
          </p>
        </div>

        <LuCircleChevronDown className={`w-4 h-4 text-(--second-text-color) transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="
              absolute right-0 top-full mt-2
              min-w-60
              bg-(--first-bg-color)
              border border-(--first-border-color)
              rounded-xl
              shadow-xl
              overflow-hidden
              z-50
            "
          >
            <div className="p-4 border-b border-(--first-border-color)/50">
              <div className="flex items-center gap-3">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="
                    w-10 h-10
                    rounded-full
                    bg-gradient-to-br from-(--link-color) to-purple-600
                    flex items-center justify-center
                  ">
                    <FaRegUser className="w-5 h-5 text-white" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-(--first-text-color)">{user.name}</p>
                  <p className="text-sm text-(--second-text-color)">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="py-2">
              <motion.button
                onClick={() => {
                  onSettings?.()
                  setIsOpen(false)
                }}
                whileHover={{ x: 4 }}
                className="
                  w-full
                  flex items-center gap-3
                  px-4 py-3
                  text-(--second-text-color)
                  hover:text-(--first-text-color)
                  hover:bg-(--first-border-color)/30
                  transition-colors
                "
              >
                <IoSettingsOutline className="w-4 h-4" />
                <span>Settings</span>
              </motion.button>

              <motion.button
                onClick={() => {
                  onLogout?.()
                  setIsOpen(false)
                }}
                whileHover={{ x: 4 }}
                className="
                  w-full
                  flex items-center gap-3
                  px-4 py-3
                  text-red-500
                  hover:text-red-600
                  hover:bg-red-500/10
                  transition-colors
                "
              >
                <IoLogOutOutline className="w-4 h-4" />
                <span>Log Out</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

