'use client'
import { useTranslations, useLocale } from 'next-intl';
import CountUp from 'react-countup'
import Layout from "@/components/layout/Layout"
import BrandSlider from '@/components/slider/BrandSlider'
import Link from "next/link"
import CommitteeSection from '@/components/sections/about/CommitteeSection';

export default function About() {
	const t = useTranslations('about');
	const tCommon = useTranslations('common');
	const locale = useLocale();

	return (
		<>
			<Layout headerStyle={1} footerStyle={1}>
				<div>
					{/* HERO AREA STARTS */}
					<div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg5.png)' }}>
						<div className="container">
							<div className="row">
								<div className="col-lg-4 m-auto">
									<div className="heading1 text-center">
										<h1>{t('pageTitle')}</h1>
										<div className="space20" />
										<Link href={`/${locale}`}>{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{t('breadcrumb')}</span></Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* HERO AREA ENDS */}

					{/* ABOUT AREA STARTS */}
					<div className="about1-section-area sp1">
						<div className="container">
							<div className="row align-items-center">
								<div className="col-lg-6">
									<div className="about-imges" data-aos="zoom-in" data-aos-duration={1000}>
										<div style={{
											position: 'relative',
											borderRadius: '16px',
											overflow: 'hidden',
											boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 40px rgba(255, 186, 0, 0.1)',
											transition: 'transform 0.4s ease, box-shadow 0.4s ease',
										}}>
											<img
												src="/assets/img/all-images/accp2026-poster.jpg"
												alt="ACCP 2026 Bangkok - Borderless Pharmacy Practice"
												style={{
													width: '100%',
													height: 'auto',
													display: 'block',
													borderRadius: '16px'
												}}
											/>
										</div>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="about-header-area heading2">
										<h5 data-aos="fade-left" data-aos-duration={800}>{t('title')}</h5>
										<div className="space16" />
										<h2 className="text-anime-style-3">{t('historyTitle')}</h2>
										<div className="space16" />
										<p data-aos="fade-left" data-aos-duration={900}>{t('description')}</p>
										<div className="space32" />

										<div className="space32" />
										<div className="about-counter-area">
											<div className="counter-box">
												<h2><CountUp className="odometer" enableScrollSpy={true} end={100} />+</h2>
												<div className="space18" />
												<p>{t('presentations')}</p>
											</div>
											<div className="counter-box box2">
												<h2><CountUp className="odometer" enableScrollSpy={true} end={50} />+</h2>
												<div className="space18" />
												<p>{t('speakers')}</p>
											</div>
											<div className="counter-box box3" style={{ border: 'none' }}>
												<h2><CountUp className="odometer" enableScrollSpy={true} end={1} />K+</h2>
												<div className="space18" />
												<p>{t('expectedAttendees')}</p>
											</div>
										</div>
										<div className="space32" />
										<div className="btn-area1" data-aos="fade-left" data-aos-duration={1200}>
											<Link href={`/${locale}/contact`} className="vl-btn1">{t('becomeAttendee')}</Link>
										</div>
									</div>
								</div>
							</div>
							<div className="space32" />
							<div className="row">
								<div className="col-12" data-aos="fade-up" data-aos-duration={1000}>
									<div className="history-timeline-wrapper" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
										<img src="/assets/img/all-images/about/The_1st_EACDCPPE_Alabama_USA.png" alt="History of ACCP Timeline" style={{ width: '100%', minWidth: '600px', borderRadius: '8px' }} />
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* ABOUT AREA ENDS */}

					{/* COMMITTEE SECTION STARTS */}
					<CommitteeSection />
					{/* COMMITTEE SECTION ENDS */}

					{/* SPONSORS SECTION STARTS */}
					<div className="brands3-section-area sp2">
						<div className="container">
							<div className="row">
								<div className="col-lg-6 m-auto">
									<div className="heading2 text-center space-margin60">
										<h5 style={{ color: '#FFBA00' }}>{t('ourPartners')}</h5>
										<div className="space16" />
										<h2>{t('conferenceSponsors')}</h2>
										<div className="space16" />
										<p>{t('thankSponsors')}</p>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-12" data-aos="zoom-in" data-aos-duration={800}>
									<BrandSlider />
								</div>
							</div>
						</div>
					</div>
					{/* SPONSORS SECTION ENDS */}
				</div>
			</Layout>
		</>
	)
}