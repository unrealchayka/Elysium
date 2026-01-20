'use client'
import useOpacity from "@/app/hooks/useOpacity";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";


function Palitre() {
    const {targetRef, opacity} = useOpacity()
    return (
        <motion.div 
        ref = {targetRef}
        style={{ opacity }}
        className="min-w-75 max-w-170 px-5 py-3 bg-(--first-bg-color) border border-(--first-border-color) rounded-xl flex flex-col gap-3">

            <Link href='#' className="text-(--link-color) hover:text-(--link-color-hover) transition-colors text-2xl" >Link color !</Link>
            <h1 className="text-(--first-text-color) text-4xl">Hyper text color !</h1>
            <p className="text-(--second-text-color) mt-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae molestiae eum voluptatibus animi, ipsum totam ex. Temporibus perspiciatis pariatur recusandae harum rem, quae reiciendis quaerat labore minima repellat quibusdam, maxime ipsam accusantium dolorum necessitatibus sunt officia tempora qui iusto quisquam repudiandae sit porro. Aperiam atque totam, perspiciatis inventore laboriosam enim.</p>

        </motion.div>
    );
}

export default Palitre;