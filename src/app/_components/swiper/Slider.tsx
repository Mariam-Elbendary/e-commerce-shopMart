
"use client";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function Slider({
  spaceBetween,
  slidesPerView,
  pageList,
}: {
  spaceBetween: number;
  slidesPerView: number;
  pageList: string[];
}) {
  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        loop={true}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".slider-next",
          prevEl: ".slider-prev",
        }}
        pagination={{
          clickable: true,
          bulletClass:
            "swiper-pagination-bullet !h-2 !w-2 !bg-white !opacity-70",
          bulletActiveClass:
            "swiper-pagination-bullet-active !w-6 !rounded-full !bg-indigo-600 !opacity-100",
        }}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        className="group"
      >
        {pageList.map((src) => (
          <SwiperSlide key={src}>
            <div className="relative h-[220px] w-full overflow-hidden sm:h-[300px] md:h-[380px] lg:h-[450px]">
              <Image
                src={src}
                alt="Shop banner"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-indigo-900/10" />
            </div>
          </SwiperSlide>
        ))}

        <button
          className="slider-prev absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-indigo-600 hover:text-white sm:left-5 sm:h-12 sm:w-12"
          aria-label="Previous slide"
        >
          <span className="text-2xl leading-none">
            <IoIosArrowBack />
          </span>
        </button>

        <button
          className="slider-next absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-indigo-600 hover:text-white sm:right-5 sm:h-12 sm:w-12"
          aria-label="Next slide"
        >
          <span className="text-2xl leading-none">
            <IoIosArrowForward />
          </span>
        </button>
      </Swiper>
    </div>
  );
}

