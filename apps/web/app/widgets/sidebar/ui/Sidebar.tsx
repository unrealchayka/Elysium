'use client'
import { useSidebar } from "@/shared/stores/modal";
import { motion } from "motion/react";
import { Logo } from "../../header/ui/Logo";
import { IoHome, IoSunnyOutline } from "react-icons/io5";
import { RiMovie2Line } from "react-icons/ri";
import { TbDeviceTvOld } from "react-icons/tb";
import { MdOutlineExplore, MdOutlineWatchLater } from "react-icons/md";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { FaRegBookmark } from "react-icons/fa6";
import { SidebarNavigate } from "./SidebarNavigate";
import { IoPlayOutline } from "react-icons/io5";
import { IoFolderOpenOutline } from "react-icons/io5";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { Burger } from "../../header/ui/Burger";
import { useMediaQuery } from "@/shared/hooks/useWindowSize";
import { IList } from "@/entities/video";
import { IoMdNotificationsOutline } from "react-icons/io";

export function Sidebar() {
    const isOpen = useSidebar((state) => state.isOpen)
    const isMedia900 = useMediaQuery(900)

    const liList: IList[] = [
        {
            name: 'Home',
            icon: <IoHome />,
            link: '/',
            type: 'link',
        },
        ...(isMedia900 ? [{
            name: 'Genres',
            icon: <HiOutlineNewspaper />,
            link: '/genres',
            type: 'link',
        }] as IList[] : []),
        {
            name: 'Recommend',
            icon: <MdOutlineExplore />,
            link: '/recommend',
            type: 'link',
        },
        {
            name: 'Favorites',
            icon: <FaRegBookmark />,
            link: '/favorites',
            type: 'link',
        },
    ];

    const secondLiList: IList[] = [
        {
            name: 'Movies',
            icon: <RiMovie2Line />,
            link: '/movies',
            type: 'link',
        },
        {
            name: 'Tv',
            icon: <TbDeviceTvOld />,
            link: '/tv',
            type: 'link',
        },
        {
            name: 'Continue Watching',
            icon: <IoPlayOutline />,
            link: '/continue-watching',
            type: 'link',
        },
        {
            name: 'Recently Added',
            icon: <MdOutlineWatchLater />,
            link: '/recently-added',
            type: 'link',
        },
    ];

    const thirtLiList: IList[] = [
        {
            name: 'My Collections',
            icon: <IoFolderOpenOutline />,
            link: '/my-collections',
            type: 'link',
        },
        {
            name: 'Downloads',
            icon: <PiDownloadSimpleBold />,
            link: '/downloads',
            type: 'link',
        },
        ...(isMedia900 ? [{
            name: 'Notifications',
            icon: <IoMdNotificationsOutline />,
            link: '/notifications',
            type: 'link',
        }] as IList[] : []),
        {
            name: 'Settings',
            icon: <IoSettingsOutline />,
            link: '/settings',
            type: 'link',
        },
        {
            name: 'Toggle Theme',
            icon: <IoSunnyOutline />,
            type: 'btn',
            onClick: () => console.log('Toggle theme'),
        },
    ];

    return (
        <div className="flex fixed z-50 top-0 left-0 h-full py-5 pl-5 max-[900px]:p-0">
            <motion.aside
                className={`top-0 z-2 h-full ${isOpen ? 'w-62.5' : 'w-0'} overflow-hidden py-3 md:py-6 flex flex-col transition-all duration-400 ease-in-out gap-5 bg-[#111] shadow-sm shadow-amber-50/30 rounded-sm`}
            >
                <Logo />
                <SidebarNavigate list={liList} />
                <SidebarNavigate className="border-t border-b border-white/15" list={secondLiList} />
                <SidebarNavigate list={thirtLiList} />
            </motion.aside>
            <Burger className={`
                ${isMedia900 
                    ? `absolute right-13 top-2 z-30 ${!isOpen && 'left-3 top-2 bg-(--first-bg-color) border border-(--first-border-color) rounded-lg'}`
                    : 'ml-3 z-30 bg-(--first-bg-color) border border-(--first-border-color) rounded-lg p-3'
                }
            `}
            />
        </div>
    );
}

