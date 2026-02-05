import { recommendedFilms } from "@/shared/constants/Recommend";
import Image from "next/image";
import Link from "next/link";

export default function Explores() {
    return (
        <div className="container px-2 sm: m-auto text-(--first-text-color)">
            <div className="pt-15 min-[900px]:pt-30">
                <h1 className="text-(--first-text-color) text-4xl  md:text-6xl  mb-3">Recommend</h1>
                <p className="text-sm sm:text-lg md:text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, ullam optio quae rerum dicta soluta aut animi vitae, a aliquid accusantium tempore magni voluptates quaerat distinctio laboriosam, vero magnam. Delectus.</p>
            </div>

            <div className="mt-30">
                <h1 className="text-(--first-text-color) text-4xl  md:text-6xl mb-3"></h1>
                <div className="flex gap-5 justify-center flex-wrap">
                    {recommendedFilms.map((film) => {
                        return (
                            <div
                                key={film.id}
                                className="
                                    relative w-full 
                                    max-[350px]:h-40 max-[450px]:h-50
                                    sm:w-75 md:w-90 lg:w-120 xl:w-100
                                    2xl:w-120 h-60
                                    mb-15
                                  ">
                                <div className="relative w-full h-full rounded-xl overflow-hidden">
                                    <Image
                                        src={film.imageUrl}
                                        alt={film.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover"
                                    />
                                    <div
                                        className="
                                        absolute opacity-0 hover:opacity-100 transition-all w-full h-full
                                        bg-[#111]/70
                                        flex items-end gap-3
                                        pb-3 pl-5
                                    "
                                    >
                                        <Link
                                            href={`/watch/${film.id}`}
                                            className="
                                            flex items-center justify-center
                                            px-4 py-2 min-h-9
                                            bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800
                                            text-white text-sm font-medium
                                            rounded-lg
                                            shadow-lg hover:shadow-xl
                                            transition-all duration-200
                                            active:scale-95
                                            whitespace-nowrap
                                            "
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                            </svg>
                                            <span>Смотреть</span>
                                        </Link>

                                        <Link
                                            href={`/favorites/add/${film.id}`}
                                            className="
                                                flex items-center justify-center
                                                w-9 h-9
                                                bg-white/10 hover:bg-white/20
                                                backdrop-blur-sm
                                                text-white
                                                rounded-lg
                                                border border-white/20
                                                transition-all duration-200
                                                hover:scale-110 active:scale-95
                                                group
                                            "
                                            title="Добавить в избранное"
                                        >
                                            <svg className="w-5 h-5 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </Link>

                                        <Link
                                            href={`/details/${film.id}`}
                                            className="
                                                flex items-center justify-center
                                                w-9 h-9
                                                bg-white/10 hover:bg-white/20
                                                backdrop-blur-sm
                                                text-white
                                                rounded-lg
                                                border border-white/20
                                                transition-all duration-200
                                                hover:scale-110 active:scale-95
                                                group
                                            "
                                            title="Подробнее"
                                        >
                                            <svg className="w-5 h-5 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                                <div className="pt-3 text-md md:text-xl px-2 bg-[#111]/70 rounded-md">{film.title}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
