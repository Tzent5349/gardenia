"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// internal
import slider_img_1 from "@/public/assets/slider/img/slider-1.png";
import slider_img_2 from "@/public/assets/slider/img/slider-2.png";
import slider_img_3 from "@/public/assets/slider/img/slider-3.png";
import slider_shape from "@/public/assets/slider/shape/shape-1.png";
import thumb_shape_1 from "@/public/assets/slider/shape/shape-2.png";
import thumb_shape_2 from "@/public/assets/slider/shape/shape-3.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// slider data
const slider_data = [
  {
    id: 1,
    subtitle: "New Arrivals 2023",
    title: "The Clothing Collection",
    img: slider_img_1,
  },
  {
    id: 2,
    subtitle: "Best Selling 2023",
    title: "The Summer Collection",
    img: slider_img_2,
  },
  {
    id: 3,
    subtitle: "Winter Has Arrived",
    title: "Amazing New designs",
    img: slider_img_3,
  },
];

export default function App() {
  return (
    <>
      <div className="hidden md:flex  ">
        <Swiper
          pagination={true}
          loop={true}
          /*         breakpoints={{
            '@0.00': {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            '@0.75': {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            '@1.00': {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            '@1.50': {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }} */
          effect={"fade"}
          autoplay={{
            delay: 6500,
            disableOnInteraction: true,
          }}
          /*           centeredSlides={true} */

          modules={[Pagination, Autoplay, EffectFade]}
          direction="vertical"
          className="mySwiper w-full h-[90vh] z-20"
        >
          {slider_data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-[#eff0ed] flex flex-1 flex-col lg:flex-row  h-full items-center px-4 md:px-14  text-black ">
                <div className="self-start hidden md:block">
                  <Image className="" src={slider_shape} alt="slider_shape" />
                </div>
                <div className="container pl-0 flex mt-10">
                  <div className="row ">
                    <div className="lg:w-1/2 md:w-1/2 pr-4 md:pl-4">
                      <div className=" md:w-[546px] text-start ">
                        <span className="font-normal text-xl mb-4 text-start">
                          {item.subtitle}
                        </span>
                        <h3 className="font-normal text-6xl md:text-8xl mb-8 text-start">
                          {item.title}
                        </h3>
                        <div className="">
                          <Button
                            size={"lg"}
                            className=" text-base font-normal text-primary-foreground  border rounded-none"
                          >
                            <Link href="/shop" className="">
                              Shop Collection
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="xl:w-1/2  lg:w-1/2 md:w-1/2 pr-4 pl-4 self-start">
                    <div className="">
                      <Image className="" src={thumb_shape_1} alt="shape" />
                      <Image className="" src={thumb_shape_2} alt="shape" />
                    </div>
                  </div>
                </div>
                <div className="mainImageContainer tp-slider-thumb-2 flex self-end">
                  <span className=""></span>
                  <Image
                    src={item.img}
                    alt="slider img"
                    className="slide-img"
                    priority
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex md:hidden">
        <Swiper
          pagination={true}
          loop={true}
          /*         breakpoints={{
            '@0.00': {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            '@0.75': {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            '@1.00': {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            '@1.50': {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }} */
          effect={"fade"}
          autoplay={{
            delay: 6500,
            disableOnInteraction: true,
          }}
          /*           centeredSlides={true} */

          modules={[Pagination, Autoplay, EffectFade]}
          direction="horizontal"
          className="mySwiper w-full  z-10"
        >
          {slider_data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-[#eff0ed] flex flex-1 flex-col lg:flex-row  h-full items-center px-4 md:px-14  text-black ">
                <div className="self-start hidden md:block">
                  <Image className="" src={slider_shape} alt="slider_shape" />
                </div>
                <div className="container pl-0 flex mt-10">
                  <div className="row ">
                    <div className="lg:w-1/2 md:w-1/2 pr-4 md:pl-4">
                      <div className=" md:w-[546px] text-start ">
                        <span className="font-normal text-xl mb-4 text-start">
                          {item.subtitle}
                        </span>
                        <h3 className="font-normal text-6xl md:text-8xl mb-8 text-start">
                          {item.title}
                        </h3>
                        <div className="">
                          <Button
                            size={"lg"}
                            className=" text-base font-normal text-primary-foreground border rounded-none"
                          >
                            <Link href="/shop" className="">
                              Shop Collection
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="xl:w-1/2  lg:w-1/2 md:w-1/2 pr-4 pl-4 self-start">
                    <div className="">
                      <Image className="" src={thumb_shape_1} alt="shape" />
                      <Image className="" src={thumb_shape_2} alt="shape" />
                    </div>
                  </div>
                </div>
                <div className="mainImageContainer tp-slider-thumb-2 flex self-end">
                  <span className=""></span>
                  <Image
                    src={item.img}
                    alt="slider img"
                    className="slide-img"
                    priority
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
