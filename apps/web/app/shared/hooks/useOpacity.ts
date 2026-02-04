import { useScroll, useTransform } from "motion/react";
import { useRef } from "react";

function useOpacity() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start 82%", "start -10%",]
    });
    const opacity = useTransform(
        scrollYProgress, 
        [0, 0.2, 0.8, 1], // Диапазоны прогресса
        [0, 1, 1, 0]      // Значения opacity
    );
    return ( {targetRef, opacity} );
}

export default useOpacity;