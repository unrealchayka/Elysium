'use client'

import { motion, AnimatePresence } from "motion/react";
import { videoData } from "@/shared/constants/FakeData";
import { VideoItem } from "@/entities/video";
import { useRef, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { FaPlay, FaHeart } from "react-icons/fa";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from 'swiper';
import { useMediaQuery } from "@/shared/hooks/useWindowSize";
import "swiper/css";
import "swiper/css/navigation";

export function TrendingFilms() {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const carouselRef = useRef<SwiperType | null>(null);
    const isMobile = useMediaQuery(768);
    const videos = [...videoData, {
        title: 'View all tranding films',
        description: '',
        isTrend: false,
        tags: [''],
        imageUrl: '/image/Movies.jpg'
    }]

    const trendingVideos = useMemo(() =>
        videos.filter(video => video),
        []
    );

    const activeVideo = useMemo(() =>
        trendingVideos[activeIndex] || trendingVideos[0],
        [activeIndex, trendingVideos]
    );

    const handlePrevClick = () => {
        if (carouselRef.current) {
            carouselRef.current.slidePrev();
        }
    }

    const handleNextClick = () => {
        if (carouselRef.current) {
            carouselRef.current.slideNext();
        }
    }

    const handleCarouselSlideChange = useCallback((swiper: SwiperType) => {
        const newIndex = swiper.activeIndex;
        if (newIndex >= 0 && newIndex < trendingVideos.length && newIndex !== activeIndex) {
            setActiveIndex(newIndex);
        }
    }, [trendingVideos.length, activeIndex])

    return (
        <div className="relative w-full h-screen flex items-center mt-10">
            <AnimatePresence mode="wait">
                <motion.div
                    className="absolute inset-0 z-0"
                    key={`bg-${activeVideo.title}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Image
                        src={activeVideo.imageUrl}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        alt={activeVideo.title}
                        priority={activeIndex === 0}
                        loading={activeIndex === 0 ? undefined : "lazy"}
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-black via-black/10 to-transparent" />
                </motion.div>
            </AnimatePresence>

            <div className="relative z-10 overflow-x-hidden sm:px-5 md:px-10 lg:px-15 md:flex gap-3 justify-between items-center">
                <motion.div
                    initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: isMobile ? 0.3 : 0.6 }}
                    className="flex flex-col pl-3 flex-1 w-full justify-start space-y-4 md:space-y-6"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                        {activeVideo.title}
                    </h1>
                    {activeVideo.title !== 'View all tranding films' &&
                        <>
                            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-white/80 text-xs sm:text-sm md:text-base">
                                <span>2017</span>
                                <span>•</span>
                                <span>5 Seasons</span>
                                <span>•</span>
                                <div className="flex gap-2">
                                    {activeVideo.tags.slice(0, 2).map((tag, index) => (
                                        <span key={index}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed line-clamp-3 md:line-clamp-none">
                                {activeVideo.description}
                            </p>

                            <div className="flex flex-wrap gap-2 md:gap-4">
                                <Link
                                    href={`/watch?film=${activeVideo.title}`}
                                    className="flex items-center gap-2 bg-[#6200ff] hover:bg-[#7a1aff] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base"
                                >
                                    <FaPlay size={16} className="md:w-4 md:h-4" />
                                    <span className="hidden sm:inline">Play Now</span>
                                    <span className="sm:hidden">Play</span>
                                </Link>
                                <button className="flex items-center gap-2 border-2 border-[#6200ff] text-white hover:bg-[#6200ff]/20 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base">
                                    <FaPlay size={16} className="md:w-4 md:h-4" />
                                    <span className="hidden sm:inline">Watch Trailer</span>
                                    <span className="sm:hidden">Trailer</span>
                                </button>
                                <button className="flex items-center gap-2 border-2 border-[#6200ff] text-white hover:bg-[#6200ff]/20 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base">
                                    <FaHeart size={16} className="md:w-4 md:h-4" />
                                    <span className="hidden md:inline">Add to Wishlist</span>
                                    <span className="md:hidden">Wishlist</span>
                                </button>
                            </div>
                        </>
                    }
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative md:w-[30%] pl-10 md:pl-0 overflow-visible pt-5"
                >
                    <Swiper
                        modules={[Navigation]}
                        onSlideChange={handleCarouselSlideChange}
                        onSwiper={(swiper) => {
                            if (!carouselRef.current) {
                                carouselRef.current = swiper;
                            }
                        }}
                        className="overflow-visible!"
                    >
                        {trendingVideos.slice(isMobile ? 0 : 1).map((video, index) => (
                            <SwiperSlide key={video.id || index}>
                                <div
                                    className={`relative w-[90%] h-50 sm:h-80 mt-5 sm:mt-20 md:mt-0 md:md-40 md:h-60 lg:w-65 lg:h-75 xl:w-80 xl:h-90 2xl:w-100 2xl:h-120 3xl:w-120 3xl:h-130 overflow-hidden rounded-4xl rounded-tl-0 border-2 transition-all duration-300 ${index === activeIndex
                                        ? 'border-[#6200ff] border-4 scale-105 shadow-lg shadow-[#6200ff]/50'
                                        : index < activeIndex
                                            ? 'opacity-0 scale-0 translate-x-25 hidden'
                                            : 'border-[#6200ff]/30'
                                        }`}
                                >
                                    {video.title !== 'View all tranding films'
                                        ?
                                        <>
                                            <Image
                                                src={video.imageUrl}
                                                fill
                                                className="object-cover"
                                                alt={video.title}
                                                priority={index === 0}
                                                loading={index < 2 ? undefined : "lazy"}
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4">
                                                <p className="text-white text-md md:text-2xl font-semibold truncate">{video.title}</p>
                                            </div>
                                        </>
                                        :
                                        <div className="px-5 py-5 w-full h-full">
                                            <Image
                                                src={video.imageUrl}
                                                fill
                                                className="object-cover"
                                                alt={video.title}
                                                priority={index === 0}
                                                loading={index < 2 ? undefined : "lazy"}
                                            />
                                            <div className="relative z-3 text-white bg-[#222]/80 rounded-xl p-3 w-full h-full flex flex-col justify-between ">
                                                <h1 className="text-md lg:text-xl 2xl:text-3xl font-bold">View all tranding films</h1>
                                                <Link
                                                    href='/trainding-films'
                                                    className="bg-purple-800 hover:bg-purple-700 text-md w-20 lg:w-30 p-1 lg:px-3 lg:py-2 rounded-md transition-all"
                                                >
                                                    Click me
                                                </Link>
                                            </div>
                                        </div>}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="flex gap-2 md:gap-3 justify-end mt-4 md:mt-6">
                        <button
                            onClick={handlePrevClick}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#6200ff] hover:bg-[#7a1aff] text-white flex items-center justify-center transition-colors shadow-lg"
                            aria-label="Previous"
                        >
                            <FaChevronLeft size={isMobile ? 16 : 20} />
                        </button>
                        <button
                            onClick={handleNextClick}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#6200ff] hover:bg-[#7a1aff] text-white flex items-center justify-center transition-colors shadow-lg"
                            aria-label="Next"
                        >
                            <FaChevronRight size={isMobile ? 16 : 20} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

