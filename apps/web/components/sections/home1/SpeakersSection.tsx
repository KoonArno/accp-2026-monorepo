'use client'
import { useTranslations } from 'next-intl';
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

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

export default function SpeakersSection() {
    const t = useTranslations();

    const speakers = [
        { name: "Kendra Cremin", role: "Business Consultant", img: "team-img2" },
        { name: "Dennis Jacobson", role: "Finance Consultant", img: "team-img1" },
        { name: "Patricia Wilkinson", role: "HR Consultant", img: "team-img3" },
    ]

    return (
        <>
            <div className="team1-section-area sp1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="team-header space-margin60 heading2">
                                <h5 data-aos="fade-left" data-aos-duration={800}>{t('speakers.title')}</h5>
                                <div className="space16" />
                                <h2 className="text-anime-style-3">{t('speakers.subtitle')}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 position-relative">
                            <Swiper {...swiperOptions} className="team-slider-area">
                                {[...speakers, ...speakers].map((speaker, index) => (
                                    <SwiperSlide key={index} className="team-widget-boxarea">
                                        <div className="img1 image-anime">
                                            <img src={`/assets/img/all-images/team/${speaker.img}.png`} alt="" />
                                            <ul>
                                                <li><Link href="/#"><i className="fa-brands fa-facebook-f" /></Link></li>
                                                <li><Link href="/#"><i className="fa-brands fa-linkedin-in" /></Link></li>
                                                <li><Link href="/#"><i className="fa-brands fa-instagram" /></Link></li>
                                                <li><Link href="/#" className="m-0"><i className="fa-brands fa-youtube" /></Link></li>
                                            </ul>
                                        </div>
                                        <div className="space20" />
                                        <div className="text-area">
                                            <Link href="/speakers">{speaker.name}</Link>
                                            <div className="space16" />
                                            <p>{speaker.role}</p>
                                        </div>
                                    </SwiperSlide>
                                ))}
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
            </div>
        </>
    )
}
