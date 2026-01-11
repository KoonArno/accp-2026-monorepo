'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations, useLocale } from 'next-intl';
import ProgramSchedule from '@/components/sections/program/ProgramSchedule';
import ProgramNavigation from '@/components/sections/program/ProgramNavigation';

export default function ProgramOverview() {
    const tCommon = useTranslations('common');
    const t = useTranslations('program');
    const tCta = useTranslations('cta');
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
                                        <h1>{t('pageTitle')}</h1>
                                        <div className="space20" />
                                        <Link href={`/${locale}`}>{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{t('pageTitle')}</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ProgramSchedule />

                    <ProgramNavigation />

                    {/* CTA Section */}
                    <div className="cta2-section-area" style={{ background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)', padding: '60px 0' }}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-8" data-aos="fade-right" data-aos-duration={800}>
                                    <div className="cta-header heading4">
                                        <h3 style={{ color: 'white' }}>{tCta('readyToJoin')}</h3>
                                        <div className="space10" />
                                        <p style={{ color: '#c5cae9' }}>{tCta('registerDescription')}</p>
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
