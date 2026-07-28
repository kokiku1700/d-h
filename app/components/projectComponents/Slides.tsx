"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import PortfolioCard from "./ProjectCard";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import ProjectCard from "./ProjectCard";

export default function Slides () {

    return (
        <Swiper
            className="h-full"
            modules={[Navigation]}
            slidesPerView={3}
            spaceBetween={30}
            centeredSlides
            loop
            navigation>
            <SwiperSlide>
                <ProjectCard />
            </SwiperSlide>
            <SwiperSlide>
                <ProjectCard />
            </SwiperSlide>
            <SwiperSlide>
                <ProjectCard />
            </SwiperSlide>
            <SwiperSlide>
                <ProjectCard />
            </SwiperSlide>
            <SwiperSlide>
                <ProjectCard />
            </SwiperSlide>
        </Swiper>
    )
}