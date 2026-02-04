'use client'
import { useMediaQuery } from "@/shared/hooks/useWindowSize";
import { NotificationButton } from "@/features/notifications";
import { ProfileBtn } from "@/features/profile";
import { Search } from "@/features/search";
import { GanreBtn } from "@/features/genre";

export function Header() {
    if (useMediaQuery(900)) {
        return undefined
    }
    
    return (
        <header className="w-full z-40 fixed ">
            <nav className="mx-auto px-6 py-6" aria-label="Основная навигация">
                <div className="flex z-30 gap-3 h-12 items-center justify-end text-md">
                    <GanreBtn/>
                    <NotificationButton/>
                    <Search/>
                    <ProfileBtn user={{name: 'Andrey', email: 'akorucev@gmail.com'}}/>
                </div>
            </nav>
        </header>
    );
}

