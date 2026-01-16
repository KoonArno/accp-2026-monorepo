'use client'
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link'


export default function Footer1() {
	const t = useTranslations();
	const locale = useLocale();


	return (
		<>
			{/* Countdown Banner */}


			{/* Main Footer */}
			<div className="footer1-sertion-area" style={{ paddingTop: '60px' }}>
				<div className="container">
					<div className="row">
						{/* Logo & Description */}
						<div className="col-lg-3 col-md-6">
							<div className="footer-logo-area">
								<img src="/assets/img/logo/footer-logo-new.png" alt="ACCP 2026" style={{ height: '60px', width: 'auto', display: 'block', margin: '0 auto' }} />
								<div style={{ height: '30px' }} />
								<p>{t('footer.description')}</p>
								<div className="space24" />
								<ul>
									<li><Link href="https://facebook.com/accp2026" target="_blank"><i className="fa-brands fa-facebook-f" style={{ color: '#1877F2' }} /></Link></li>
									<li><Link href="https://instagram.com/accp2026" target="_blank"><i className="fa-brands fa-instagram" style={{ color: '#E4405F' }} /></Link></li>
									<li><Link href="https://linkedin.com/company/accp2026" target="_blank"><i className="fa-brands fa-linkedin-in" style={{ color: '#0A66C2' }} /></Link></li>
									<li><Link href="https://twitter.com/accp2026" target="_blank" className="m-0"><i className="fa-brands fa-x-twitter" style={{ color: '#000000' }} /></Link></li>
								</ul>
							</div>
						</div>

						{/* Quick Links */}
						<div className="col-lg-2 col-md-6">
							<div className="link-content">
								<h3>{t('common.quickLinks')}</h3>
								<ul>
									<li><Link href={`/${locale}`}>{t('common.home')}</Link></li>
									<li><Link href={`/${locale}/about`}>{t('common.aboutACCP')}</Link></li>
									<li><Link href={`/${locale}/program`}>{t('common.program')}</Link></li>
									<li><Link href={`/${locale}/call-for-abstracts`}>{t('common.callForAbstracts')}</Link></li>
									<li><Link href={`/${locale}/registration`}>{t('common.registration')}</Link></li>
								</ul>
							</div>
						</div>

						{/* Contact Info */}
						<div className="col-lg-3 col-md-6">
							<div className="link-content2">
								<h3>{t('common.contactUs')}</h3>
								<ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
									<li style={{ marginBottom: '12px' }}><Link href="mailto:accpbangkok2026@gmail.com" style={{ display: 'flex', alignItems: 'center' }}><i className="fa-solid fa-envelope" style={{ width: '20px', marginRight: '10px', color: '#EA4335' }} />accpbangkok2026@gmail.com</Link></li>
									<li style={{ marginBottom: '12px' }}><Link href="https://facebook.com/accpbangkok2026" target="_blank" style={{ display: 'flex', alignItems: 'center' }}><i className="fa-brands fa-facebook-f" style={{ width: '20px', marginRight: '10px', color: '#1877F2' }} />accpbangkok2026</Link></li>
									<li><Link href="https://instagram.com/accpbangkok2026" target="_blank" style={{ display: 'flex', alignItems: 'center' }}><i className="fa-brands fa-instagram" style={{ width: '20px', marginRight: '10px', color: '#E4405F' }} />accpbangkok2026</Link></li>
								</ul>
							</div>
						</div>

						{/* Event Gallery */}
						<div className="col-lg-4 col-md-6">
							<div className="footer-social-box">
								<h3>{t('common.gallery')}</h3>
								<div className="space12" />
								<div className="row">
									{[1, 2, 3, 4, 5, 6].map((num) => (
										<div key={num} className="col-lg-4 col-md-4 col-4">
											<div className="img1">
												<img src={`/assets/img/all-images/footer/footer-img${num}.png`} alt="" />
												<div className="icons">
													<Link href={`/${locale}/gallery`}><i className="fa-brands fa-instagram" /></Link>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					<div className="space60" />

					{/* Copyright */}
					<div className="row">
						<div className="col-lg-12">
							<div className="copyright">
								<p>© {t('common.copyright')} {new Date().getFullYear()} - ACCP 2026 Bangkok. {t('common.allRightsReserved')}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
