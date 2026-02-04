'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Image from 'next/image';
import { VideoItem } from '@/entities/video';
import { useSizeImage } from "@/shared/hooks/useSizeImage";
import Link from 'next/link';
import { useMediaQuery } from '@/shared/hooks/useWindowSize';

interface VideoPreviewProps {
  videos: VideoItem[];
  title: string
  btnUrl: string
  className?: string
}

export function Films({ videos, title, btnUrl, className }: VideoPreviewProps) {
  const isMedia900 = useMediaQuery(900)
  
  if (videos.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No trending videos available</p>
      </div>
    );
  }

  return (
    <div className={`relative py-2 ${className}`}>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
            {title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        </div>
        <div className='flex flex-col items-end'>
          <div className="w-10 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          <Link href={btnUrl} className='text-white lg:text-2xl font-bold'>See All</Link>
        </div>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={!isMedia900}
          pagination={{
            clickable: true,
            dynamicBullets: true
          }}
          autoplay={!isMedia900 ? {
            delay: 5000,
            disableOnInteraction: false,
          } : false}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          className="trending-swiper"
        >
          {videos.map((video, index) => (
            <SwiperSlide key={video.id || index}>
              <TrendingVideoCard video={video} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>

        <style jsx global>{`
          .trending-swiper {
            padding-bottom: 60px;
          }
          
          .trending-swiper .swiper-button-next,
          .trending-swiper .swiper-button-prev {
            color: #fff;
            background: rgba(255, 255, 255, 0.1);
            width: 44px;
            padding: 10px;
            border: black solid 3px;
            height: 44px;
            border-radius: 50%;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
          }
          
          .trending-swiper .swiper-button-next:after,
          .trending-swiper .swiper-button-prev:after {
            font-size: 20px;
          }
          
          .trending-swiper .swiper-button-next:hover,
          .trending-swiper .swiper-button-prev:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
          }
          
          .trending-swiper .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.5);
            width: 10px;
            height: 10px;
            opacity: 1;
          }
          
          .trending-swiper .swiper-pagination-bullet-active {
            background: linear-gradient(45deg, #8B5CF6, #EC4899);
            transform: scale(1.2);
          }
        `}</style>
      </div>
    </div>
  );
}

function TrendingVideoCard({ video, index = 0 }: { video: VideoItem; index?: number }) {
  const size = useSizeImage(video.imageUrl);

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gray-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20">
      <div className="relative overflow-hidden h-64 md:h-72 lg:h-80">
        <Image
          src={video.imageUrl}
          alt={video.title}
          width={size.width}
          height={size.height}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          priority={index < 4}
          loading={index < 4 ? undefined : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full">
            TRENDING
          </span>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {video.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
          {video.tags.length > 2 && (
            <span className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs font-medium rounded-full">
              +{video.tags.length - 2}
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
          {video.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {video.description}
        </p>
        <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/30">
          Watch Now
        </button>
      </div>
    </div>
  );
}

