'use client'
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export function Logo() {
    return (
        <motion.div
            initial={{ y: -50, opacity: 0,  paddingLeft: 0 }}
            animate={{ y: 0, opacity: 1,  paddingLeft: 30 }}
            transition={{ ease: 'backInOut' }}
            className="flex items-center">
            <Link href="/" className="flex gap-2 text-white text-xl font-bold" aria-label="Главная страница">
                <span className="rounded-full bg-(--logo-bg-color) w-15 h-7 text-(--logo-color) flex justify-center items-center">
                    <Image className="-translate-x-px" src='svg/logo.svg' width={25} height={25} alt="logo"></Image>
                </span>
                <span className="uppercase">Elysium</span>
            </Link>
        </motion.div>
    );
}

