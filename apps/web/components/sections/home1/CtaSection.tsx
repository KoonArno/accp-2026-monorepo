'use client'
import { useTranslations } from 'next-intl';
import Link from 'next/link'

export default function CtaSection() {
    const t = useTranslations();

    return (
        <>
            <div className="cta1-section-area" style={{ marginBottom: '60px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto">
                            <div className="cta1-main-boxarea" style={{
                                padding: '40px',
                                textAlign: 'center'
                            }}>
                                {/* Title and Description */}
                                <h2 style={{
                                    color: '#1a1a2e',
                                    marginBottom: '12px',
                                    fontSize: '32px',
                                    fontWeight: '700'
                                }}>
                                    {t('cta.readyToJoin')}
                                </h2>
                                <p style={{
                                    color: 'rgba(26,26,46,0.7)',
                                    marginBottom: '24px',
                                    fontSize: '16px',
                                    maxWidth: '500px',
                                    margin: '0 auto 24px'
                                }}>
                                    {t('cta.registerDescription')}
                                </p>

                                {/* Buttons */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '16px',
                                    flexWrap: 'wrap',
                                    marginBottom: '24px'
                                }}>
                                    <Link href="/registration" className="vl-btn1" style={{
                                        background: '#1a1a2e',
                                        color: '#fff',
                                        padding: '14px 28px',
                                        borderRadius: '8px',
                                        fontWeight: '600',
                                        textDecoration: 'none',
                                        display: 'inline-block'
                                    }}>
                                        {t('common.registerNow').toUpperCase()}
                                    </Link>
                                    <Link href="/call-for-abstracts" className="vl-btn2" style={{
                                        background: 'transparent',
                                        color: '#1a1a2e',
                                        padding: '14px 28px',
                                        borderRadius: '8px',
                                        fontWeight: '600',
                                        textDecoration: 'none',
                                        display: 'inline-block',
                                        border: '2px solid #1a1a2e'
                                    }}>
                                        {t('common.submitAbstract').toUpperCase()}
                                    </Link>
                                </div>

                                {/* Event Info */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '40px',
                                    flexWrap: 'wrap'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <i className="fa-regular fa-calendar" style={{ color: '#1a1a2e' }} />
                                        <span style={{ color: '#1a1a2e', fontSize: '14px' }}>{t('cta.eventDate')}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <i className="fa-solid fa-location-dot" style={{ color: '#1a1a2e' }} />
                                        <span style={{ color: '#1a1a2e', fontSize: '14px' }}>{t('cta.eventVenue')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
