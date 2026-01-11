'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Section9() {
	const [language, setLanguage] = useState<'th' | 'en'>('en')

	useEffect(() => {
		const savedLang = localStorage.getItem('accp-language') as 'th' | 'en'
		if (savedLang) {
			setLanguage(savedLang)
		}
	}, [])

	const t = (thText: string, enText: string) => language === 'th' ? thText : enText

	return (
		<>
			<div className="cta1-section-area" style={{ marginBottom: '60px' }}>
				<div className="container">
					<div className="row">
						<div className="col-lg-10 m-auto">
							<div className="cta1-main-boxarea" style={{
								padding: '40px',
								textAlign: 'center'
							}}>
								{/* Title and Description */}
								<h2 style={{
									color: '#1a1a2e',
									marginBottom: '12px',
									fontSize: '32px',
									fontWeight: '700'
								}}>
									{t('พร้อมที่จะเข้าร่วม ACCP 2026 หรือยัง?', 'Ready to Join ACCP 2026?')}
								</h2>
								<p style={{
									color: 'rgba(26,26,46,0.7)',
									marginBottom: '24px',
									fontSize: '16px',
									maxWidth: '500px',
									margin: '0 auto 24px'
								}}>
									{t('ลงทะเบียนตอนนี้และเป็นส่วนหนึ่งของการประชุมเภสัชกรรมคลินิกชั้นนำในเอเชีย', 'Register now and be part of the premier clinical pharmacy conference in Asia')}
								</p>

								{/* Buttons */}
								<div style={{
									display: 'flex',
									justifyContent: 'center',
									gap: '16px',
									flexWrap: 'wrap',
									marginBottom: '24px'
								}}>
									<Link href="/registration" className="vl-btn1" style={{
										background: '#1a1a2e',
										color: '#fff',
										padding: '14px 28px',
										borderRadius: '8px',
										fontWeight: '600',
										textDecoration: 'none',
										display: 'inline-block'
									}}>
										{t('ลงทะเบียนเลย', 'REGISTER NOW')}
									</Link>
									<Link href="/call-for-abstracts" className="vl-btn2" style={{
										background: 'transparent',
										color: '#1a1a2e',
										padding: '14px 28px',
										borderRadius: '8px',
										fontWeight: '600',
										textDecoration: 'none',
										display: 'inline-block',
										border: '2px solid #1a1a2e'
									}}>
										{t('ส่งบทคัดย่อ', 'SUBMIT ABSTRACT')}
									</Link>
								</div>

								{/* Event Info */}
								<div style={{
									display: 'flex',
									justifyContent: 'center',
									gap: '40px',
									flexWrap: 'wrap'
								}}>
									<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
										<i className="fa-regular fa-calendar" style={{ color: '#1a1a2e' }} />
										<span style={{ color: '#1a1a2e', fontSize: '14px' }}>{t('9-11 กรกฎาคม 2569', 'July 9-11, 2026')}</span>
									</div>
									<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
										<i className="fa-solid fa-location-dot" style={{ color: '#1a1a2e' }} />
										<span style={{ color: '#1a1a2e', fontSize: '14px' }}>{t('เซ็นทารา แกรนด์ เซ็นทรัลเวิลด์ กรุงเทพฯ', 'Centara Grand, CentralWorld, Bangkok')}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
