'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { companies } from "@/shared/constants/FakeCompany";
import { Autoplay } from "swiper/modules";
import Image from "next/image";


function SliderCompanies() {
    return (
        <div className="py-10 mb-10">
            <Swiper
                slidesPerView="auto"
                freeMode={true}
                speed={4000}
                loop
                allowTouchMove={false}
                modules={[Autoplay]}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                }}
                onInit={(swiper) => {
                    swiper.autoplay.start();
                }}
                className="my-swiper-container"
            >
                {companies.map((company) => {
                    return (
                        <SwiperSlide
                            className="w-50! h-20! sm:w-60! sm:h-30! md:w-80! md:h-40!"
                            key={`${company.name}-${company.id}`}
                        >
                            <Image
                                src={company.imagePath}
                                alt={company.name}
                                fill
                                sizes="(max-width: 768px) 100px, 150px" // опционально для оптимизации
                                className="object-contain" 
                                />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div >
    );
}

export default SliderCompanies;