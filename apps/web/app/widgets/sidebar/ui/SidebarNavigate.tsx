'use client'
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IList } from "@/entities/video";

export function SidebarNavigate({ list, className }: { list: IList[], className?: string }) {
    const pathname = usePathname();
    const currentPath = pathname.slice(1);

    return (
        <motion.ul className={`flex flex-col md:gap-2 w-50 ${className}`} role="list">
            {list.map((item, index) => {
                if (item.type === 'btn') {
                    return (
                        <motion.li
                            initial={{ x: 50, opacity: 0, paddingLeft: 0 }}
                            animate={{ x: 0, opacity: 1, paddingLeft: 30 }}
                            transition={{ ease: 'backInOut', delay: (index * 0.1) + 0.1 }}
                            key={`${item.name}-${index}`}
                        >
                            <button
                                onClick={item.onClick || item.store}
                                className={`flex gap-3 items-center min-[600px]:py-2 text-sm w-full text-left 
                                           text-(--header-link-color) hover:text-(--header-link-color-active) 
                                           transition-colors cursor-pointer`}
                                type="button"
                            >
                                <span className="text-lg">{item.icon}</span> 
                                {item.name}
                            </button>
                        </motion.li>
                    );
                }

                if (item.type === 'link' && item.link) {
                    const isActive = currentPath === item.link.slice(1);
                    
                    return (
                        <motion.li
                            initial={{ x: 50, opacity: 0, paddingLeft: 0 }}
                            animate={{ x: 0, opacity: 1, paddingLeft: 30 }}
                            transition={{ ease: 'backInOut', delay: (index * 0.1) + 0.1 }}
                            key={`${item.name}-${index}`}
                        >
                            <Link
                                href={item.link}
                                className={`flex gap-3 items-center py-1.5 min-[600px]:py-2 text-sm 
                                           ${isActive ? 'text-(--header-link-color-active)' : 'text-(--header-link-color)'} 
                                           hover:text-(--header-link-color-active) transition-colors`}
                            >
                                <span className="text-lg">{item.icon}</span> 
                                {item.name}
                            </Link>
                        </motion.li>
                    );
                }

                return (
                    <motion.li
                        initial={{ x: 50, opacity: 0, paddingLeft: 0 }}
                        animate={{ x: 0, opacity: 1, paddingLeft: 30 }}
                        transition={{ ease: 'backInOut', delay: (index * 0.1) + 0.1 }}
                        key={`${item.name}-${index}`}
                    >
                        <span className="flex gap-3 items-center py-2 text-sm text-gray-400 cursor-not-allowed">
                            <span className="text-lg">{item.icon}</span> 
                            {item.name}
                        </span>
                    </motion.li>
                );
            })}
        </motion.ul>
    );
}

