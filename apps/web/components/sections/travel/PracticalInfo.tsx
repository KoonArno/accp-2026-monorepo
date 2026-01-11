'use client'
import { useTranslations } from 'next-intl'

export default function PracticalInfo() {
    const t = useTranslations('travelVisa')

    return (
        <div className="service2-section-area sp1" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 m-auto">
                        <div className="heading2 text-center space-margin60">
                            <h2 data-aos="fade-up" data-aos-duration={800}>{t('practicalInfoTitle')}</h2>
                        </div>
                    </div>
                </div>
                <div className="row" data-aos="fade-up" data-aos-duration={1000}>
                    <div className="col-lg-4 col-md-6" style={{ marginBottom: '30px' }}>
                        <div className="pricing-boxarea" style={{ height: '100%' }}>
                            <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                <i className="fa-solid fa-sun" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                {t('weather')}
                            </h5>
                            <p style={{ margin: 0, lineHeight: '1.7', color: '#555' }}>
                                {t('weatherDesc')}
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6" style={{ marginBottom: '30px' }}>
                        <div className="pricing-boxarea" style={{ height: '100%' }}>
                            <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                <i className="fa-solid fa-shirt" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                {t('whatToWear')}
                            </h5>
                            <p style={{ margin: 0, lineHeight: '1.7', color: '#555' }}>
                                {t('whatToWearDesc')}
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6" style={{ marginBottom: '30px' }}>
                        <div className="pricing-boxarea" style={{ height: '100%' }}>
                            <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                <i className="fa-solid fa-clock" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                {t('time')}
                            </h5>
                            <p style={{ margin: 0, lineHeight: '1.7', color: '#555' }}>
                                {t('timeDesc')}
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6" style={{ marginBottom: '30px' }}>
                        <div className="pricing-boxarea" style={{ height: '100%' }}>
                            <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                <i className="fa-solid fa-baht-sign" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                {t('money')}
                            </h5>
                            <p style={{ margin: 0, lineHeight: '1.7', color: '#555' }}>
                                {t('moneyDesc')}
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6" style={{ marginBottom: '30px' }}>
                        <div className="pricing-boxarea" style={{ height: '100%' }}>
                            <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                <i className="fa-solid fa-language" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                {t('language')}
                            </h5>
                            <p style={{ margin: 0, lineHeight: '1.7', color: '#555' }}>
                                {t('languageDesc')}
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6" style={{ marginBottom: '30px' }}>
                        <div className="pricing-boxarea" style={{ height: '100%' }}>
                            <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                <i className="fa-solid fa-phone" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                {t('connectivity')}
                            </h5>
                            <p style={{ margin: 0, lineHeight: '1.7', color: '#555' }}>
                                {t('connectivityDesc')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
