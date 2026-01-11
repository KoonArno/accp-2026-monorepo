'use client'
import { useTranslations } from 'next-intl'

export default function VisaInfo() {
    const t = useTranslations('travelVisa')

    return (
        <div className="service2-section-area sp1" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 m-auto">
                        <div className="heading2 space-margin60">
                            <h2 data-aos="fade-up" data-aos-duration={800}>{t('passportVisaTitle')}</h2>
                        </div>
                        <div data-aos="fade-up" data-aos-duration={1000}>
                            <div className="pricing-boxarea" style={{ marginBottom: '20px', borderLeft: '4px solid #10B981' }}>
                                <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                    <i className="fa-solid fa-passport" style={{ marginRight: '10px', color: '#10B981' }} />
                                    {t('visaExemptionTitle')}
                                </h5>
                                <p style={{ margin: 0, lineHeight: '1.8', color: '#333' }}>
                                    {t('visaExemptionDesc')}
                                </p>
                            </div>

                            <div className="pricing-boxarea" style={{ borderLeft: '4px solid #3B82F6' }}>
                                <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                    <i className="fa-solid fa-id-card" style={{ marginRight: '10px', color: '#3B82F6' }} />
                                    {t('visaOnArrivalTitle')}
                                </h5>
                                <p style={{ margin: 0, lineHeight: '1.8', color: '#333' }}>
                                    {t('visaOnArrivalDesc')}
                                </p>
                                <p style={{ margin: '15px 0 0 0', color: '#555', fontSize: '14px' }}>
                                    <a href="https://www.mfa.go.th" target="_blank" rel="noopener noreferrer" style={{ color: '#1565c0' }}>www.mfa.go.th</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
