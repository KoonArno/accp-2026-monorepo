'use client'
import { useTranslations } from 'next-intl';
import Link from 'next/link'

export default function CtaSection() {
    const t = useTranslations();

    return (
        <>
            <div className="cta1-section-area" style={{ marginBottom: 0 }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto">
                            <div className="cta1-main-boxarea">
                                {/* Title and Description */}
                                <h2>{t('cta.readyToJoin')}</h2>
                                <p>{t('cta.registerDescription')}</p>

                                {/* Buttons */}
                                <div className="cta-buttons">
                                    <Link href="/registration" className="vl-btn1">
                                        {t('common.registerNow').toUpperCase()}
                                    </Link>
                                    <Link href="/call-for-abstracts" className="vl-btn2">
                                        {t('common.submitAbstract').toUpperCase()}
                                    </Link>
                                </div>

                                {/* Event Info */}
                                <div className="cta-event-info">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <i className="fa-regular fa-calendar" style={{ color: '#1a1a2e' }} />
                                        <span>{t('cta.eventDate')}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <i className="fa-solid fa-location-dot" style={{ color: '#1a1a2e' }} />
                                        <span>{t('cta.eventVenue')}</span>
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
