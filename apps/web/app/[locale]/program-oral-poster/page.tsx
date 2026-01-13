'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations, useLocale } from 'next-intl';
import OralPresentations from '@/components/sections/program/OralPresentations';
import PosterSession from '@/components/sections/program/PosterSession';
import ProgramSearch from '@/components/sections/program/ProgramSearch';

export default function OralPoster() {
    const tCommon = useTranslations('common');
    const tProgram = useTranslations('program');
    const tOralPoster = useTranslations('oralPoster');
    const locale = useLocale();

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    {/* Hero Header */}
                    <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg5.png)' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 m-auto">
                                    <div className="heading1 text-center">
                                        <h1>{tOralPoster('pageTitle')}</h1>
                                        <div className="space20" />
                                        <Link href={`/${locale}`}>{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{tProgram('pageTitle')}</span> <i className="fa-solid fa-angle-right" /> <span>{tOralPoster('pageTitle')}</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Introduction */}
                    <div className="service1-section-area sp1">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 m-auto">
                                    <div className="heading2 text-center space-margin60">
                                        <h5 data-aos="fade-up" data-aos-duration={800}>{tOralPoster('researchPresentations')}</h5>
                                        <div className="space16" />
                                        <h2 className="text-anime-style-3">{tOralPoster('oralAndPosterTitle')}</h2>
                                        <div className="space16" />
                                        <p data-aos="fade-up" data-aos-duration={1000}>
                                            {tOralPoster('oralAndPosterDesc')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ProgramSearch />

                    <OralPresentations />

                    <PosterSession />


                </div>
            </Layout>
        </>
    )
}
