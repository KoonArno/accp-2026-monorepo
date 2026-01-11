'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations, useLocale } from 'next-intl';
import PlenarySpeakers from '@/components/sections/program/PlenarySpeakers';
import PlenarySchedule from '@/components/sections/program/PlenarySchedule';

export default function PlenaryKeynotes() {
    const tCommon = useTranslations('common');
    const t = useTranslations('program'); // Reuse program keys for consistency
    const tPlenary = useTranslations('plenary');
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
                                        <h1>{tPlenary('pageTitle')}</h1>
                                        <div className="space20" />
                                        <Link href={`/${locale}`}>{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{t('pageTitle')}</span> <i className="fa-solid fa-angle-right" /> <span>{tPlenary('pageTitle')}</span></Link>
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
                                        <h5 data-aos="fade-up" data-aos-duration={800}>{tPlenary('mainSessions')}</h5>
                                        <div className="space16" />
                                        <h2 className="text-anime-style-3">{tPlenary('distinguishedSpeakers')}</h2>
                                        <div className="space16" />
                                        <p data-aos="fade-up" data-aos-duration={1000}>{tPlenary('description')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <PlenarySpeakers />

                    <PlenarySchedule />

                    {/* CTA */}
                    <div className="cta1-section-area" style={{
                        background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
                        padding: '80px 0'
                    }}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-8" data-aos="fade-right" data-aos-duration={800}>
                                    <div className="cta-content">
                                        <h3 style={{ color: 'white', marginBottom: '10px' }}>{tCommon('registerNow')}</h3>
                                        <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>Register now to secure your place at ACCP 2026 and learn from the best in clinical pharmacy.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 text-lg-end" data-aos="fade-left" data-aos-duration={800}>
                                    <div className="btn-area1">
                                        <Link href="/registration" className="vl-btn1">{tCommon('registerNow')}</Link>
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
