'use client'

import { useMediaQuery } from "@/app/hooks/useWindowSize";
import { useSidebar } from "@/app/stores/modal";

export function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const isOpen = useSidebar((state) => state.isOpen)
    const isMedia900 = useMediaQuery(900)
    return ( 
        <main className={`px-6 lg:px-3 float-end transition-all duration-400 ease-in-out ${isMedia900 ? 'pt-3 w-full': isOpen? 'w-[calc(100vw-271px)]' : 'w-full'} `}>
            <div className="m-auto">
                {children} 
            </div> 
        </main>
     );
}

export default Main;
