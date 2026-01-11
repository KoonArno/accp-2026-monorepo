'use client'
import { useTranslations } from 'next-intl'

export default function AdditionalInfo() {
    const t = useTranslations('travelVisa')

    return (
        <div className="service2-section-area sp1" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 m-auto">
                        <div className="heading2 space-margin60">
                            <h2 data-aos="fade-up" data-aos-duration={800}>{t('additionalInfoTitle')}</h2>
                        </div>

                        <div className="row" data-aos="fade-up" data-aos-duration={1000}>
                            <div className="col-md-6" style={{ marginBottom: '20px' }}>
                                <div className="pricing-boxarea" style={{ height: '100%' }}>
                                    <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                        <i className="fa-solid fa-building-columns" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                        {t('banks')}
                                    </h5>
                                    <p style={{ lineHeight: '1.8', color: '#333', margin: 0 }}>
                                        {t('banksDesc')}
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6" style={{ marginBottom: '20px' }}>
                                <div className="pricing-boxarea" style={{ height: '100%' }}>
                                    <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                        <i className="fa-solid fa-clock" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                        {t('businessHours')}
                                    </h5>
                                    <p style={{ lineHeight: '1.8', color: '#333', margin: 0 }}>
                                        {t('businessHoursDesc')}
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6" style={{ marginBottom: '20px' }}>
                                <div className="pricing-boxarea" style={{ height: '100%' }}>
                                    <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                        <i className="fa-solid fa-hand-holding-dollar" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                        {t('tipping')}
                                    </h5>
                                    <p style={{ lineHeight: '1.8', color: '#333', margin: 0 }}>
                                        {t('tippingDesc')}
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6" style={{ marginBottom: '20px' }}>
                                <div className="pricing-boxarea" style={{ height: '100%' }}>
                                    <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                        <i className="fa-solid fa-plug" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                        {t('electricity')}
                                    </h5>
                                    <p style={{ lineHeight: '1.8', color: '#333', margin: 0 }}>
                                        {t('electricityDesc')}
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6" style={{ marginBottom: '20px' }}>
                                <div className="pricing-boxarea" style={{ height: '100%' }}>
                                    <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                        <i className="fa-solid fa-bottle-water" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                        {t('drinkingWater')}
                                    </h5>
                                    <p style={{ lineHeight: '1.8', color: '#333', margin: 0 }}>
                                        {t('drinkingWaterDesc')}
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6" style={{ marginBottom: '20px' }}>
                                <div className="pricing-boxarea" style={{ height: '100%' }}>
                                    <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                        <i className="fa-solid fa-pills" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                        {t('health')}
                                    </h5>
                                    <p style={{ lineHeight: '1.8', color: '#333', margin: 0 }}>
                                        {t('healthDesc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
