'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations } from 'next-intl'
import GallerySection from "@/components/sections/gallery/GallerySection"

export default function Gallery() {
    const t = useTranslations('gallery')
    const tCommon = useTranslations('common')

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    {/* Hero Section */}
                    <div className="inner-page-header" style={{
                        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Animated background elements */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'url(/assets/img/bg/header-bg5.png)',
                            opacity: 0.1
                        }} />
                        <div style={{
                            position: 'absolute',
                            top: '20%',
                            left: '-5%',
                            width: '300px',
                            height: '300px',
                            background: 'linear-gradient(135deg, rgba(138,43,226,0.3), rgba(255,186,0,0.2))',
                            borderRadius: '50%',
                            filter: 'blur(60px)'
                        }} />
                        <div style={{
                            position: 'absolute',
                            bottom: '10%',
                            right: '-5%',
                            width: '400px',
                            height: '400px',
                            background: 'linear-gradient(135deg, rgba(255,186,0,0.2), rgba(138,43,226,0.3))',
                            borderRadius: '50%',
                            filter: 'blur(80px)'
                        }} />

                        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                            <div className="row">
                                <div className="col-lg-8 m-auto">
                                    <div className="heading1 text-center">
                                        <div style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            background: 'rgba(255,186,0,0.15)',
                                            padding: '8px 20px',
                                            borderRadius: '30px',
                                            marginBottom: '20px'
                                        }}>
                                            <i className="fa-solid fa-images" style={{ color: '#FFBA00' }}></i>
                                            <span style={{ color: '#FFBA00', fontSize: '14px', fontWeight: '600' }}>{t('mediaGallery')}</span>
                                        </div>
                                        <h1 style={{
                                            fontSize: '3rem',
                                            fontWeight: '700',
                                            marginBottom: '15px'
                                        }}>
                                            <span style={{ color: '#fff' }}>{t('pageTitle').split(' ')[0]} </span>
                                            <span style={{
                                                background: 'linear-gradient(135deg, #FFBA00, #FF8C00)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent'
                                            }}>{t('pageTitle').split(' ')[1]}</span>
                                        </h1>
                                        <p style={{
                                            color: 'rgba(255,255,255,0.8)',
                                            fontSize: '1.1rem',
                                            maxWidth: '600px',
                                            margin: '0 auto 20px'
                                        }}>
                                            {t('subtitle')}
                                        </p>
                                        <div className="space20" />
                                        <Link href="/" style={{ color: 'rgba(255,255,255,0.7)' }}>
                                            {tCommon('home')} <i className="fa-solid fa-angle-right" />
                                            <span style={{ color: 'rgba(255,255,255,0.7)' }}> {tCommon('sponsorship')} & {tCommon('gallery')}</span>
                                            <i className="fa-solid fa-angle-right" />
                                            <span style={{ color: '#FFBA00' }}> {tCommon('gallery')}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <GallerySection />


                </div>
            </Layout>
        </>
    )
}
