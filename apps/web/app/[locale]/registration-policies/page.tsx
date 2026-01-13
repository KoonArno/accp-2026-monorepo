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
                                            {t('overviewDesc')} <a href="mailto:accpbangkok2026@gmail.com" style={{ color: '#1a237e', fontWeight: '600' }}>accpbangkok2026@gmail.com</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <RefundSchedule />
                    <PolicyDetails />
                    <PolicyFaq />


                </div>
            </Layout>
        </>
    )
}
