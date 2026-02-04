'use client'
import { motion } from 'motion/react';
import { useSidebar } from "@/shared/stores/modal";

interface BurgerProps {
    className?: string;
}

export function Burger({ className = '' }: BurgerProps) {
    const { isOpen, handleMenu } = useSidebar()

    return (
        <motion.button
            className={`
                relative 
                w-10 h-10
                flex items-center justify-center
                group
                hover:border-(--link-color)/50
                transition-colors
                ${className}
            `}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: 'backInOut', delay: 0.1 }}
            onClick={handleMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <span className="relative w-6 h-5">
                <div className={`absolute left-0 h-0.5 transition-all group-hover:bg-(--burger-color-close) rounded-md w-full ${!isOpen ? 'bg-(--burger-color) top-0' : 'bg-(--burger-color-close) top-1/2 -rotate-45'}`}></div>
                <div className={`absolute left-0 top-1/2 h-0.5 transition-all group-hover:bg-(--burger-color-close) rounded-md -translate-y-1/2 ${!isOpen ? 'bg-(--burger-color) w-4' : 'bg-(--burger-color-close) w-0'}`}></div>
                <div className={`absolute left-0 bottom-0 h-0.5 transition-all group-hover:bg-(--burger-color-close) rounded-md w-full ${!isOpen ? 'bg-(--burger-color)' : 'bg-(--burger-color-close) bottom-1/2 translate-y-0.5 rotate-45'}`}></div>
            </span>
        </motion.button>
    );
}

