'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
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

export default function Section4() {
	const [language, setLanguage] = useState<'th' | 'en'>('en')

	useEffect(() => {
		const savedLang = localStorage.getItem('accp-language') as 'th' | 'en'
		if (savedLang) {
			setLanguage(savedLang)
		}
	}, [])

	const t = (thText: string, enText: string) => language === 'th' ? thText : enText

	const speakers = [
		{ name: t("รศ.ดร.เคนดรา เครมิน", "Kendra Cremin"), role: t("ที่ปรึกษาธุรกิจ", "Business Consultant"), img: "team-img2" },
		{ name: t("ศ.ดร.เดนนิส จาคอบสัน", "Dennis Jacobson"), role: t("ที่ปรึกษาการเงิน", "Finance Consultant"), img: "team-img1" },
		{ name: t("ดร.แพทริเซีย วิลกินสัน", "Patricia Wilkinson"), role: t("ที่ปรึกษาทรัพยากรบุคคล", "HR Consultant"), img: "team-img3" },
	]

	return (
		<>
			<div className="team1-section-area sp1">
				<div className="container">
					<div className="row">
						<div className="col-lg-6">
							<div className="team-header space-margin60 heading2">
								<h5 data-aos="fade-left" data-aos-duration={800}>{t('วิทยากรมากกว่า 10+ ท่าน', 'our 10+ event speakers')}</h5>
								<div className="space16" />
								<h2 className="text-anime-style-3">{t('ทีมวิทยากรผู้เชี่ยวชาญ', 'Business Breakthrough Team')}</h2>
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
