'use client'
import { useTranslations } from 'next-intl';
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper as SwiperOriginal, SwiperSlide as SwiperSlideOriginal } from "swiper/react"

const Swiper = SwiperOriginal as any;
const SwiperSlide = SwiperSlideOriginal as any;

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 3,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,
    navigation: {
        nextEl: '.owl-next',
        prevEl: '.owl-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 30 },
        575: { slidesPerView: 2, spaceBetween: 30 },
        767: { slidesPerView: 2, spaceBetween: 30 },
        991: { slidesPerView: 2, spaceBetween: 30 },
        1199: { slidesPerView: 3, spaceBetween: 30 },
        1350: { slidesPerView: 3, spaceBetween: 30 },
    }
}

export default function MemoriesSection() {
    const t = useTranslations();

    const memories = [
        { img: "memory-img1", year: "2024" },
        { img: "memory-img2", year: "2024" },
        { img: "memory-img3", year: "2024" },
    ]

    return (
        <>
            <div className="memory1-section-area sp1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 m-auto">
                            <div className="memory-header text-center heading2 space-margin60">
                                <h5 data-aos="fade-left" data-aos-duration={800}>{t('memories.title')}</h5>
                                <div className="space16" />
                                <h2 className="text-anime-style-3">{t('memories.subtitle')}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 memory-slider-area">
                            {/* @ts-ignore */}
                            <Swiper {...swiperOptions} className="owl-carousel">
                                {[...memories, ...memories].map((memory, index) => {
                                    // @ts-ignore
                                    return (
                                        <SwiperSlide key={index} className="memory-boxarea">
                                            <div className="img1 image-anime">
                                                <img src={`/assets/img/all-images/memory/${memory.img}.png`} alt="" />
                                            </div>
                                            <div className="content-area">
                                                <img src="/assets/img/icons/logo1.svg" alt="" className="logo1 keyframe5" />
                                                <div className="arrow">
                                                    <Link href="/memories"><i className="fa-solid fa-arrow-right" /></Link>
                                                </div>
                                                <div className="space18" />
                                                <p>{t('memories.event')} {memory.year}</p>
                                                <div className="space12" />
                                                <Link href="/memories">{t('memories.eventConferences')}</Link>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>

                            <div className="owl-nav">
                                <button type="button" role="presentation" className="owl-prev h1p">
                                    <i className="fa-solid fa-angle-left" />
                                </button>
                                <button type="button" role="presentation" className="owl-next h1n">
                                    <i className="fa-solid fa-angle-right" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
