'use client'
import { useMediaQuery } from "@/app/hooks/useWindowSize";
import NotificationButton from "../../ui/Notification";
import ProfileBtn from "../../ui/ProfileBtn";
import Search from "../../ui/Search";
import GanreBtn from "../ganre/GanreBtn";


function Header() {
    
    if (useMediaQuery(900))
    {
        return undefined
    }
    
    return (

        <header className="w-full z-10">
            <nav className="mx-auto px-6 py-6" aria-label="Основная навигация">
                <div className="flex relative gap-3 h-12 items-center justify-end text-md">
                    <GanreBtn/>
                    <NotificationButton/>
                    <Search/>
                    <ProfileBtn user={{name: 'Andrey', email: 'akorucev@gmail.com'}}/>
                </div>
            </nav>
        </header>

    );
}

export default Header;