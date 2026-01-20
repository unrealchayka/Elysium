'use client'
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function LiElements() {
    const path = usePathname().slice(1)
    const liList = [
        {
            name: 'Home',
            link: '/'
        },
        
        {
            name: 'Explore',
            link: '/'
        },

        {
            name: 'Genres',
            link: '/'
        },

        {
            name: 'Movies',
            link: '/movies'
        },

        {
            name: 'Tv',
            link: '/tv'
        },
    ]
    return (
        <>
            {liList.map((li, index) => {
                return (
                    <motion.li
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ ease: 'backInOut', delay: (index * 0.05) + 0.05 }}
                        key={li.name + index}
                    >
                        <Link href={li.link} className={`${path === li.link.slice(1) ? 'text-(--header-link-color-active)' : 'text-(--header-link-color)'} hover:text-(--header-link-color-active) transition-colors`}>
                            {li.name}
                        </Link>
                    </motion.li>)
            })}

            <motion.li
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: 'backInOut', delay: 0.25 }}
            >
                <button

                    className={`text-(--header-link-color) hover:text-(--header-link-color-active) transition-colors`}>
                    Search
                </button>
            </motion.li>
        </>
    );
}

export default LiElements;