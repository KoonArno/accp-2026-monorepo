'use client'
import { useTranslations } from 'next-intl'

export default function GeneralInfo() {
    const t = useTranslations('travelVisa')

    return (
        <div className="about1-section-area sp1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 m-auto">
                        <div className="heading2 space-margin60">
                            <h2 data-aos="fade-up" data-aos-duration={800}>{t('generalInfoTitle')}</h2>
                        </div>
                        <p data-aos="fade-up" data-aos-duration={1000} style={{ fontSize: '16px', lineHeight: '1.9', color: '#333', marginBottom: '30px' }}>
                            {t('generalInfoDesc')}
                        </p>

                        <div data-aos="fade-up" data-aos-duration={1000}>
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <div style={{
                                        background: '#fff',
                                        padding: '20px',
                                        borderRadius: '12px',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                                        height: '100%'
                                    }}>
                                        <i className="fa-solid fa-hospital" style={{ color: '#1a237e', fontSize: '24px', marginBottom: '15px' }} />
                                        <h6 style={{ color: '#1a237e', marginBottom: '10px' }}>{t('highlight1Title')}</h6>
                                        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{t('highlight1Desc')}</p>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div style={{
                                        background: '#fff',
                                        padding: '20px',
                                        borderRadius: '12px',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                                        height: '100%'
                                    }}>
                                        <i className="fa-solid fa-landmark" style={{ color: '#1a237e', fontSize: '24px', marginBottom: '15px' }} />
                                        <h6 style={{ color: '#1a237e', marginBottom: '10px' }}>{t('highlight2Title')}</h6>
                                        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{t('highlight2Desc')}</p>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div style={{
                                        background: '#fff',
                                        padding: '20px',
                                        borderRadius: '12px',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                                        height: '100%'
                                    }}>
                                        <i className="fa-solid fa-train-subway" style={{ color: '#1a237e', fontSize: '24px', marginBottom: '15px' }} />
                                        <h6 style={{ color: '#1a237e', marginBottom: '10px' }}>{t('highlight3Title')}</h6>
                                        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{t('highlight3Desc')}</p>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div style={{
                                        background: '#fff',
                                        padding: '20px',
                                        borderRadius: '12px',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                                        height: '100%'
                                    }}>
                                        <i className="fa-solid fa-utensils" style={{ color: '#1a237e', fontSize: '24px', marginBottom: '15px' }} />
                                        <h6 style={{ color: '#1a237e', marginBottom: '10px' }}>{t('highlight4Title')}</h6>
                                        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{t('highlight4Desc')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
