'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations, useLocale } from 'next-intl';
import { speakersData } from '@/data/speakersData'
import SpeakerCard from '@/components/sections/speakers/SpeakerCard'

export default function Speakers() {
	const tCommon = useTranslations('common');
	const t = useTranslations('speakers');
	const locale = useLocale();

	return (
		<Layout headerStyle={1} footerStyle={1}>
			<div>
				<div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg6.png)' }}>
					<div className="container">
						<div className="row">
							<div className="col-lg-5 m-auto">
								<div className="heading1 text-center">
									<h1>{t('pageTitle')}</h1>
									<div className="space20" />
									<Link href={`/${locale}`}>{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{t('pageTitle')}</span></Link>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="team-sperkers-section-area sp1">
					<div className="container">
						<div className="row">
							{speakersData.map((speaker, index) => (
								<div className="col-lg-3 col-md-6" key={index}>
									<SpeakerCard speaker={speaker} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}