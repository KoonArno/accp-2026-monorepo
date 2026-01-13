'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations } from 'next-intl'
import WelcomeMessageList from "@/components/sections/welcome/WelcomeMessageList"

export default function WelcomeMessages() {
    const t = useTranslations('welcomeMessages')
    const tCommon = useTranslations('common')

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    {/* Header Section */}
                    <div className="inner-page-header" style={{
                        backgroundImage: 'url(/assets/img/bg/header-bg5.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 m-auto">
                                    <div className="heading1 text-center">
                                        <span className="badge" style={{
                                            background: 'rgba(255,255,255,0.2)',
                                            padding: '8px 20px',
                                            borderRadius: '30px',
                                            marginBottom: '15px',
                                            display: 'inline-block'
                                        }}>
                                            <i className="fa-solid fa-quote-left" style={{ marginRight: '8px' }} />
                                            {t('greetings')}
                                        </span>
                                        <h1>{t('pageTitle')}</h1>
                                        <div className="space16" />
                                        <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                                            {t('subtitle')}
                                        </p>
                                        <div className="space20" />
                                        <Link href="/">{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{tCommon('aboutACCP')}</span> <i className="fa-solid fa-angle-right" /> <span>{tCommon('welcomeMessages')}</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <WelcomeMessageList />


                </div>
            </Layout>
        </>
    )
}
