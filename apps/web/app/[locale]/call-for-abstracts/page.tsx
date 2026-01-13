'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations } from 'next-intl'
import { useAuth } from '@/context/AuthContext'

import AbstractTimeline from "@/components/sections/abstracts/AbstractTimeline"
import AbstractTopicList from "@/components/sections/abstracts/AbstractTopicList"
import AbstractCallInstructions from "@/components/sections/abstracts/AbstractCallInstructions"
import CallSubmissionSteps from "@/components/sections/abstracts/CallSubmissionSteps"
import AbstractExample from "@/components/sections/abstracts/AbstractExample"

export default function CallForAbstracts() {
    const t = useTranslations('callForAbstracts')
    const tCommon = useTranslations('common')
    const { user, isAuthenticated } = useAuth()

    // Allow any authenticated user to submit abstracts
    const canSubmitAbstract = isAuthenticated;

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    {/* Header */}
                    <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg16.png)' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 m-auto">
                                    <div className="heading1 text-center">
                                        <h1 style={{ fontSize: '48px' }}>{t('pageTitle')}</h1>
                                        <div className="space30" />
                                        <Link href="/">{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{tCommon('callForAbstracts')}</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <AbstractTimeline />
                    <AbstractTopicList />
                    <AbstractCallInstructions />
                    <CallSubmissionSteps />
                    <AbstractExample />

                    {/* Late-Breaking Abstract Section */}
                    <div className="late-breaking-section" style={{ background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)', padding: '60px 0' }}>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-8 text-center" data-aos="fade-up" data-aos-duration={800}>
                                    <div style={{
                                        background: 'white',
                                        padding: '40px',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                                    }}>
                                        <h3 style={{
                                            color: '#1a237e',
                                            marginBottom: '20px',
                                            fontSize: '28px',
                                            fontWeight: '700'
                                        }}>
                                            {t('lateBreakingTitle')}
                                        </h3>
                                        <p style={{
                                            color: '#666',
                                            marginBottom: '30px',
                                            fontSize: '16px',
                                            lineHeight: '1.6'
                                        }}>
                                            {t('lateBreakingDesc')}
                                        </p>

                                        {canSubmitAbstract && (
                                            <Link
                                                href="/abstract-submission"
                                                className="btn"
                                                style={{
                                                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                                    color: 'white',
                                                    padding: '15px 40px',
                                                    fontSize: '16px',
                                                    fontWeight: '600',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px',
                                                    display: 'inline-block',
                                                    textDecoration: 'none',
                                                    transition: 'all 0.3s ease',
                                                    boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.4)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(245, 158, 11, 0.3)';
                                                }}
                                            >
                                                {t('startLateBreaking')}
                                            </Link>
                                        )}
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
