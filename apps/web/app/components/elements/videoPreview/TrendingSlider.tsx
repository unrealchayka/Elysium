'use client';

import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { VideoItem } from '@/app/types/video';
import { useMediaQuery } from '@/app/hooks/useWindowSize';

interface TrendingSliderProps {
  videos: VideoItem[];
}

function TrendingSlider({ videos }: TrendingSliderProps) {
  // Фильтруем только трендовые видео
  const trendingVideos = videos.filter(video => video.isTrend === true);

  // Refs для навигации Swiper
  const swiperRef = useRef<SwiperType | null>(null);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const isMedia900 = useMediaQuery(900)

  // Состояние для активного слайда
  const [activeIndex, setActiveIndex] = useState(0);

  if (trendingVideos.length === 0) {
    return null;
  }

  const activeVideo = trendingVideos[activeIndex];

  // Обработчик клика по навигационным точкам
  const handleDotClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
      setActiveIndex(index);
    }
  };

  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] shadow-sm shadow-amber-50/30 rounded-2xl overflow-hidden mb-10">
      {/* Основной Swiper слайдер */}
      <Swiper
        modules={[EffectFade, Autoplay, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          // Инициализация навигации после загрузки Swiper
          setTimeout(() => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }, 100);
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="absolute z-10 inset-0 w-full h-full"
      >
        {trendingVideos.map((video, index) => (
          <SwiperSlide key={video.id || index}>
            <div className="relative w-full h-full">
              {/* Фоновое изображение */}
              <div className="absolute z-10 inset-0">
                <Image
                  src={video.imageUrl}
                  alt={video.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-linear-45 from-black via-black/30 to-transparent"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Кнопки навигации Swiper */}
      {!isMedia900 &&
        <>
          <button
            ref={navigationPrevRef}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            ref={navigationNextRef}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      }

      {/* Контент поверх слайдера */}
      <div className="absolute top-0 left-3 pointer-events-none z-12 h-full flex items-end pb-15 md:pb-16 lg:pb-24 px-2 md:px-8 lg:px-12">
        <div className="max-w-4xl">
          {/* Бейдж "Now Trending" */}
          <div className="mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3">
              Now Trending
            </h2>

            {/* Теги активного видео */}
            <div className="flex pointer-events-auto flex-wrap gap-2 md:gap-3 mb-4">
              {activeVideo.tags.slice(0, 3).map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 md:px-4 py-1 md:py-2 bg-white/10 backdrop-blur-sm text-white text-xs md:text-sm font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Заголовок и описание */}
          <div className="space-y-2 md:space-y-6 mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              {activeVideo.title}
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-gray-200 max-w-2xl leading-relaxed">
              {activeVideo.description}
            </p>
          </div>

          {/* Основные кнопки действий */}
          <div className="flex min-[650px]:flex-col pointer-events-auto sm:flex-row flex-wrap gap-2 md:gap-4 mb-3">
            <button className="px-4 md:px-8 py-2 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-base md:text-lg rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl hover:shadow-purple-500/30 flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Now
            </button>

            <button className="px-4 md:px-8 pointer-events-auto py-2 md:py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-base md:text-lg rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              Add to Watchlist
            </button>

            <button className="px-4 md:px-8 pointer-events-auto py-2 md:py-4 bg-gray-800/50 backdrop-blur-sm text-white font-bold text-base md:text-lg rounded-lg border border-gray-600 hover:bg-gray-700/50 transition-all duration-300 flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
              Download
            </button>

            <button className="px-2 md:px-8 pointer-events-auto py-2 md:py-4 bg-gray-800/50 backdrop-blur-sm text-white font-bold text-base md:text-lg rounded-lg border border-gray-600 hover:bg-gray-700/50 transition-all duration-300 flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
              More
            </button>
          </div>

          {/* Дополнительная информация */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-300 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
              <span className="font-medium">HD 4K</span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
              <span className="font-medium">Dolby Atmos</span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
              </svg>
              <span className="font-medium">2h 15m</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★</span>
              <span className="font-medium">8.7/10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Навигационные точки (Dots) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
        {trendingVideos.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${index === activeIndex
              ? 'bg-white w-8 md:w-10'
              : 'bg-white/50 hover:bg-white/70'
              }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  );
}

export default TrendingSlider;