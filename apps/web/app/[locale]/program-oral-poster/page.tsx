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
                                        <h1>{tProgram('oralPoster')}</h1>
                                        <div className="space20" />
                                        <Link href={`/${locale}`}>{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{tProgram('pageTitle')}</span> <i className="fa-solid fa-angle-right" /> <span>{tProgram('oralPoster')}</span></Link>
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
                                        <h5 data-aos="fade-up" data-aos-duration={800}>Research Presentations</h5>
                                        <div className="space16" />
                                        <h2 className="text-anime-style-3">Oral & e-Poster Sessions</h2>
                                        <div className="space16" />
                                        <p data-aos="fade-up" data-aos-duration={1000}>
                                            Discover cutting-edge research from clinical pharmacists and pharmaceutical scientists
                                            across Asia through our oral presentation and e-poster sessions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ProgramSearch />

                    <OralPresentations />

                    <PosterSession />

                    {/* CTA */}
                    <div className="cta1-section-area" style={{
                        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                        padding: '80px 0'
                    }}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-8" data-aos="fade-right" data-aos-duration={800}>
                                    <div className="cta-content">
                                        <h3 style={{ color: 'white', marginBottom: '10px' }}>Submit Your Research</h3>
                                        <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>Share your findings with the clinical pharmacy community at ACCP 2026.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 text-lg-end" data-aos="fade-left" data-aos-duration={800}>
                                    <div className="btn-area1">
                                        <Link href="/call-for-abstracts" className="vl-btn1">{tCommon('submitAbstract')}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
