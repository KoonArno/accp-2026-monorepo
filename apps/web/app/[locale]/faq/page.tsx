'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations, useLocale } from 'next-intl';
import FaqSection from "@/components/sections/faq/FaqSection"

export default function Faq() {
	const t = useTranslations('faq');
	const tCommon = useTranslations('common');
	const locale = useLocale();

	return (
		<Layout headerStyle={1} footerStyle={1}>
			<div>
				<div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg15.png)' }}>
					<div className="container">
						<div className="row">
							<div className="col-lg-9 m-auto">
								<div className="heading1 text-center">
									<h1>{t('pageTitle')}</h1>
									<div className="space20" />
									<Link href={`/${locale}`}>{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{t('pageTitle')}</span></Link>
								</div>
							</div>
						</div>
					</div>
				</div>

				<FaqSection />

			</div>
		</Layout>
	)
}