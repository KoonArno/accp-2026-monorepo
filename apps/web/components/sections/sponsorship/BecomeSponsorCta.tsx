'use client'
import Link from "next/link"
import { useTranslations } from 'next-intl';

export default function BecomeSponsorCta() {
    const t = useTranslations('sponsorship');

    return (
        <div className="cta1-section-area sp1" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-10%',
                width: '500px',
                height: '500px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%'
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '-30%',
                left: '-5%',
                width: '300px',
                height: '300px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '50%'
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center">
                        <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: '#fff', marginBottom: '20px' }}>
                            {t('becomeSponsor')}
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', marginBottom: '30px' }}>
                            {t('description')}
                        </p>

                        <Link href="/contact" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: '#fff',
                            color: '#764ba2',
                            padding: '16px 40px',
                            borderRadius: '12px',
                            fontWeight: '600',
                            fontSize: '16px',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                        }}>
                            <i className="fa-solid fa-envelope" style={{ fontSize: '18px' }}></i>
                            {t('contactUs')}
                        </Link>

                        <div className="space30" />

                        <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '1rem' }}>
                            <i className="fa-solid fa-envelope" style={{ marginRight: '10px' }}></i>
                            <a href="mailto:accpbangkok2026@gmail.com" style={{ color: '#fff', textDecoration: 'underline' }}>
                                accpbangkok2026@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
