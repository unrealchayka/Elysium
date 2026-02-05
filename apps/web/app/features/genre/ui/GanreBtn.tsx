'use client'
import { motion, AnimatePresence } from "motion/react";
import { useGanreBtn } from "@/shared/stores/modal";
import { genres } from "@/shared/constants/FakeGanre";
import { CiCircleChevDown } from "react-icons/ci";
import { useEffect, useRef } from "react";
import Link from "next/link";

export function GanreBtn() {
    const { isOpen, handleMenu } = useGanreBtn()
    const ganreRef = useRef<HTMLUListElement>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && ganreRef.current && !ganreRef.current.contains(event.target as Node)) {
                handleMenu(false)
            }
        }
        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [isOpen, handleMenu])

    return (
        <div className="">
            <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white text-lg bg-[#111] px-4 
                    rounded-xl py-2 hover:text-(--link-color)
                    hover:border-(--link-color)/50 transition-all 
                    shadow-sm border border-(--first-border-color) 
                    h-full flex hover justify-center gap-3 items-center
                    "
                onClick={() => handleMenu(!isOpen)}
            >
                <p>Ganres</p>
                <CiCircleChevDown size={25} className={`transition-all ${isOpen && 'rotate-180'}`} />
            </motion.span>
            <AnimatePresence mode="wait">
                {isOpen &&
                    <motion.ul
                        ref={ganreRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute flex flex-wrap items-start gap-3 text-md px-10 py-5 w-250 
                                    bg-[#111]
                                    backdrop-blur-[3px] border border-white/20 
                                    shadow-2xl shadow-purple-900/30 rounded-2xl text-white z-100 top-20 right-6">
                        {genres.map((genre, index) => {
                            return (
                                <motion.li onClick={() => handleMenu(false)} key={`${index}-${genre}`}>
                                    <Link
                                        key={genre.slugName}
                                        href={`/movies?genre=${genre.slugName}`}
                                        className="group relative overflow-hidden"
                                    >
                                        <span className="absolute inset-0 bg-linear-to-r from-purple-600/0 via-purple-500/0 to-pink-600/0 
                                                        group-hover:from-purple-600/20 group-hover:via-purple-500/30 group-hover:to-pink-600/20 
                                                        transition-all duration-300 rounded-full" />

                                        <span className="relative border border-white/20 bg-black/60 backdrop-blur-sm 
                                                    py-1.5 px-4 rounded-full text-sm font-medium
                                                    group-hover:border-purple-400/40 group-hover:bg-white/
                                                    group-hover:shadow-lg group-hover:shadow-purple-900/30
                                                    transition-all duration-300 ease-out
                                                    flex items-center gap-2">
                                            {genre.title}
                                            <svg className="w-0 h-4 group-hover:w-4 transition-all duration-300"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </span>
                                    </Link>
                                </motion.li>
                            )
                        })}
                    </motion.ul>
                }
            </AnimatePresence>
        </div>
    );
}

