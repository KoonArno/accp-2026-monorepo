'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations, useLocale } from 'next-intl';
import SymposiaList from '@/components/sections/program/SymposiaList';

export default function Symposia() {
    const tCommon = useTranslations('common');
    const tProgram = useTranslations('program'); // Potentially specialized
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
                                        <h1>{tProgram('symposia')}</h1>
                                        <div className="space20" />
                                        <Link href={`/${locale}`}>{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{tProgram('pageTitle')}</span> <i className="fa-solid fa-angle-right" /> <span>{tProgram('symposia')}</span></Link>
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
                                        <h5 data-aos="fade-up" data-aos-duration={800}>{tProgram('symposiaA')}</h5>
                                        <div className="space16" />
                                        <h2 className="text-anime-style-3">Scientific Symposia by Track</h2>
                                        <div className="space16" />
                                        <p data-aos="fade-up" data-aos-duration={1000}>
                                            Dive deep into specialized topics with our parallel symposia sessions.
                                            Each track focuses on specific areas of clinical pharmacy and pharmaceutical sciences.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <SymposiaList />

                    {/* Note */}
                    <div className="container" style={{ padding: '40px 15px' }}>
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <div className="pricing-boxarea" data-aos="fade-up" data-aos-duration={800} style={{
                                    background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                                    border: '2px solid #F59E0B',
                                    textAlign: 'center'
                                }}>
                                    <p style={{ margin: 0, color: '#92400E', fontWeight: '500' }}>
                                        <i className="fa-solid fa-circle-info" style={{ marginRight: '10px' }} />
                                        <strong>Note:</strong> Symposia sessions run in parallel. Please plan your schedule in advance to attend the sessions most relevant to your interests.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="cta1-section-area" style={{
                        background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                        padding: '80px 0'
                    }}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-8" data-aos="fade-right" data-aos-duration={800}>
                                    <div className="cta-content">
                                        <h3 style={{ color: 'white', marginBottom: '10px' }}>Explore More Program Options</h3>
                                        <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>Check out oral presentations, e-posters, and pre-conference workshops.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 text-lg-end" data-aos="fade-left" data-aos-duration={800}>
                                    <div className="btn-area1" style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                                        <Link href="/program-oral-poster" className="vl-btn1">{tProgram('oralPoster')}</Link>
                                        <Link href="/program" className="vl-btn1" style={{ backgroundColor: 'transparent', border: '2px solid white' }}>{tCommon('back')}</Link>
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
