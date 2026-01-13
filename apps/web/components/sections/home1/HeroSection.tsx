'use client'
import { useTranslations } from 'next-intl';
import Countdown from '@/components/elements/Countdown'
import Link from 'next/link'

const heroStyles = {
    mainTitle: {
        fontSize: '80px',
        lineHeight: '1.1',
        fontWeight: '700',
        marginBottom: '20px'
    },
    titleWhite: {
        color: '#fff'
    },
    titleGold: {
        background: 'linear-gradient(135deg, #F5E6D3 0%, #E8D4A0 50%, #D4AF37 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontWeight: '700'
    },
    subtitle: {
        fontSize: '36px',
        fontWeight: '600',
        color: '#fff',
        textTransform: 'uppercase' as const,
        marginBottom: '30px',
        letterSpacing: '2px'
    },
    description: {
        fontSize: '18px',
        lineHeight: '1.6',
        color: '#fff',
        marginBottom: '0'
    }
} as const;

export default function HeroSection() {
    const t = useTranslations();

    return (
        <>
            <div className="hero1-section-area">

                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="hero1-header heading1">
                                <h5 data-aos="fade-left" data-aos-duration={800}>
                                    {t('hero.subtitle')}
                                </h5>
                                <div className="space16" />
                                <h1 className="text-anime-style-3">
                                    ACCP <span className="gold-text">2026</span> <br className="d-lg-block d-none" />
                                    {t('hero.location')}
                                </h1>
                                <h2 style={heroStyles.subtitle}>
                                    {t('hero.location')}
                                </h2>
                                <p data-aos="fade-left" data-aos-duration={900} style={heroStyles.description}>
                                    {t('hero.theme')}
                                </p>
                                <div className="space32" />
                                <div className="btn-area1" data-aos="fade-left" data-aos-duration={1100}>
                                    <Link href="/registration" className="vl-btn1">{t('common.registerNow')}</Link>
                                    <Link href="/call-for-abstracts" className="vl-btn2">{t('common.submitAbstract')}</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-1">
                            <Countdown />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
