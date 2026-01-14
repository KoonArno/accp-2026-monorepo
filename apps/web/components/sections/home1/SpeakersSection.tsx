'use client'
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper as SwiperOriginal, SwiperSlide as SwiperSlideOriginal } from "swiper/react"

const Swiper = SwiperOriginal as any;
const SwiperSlide = SwiperSlideOriginal as any;

interface Speaker {
    id: number;
    firstName: string;
    lastName: string;
    organization?: string;
    position?: string;
    photoUrl?: string;
}

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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SpeakersSection() {
    const t = useTranslations();
    const [speakers, setSpeakers] = useState<Speaker[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSpeakers = async () => {
            try {
                console.log('Fetching speakers from:', `${API_URL}/api/speakers`);
                const res = await fetch(`${API_URL}/api/speakers`);
                if (res.ok) {
                    const data = await res.json();
                    setSpeakers(data.speakers || []);
                } else {
                    console.error('Fetch response not ok:', res.status, res.statusText);
                }
            } catch (error) {
                console.error('Failed to fetch speakers:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSpeakers();
    }, []);

    // Fallback data if no speakers from API
    const displaySpeakers = speakers.length > 0 ? speakers : [
        { id: 1, firstName: "Kendra", lastName: "Cremin", position: "Business Consultant", photoUrl: "/assets/img/all-images/team/team-img2.png" },
        { id: 2, firstName: "Dennis", lastName: "Jacobson", position: "Finance Consultant", photoUrl: "/assets/img/all-images/team/team-img1.png" },
        { id: 3, firstName: "Patricia", lastName: "Wilkinson", position: "HR Consultant", photoUrl: "/assets/img/all-images/team/team-img3.png" },
    ];

    // Helper to get reliable image URL from Google Drive via our proxy
    const getSpeakerImageUrl = (url: string | undefined, fallbackIndex: number) => {
        if (!url) return `/assets/img/all-images/team/team-img${(fallbackIndex % 3) + 1}.png`;

        // If it's a Google Drive URL, use our proxy
        if (url.includes('drive.google.com')) {
            return `${API_URL}/upload/proxy?url=${encodeURIComponent(url)}`;
        }

        return url;
    };

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
                            {isLoading ? (
                                <div className="text-center py-5">Loading speakers...</div>
                            ) : (
                                <Swiper {...swiperOptions} className="team-slider-area">
                                    {[...displaySpeakers, ...displaySpeakers].map((speaker, index) => (
                                        <SwiperSlide key={index} className="team-widget-boxarea">
                                            <div className="img1 image-anime">
                                                <img
                                                    src={getSpeakerImageUrl(speaker.photoUrl, index)}
                                                    alt={`${speaker.firstName} ${speaker.lastName}`}
                                                    style={{
                                                        width: '100%',
                                                        height: '420px', // Fixed height for uniformity
                                                        objectFit: 'cover',
                                                        objectPosition: 'top center',
                                                        borderRadius: '10px' // Optional: matches typical card rounded corners
                                                    }}
                                                />
                                                <ul>
                                                    <li><Link href="/#"><i className="fa-brands fa-facebook-f" /></Link></li>
                                                    <li><Link href="/#"><i className="fa-brands fa-linkedin-in" /></Link></li>
                                                    <li><Link href="/#"><i className="fa-brands fa-instagram" /></Link></li>
                                                    <li><Link href="/#" className="m-0"><i className="fa-brands fa-youtube" /></Link></li>
                                                </ul>
                                            </div>
                                            <div className="space20" />
                                            <div className="text-area">
                                                <Link href="/speakers">{speaker.firstName} {speaker.lastName}</Link>
                                                <div className="space16" />
                                                <p>{speaker.position || speaker.organization || 'Speaker'}</p>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}

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

