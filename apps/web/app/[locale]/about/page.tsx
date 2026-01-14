'use client'
import { useTranslations, useLocale } from 'next-intl';
import Layout from "@/components/layout/Layout"

import Link from "next/link"
import CommitteeSection from '@/components/sections/about/CommitteeSection';

export default function About() {
	const t = useTranslations('about');
	const tCommon = useTranslations('common');
	const locale = useLocale();

	// Common paragraph style
	const paragraphStyle = {
		textAlign: 'justify' as const,
		marginBottom: '20px',
		fontSize: '16px',
		lineHeight: '1.8',
		color: '#666'
	};

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
					<div className="about1-section-area" style={{ padding: '60px 0' }}>
						<div className="container">
							<div className="row align-items-start">
								<div className="col-lg-5">
									{/* Spacer to push poster down */}
									<div style={{ marginTop: '80px' }}>
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
								</div>
								<div className="col-lg-7">
									<div className="about-header-area heading2">
										<h5 data-aos="fade-left" data-aos-duration={800}>{t('title')}</h5>
										<div className="space16" />
										<h2 className="text-anime-style-3">{t('historyTitle')}</h2>
										<div className="space16" />
										<p data-aos="fade-left" data-aos-duration={900} style={paragraphStyle}>{t('description1')}</p>
										<p data-aos="fade-left" data-aos-duration={1000} style={paragraphStyle}>{t('description2')}</p>
										<p data-aos="fade-left" data-aos-duration={1100} style={paragraphStyle}>{t('description3')}</p>
									</div>
								</div>
							</div>
							{/* Full width paragraphs below */}
							<div className="row" style={{ marginTop: '30px' }}>
								<div className="col-12">
									<div className="about-header-area heading2">
										<p data-aos="fade-up" data-aos-duration={800} style={paragraphStyle}>{t('description4')}</p>
										<p data-aos="fade-up" data-aos-duration={900} style={paragraphStyle}>{t('description5')}</p>
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

					{/* VISION & MISSION SECTION */}
					<div style={{ background: '#f8f9fa', padding: '30px 0' }}>
						<div className="container">
							<div className="row">
								<div className="col-lg-10 m-auto">
									<div data-aos="fade-up" data-aos-duration={800}>
										<h3 style={{
											color: '#000',
											fontWeight: '700',
											fontSize: '24px',
											marginBottom: '10px'
										}}>
											{t('visionTitle')}
										</h3>
										<p style={{
											fontSize: '16px',
											lineHeight: '1.8',
											color: '#666',
											marginBottom: '20px',
											textAlign: 'justify'
										}}>
											{t('visionDesc')}
										</p>
									</div>
									<div data-aos="fade-up" data-aos-duration={900}>
										<h3 style={{
											color: '#000',
											fontWeight: '700',
											fontSize: '24px',
											marginBottom: '10px'
										}}>
											{t('missionTitle')}
										</h3>
										<p style={{
											fontSize: '16px',
											lineHeight: '1.8',
											color: '#666',
											textAlign: 'justify'
										}}>
											{t('missionDesc')}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* VISION & MISSION SECTION ENDS */}

					{/* COMMITTEE SECTION STARTS */}
					<CommitteeSection />
					{/* COMMITTEE SECTION ENDS */}


				</div>
			</Layout>
		</>
	)
}