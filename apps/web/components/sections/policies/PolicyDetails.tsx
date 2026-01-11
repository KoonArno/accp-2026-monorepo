'use client'
import { useTranslations } from 'next-intl'

export default function PolicyDetails() {
    const t = useTranslations('policies')

    return (
        <div className="sp1" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        <div className="heading2 space-margin60">
                            <h2 data-aos="fade-up" data-aos-duration={800}>{t('policyDetailsTitle')}</h2>
                        </div>

                        <div data-aos="fade-up" data-aos-duration={1000}>
                            {/* Cancellation Policy */}
                            <div style={{
                                background: '#fff',
                                padding: '25px',
                                borderRadius: '12px',
                                marginBottom: '20px',
                                borderLeft: '4px solid #1a237e',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                            }}>
                                <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                    <i className="fa-solid fa-file-circle-xmark" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                    {t('cancellationPolicy')}
                                </h5>
                                <ul style={{ margin: 0, paddingLeft: '20px', color: '#666', lineHeight: '1.9' }}>
                                    <li>{t('cancellationRule1')}</li>
                                    <li>{t('cancellationRule2')}</li>
                                    <li>{t('cancellationRule3')}</li>
                                    <li>{t('cancellationRule4')}</li>
                                </ul>
                            </div>

                            {/* Registration Transfer */}
                            <div style={{
                                background: '#fff',
                                padding: '25px',
                                borderRadius: '12px',
                                marginBottom: '20px',
                                borderLeft: '4px solid #1a237e',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                            }}>
                                <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                    <i className="fa-solid fa-arrow-right-arrow-left" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                    {t('transferPolicy')}
                                </h5>
                                <ul style={{ margin: 0, paddingLeft: '20px', color: '#666', lineHeight: '1.9' }}>
                                    <li>{t('transferRule1')}</li>
                                    <li>{t('transferRule2')}</li>
                                    <li>{t('transferRule3')}</li>
                                    <li>{t('transferRule4')}</li>
                                </ul>
                            </div>

                            {/* Conference Cancellation */}
                            <div style={{
                                background: '#fff',
                                padding: '25px',
                                borderRadius: '12px',
                                marginBottom: '20px',
                                borderLeft: '4px solid #1a237e',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                            }}>
                                <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                    <i className="fa-solid fa-calendar-xmark" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                    {t('eventCancellation')}
                                </h5>
                                <ul style={{ margin: 0, paddingLeft: '20px', color: '#666', lineHeight: '1.9' }}>
                                    <li>{t('eventRule1')}</li>
                                    <li>{t('eventRule2')}</li>
                                    <li>{t('eventRule3')}</li>
                                </ul>
                            </div>

                            {/* Force Majeure */}
                            <div style={{
                                background: '#fff',
                                padding: '25px',
                                borderRadius: '12px',
                                borderLeft: '4px solid #1a237e',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                            }}>
                                <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                    <i className="fa-solid fa-shield-halved" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                    {t('forceMajeure')}
                                </h5>
                                <p style={{ margin: 0, color: '#666', lineHeight: '1.9' }}>
                                    {t('forceMajeureDesc')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
