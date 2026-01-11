'use client'
import { useTranslations, useLocale } from 'next-intl';
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import ContactForm from '@/components/sections/contact/ContactForm';
import ContactInfo from '@/components/sections/contact/ContactInfo';

export default function Contact() {
	const t = useTranslations('contact');
	const tCommon = useTranslations('common');
	const locale = useLocale();

	return (
		<Layout headerStyle={1} footerStyle={1}>
			<div>
				<div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg12.png)' }}>
					<div className="container">
						<div className="row">
							<div className="col-lg-6 m-auto">
								<div className="heading1 text-center">
									<h1>{t('pageTitle')}</h1>
									<div className="space20" />
									<Link href={`/${locale}`}>{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{t('pageTitle')}</span></Link>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/*===== CONTACT FORM AREA STARTS =======*/}
				<div className="contact-inner-section sp1">
					<div className="container">
						<div className="row">
							<div className="col-lg-6">
								<div className="img1 image-anime">
									<img src="/assets/img/all-images/contact/contact-img4.png" alt="" />
								</div>
							</div>
							<div className="col-lg-6" data-aos="zoom-in" data-aos-duration={1000}>
								<ContactForm />
							</div>
						</div>
					</div>
				</div>
				{/*===== CONTACT FORM AREA ENDS =======*/}

				{/*===== CONTACT INFO AREA STARTS =======*/}
				<ContactInfo />
				{/*===== CONTACT INFO AREA ENDS =======*/}

				<div className="space100 d-lg-block d-none" />
				<div className="space50 d-lg-none d-block" />
			</div>
		</Layout>
	)
}