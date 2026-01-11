'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations } from 'next-intl'
import RefundSchedule from "@/components/sections/policies/RefundSchedule"
import PolicyDetails from "@/components/sections/policies/PolicyDetails"
import PolicyFaq from "@/components/sections/policies/PolicyFaq"

export default function RegistrationPolicies() {
    const t = useTranslations('policies')
    const tCommon = useTranslations('common')

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    {/* Header */}
                    <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg16.png)' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 m-auto">
                                    <div className="heading1 text-center">
                                        <h1 style={{ fontSize: '42px' }}>{t('pageTitle')}</h1>
                                        <div className="space20" />
                                        <Link href="/">{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{tCommon('registration')}</span> <i className="fa-solid fa-angle-right" /> <span>{tCommon('policies')}</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Policy Overview */}
                    <div className="sp1">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 m-auto">
                                    <div className="heading2 text-center space-margin60">
                                        <h5 data-aos="fade-up" data-aos-duration={800}>{t('overview')}</h5>
                                        <div className="space16" />
                                        <h2>{t('pageTitle')}</h2>
                                        <div className="space16" />
                                        <p style={{ color: '#666', lineHeight: '1.8' }}>
                                            {t('overviewDesc')} <a href="mailto:secretariat@accp2026.org" style={{ color: '#1a237e', fontWeight: '600' }}>secretariat@accp2026.org</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <RefundSchedule />
                    <PolicyDetails />
                    <PolicyFaq />

                    {/* Contact Section */}
                    <div className="cta2-section-area" style={{ background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)', padding: '80px 0' }}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-8" data-aos="fade-right" data-aos-duration={800}>
                                    <div className="cta-header heading4">
                                        <h3 style={{ color: 'white' }}>{t('ctaTitle')}</h3>
                                        <div className="space10" />
                                        <p style={{ color: '#c5cae9' }}>{t('ctaDesc')}</p>
                                        <div className="space16" />
                                        <p style={{ color: '#fff', fontSize: '18px' }}>
                                            <i className="fa-solid fa-envelope" style={{ marginRight: '10px' }} />
                                            <a href="mailto:secretariat@accp2026.org" style={{ color: '#FFBA00' }}>secretariat@accp2026.org</a>
                                        </p>
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
