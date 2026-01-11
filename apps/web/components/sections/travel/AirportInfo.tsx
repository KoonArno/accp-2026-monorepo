'use client'
import { useTranslations } from 'next-intl'

export default function AirportInfo() {
    const t = useTranslations('travelVisa')

    return (
        <div className="about1-section-area sp1" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 m-auto">
                        <div className="heading2 space-margin60">
                            <h2 data-aos="fade-up" data-aos-duration={800}>{t('airportTitle')}</h2>
                        </div>
                        <div data-aos="fade-up" data-aos-duration={1000}>
                            <div className="row">
                                <div className="col-md-6" style={{ marginBottom: '20px' }}>
                                    <div className="pricing-boxarea" style={{ height: '100%', borderLeft: '4px solid #FFBA00' }}>
                                        <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                            <i className="fa-solid fa-plane-arrival" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                            {t('suvarnabhumiTitle')}
                                        </h5>
                                        <p style={{ margin: 0, lineHeight: '1.7', color: '#555' }}>
                                            {t('suvarnabhumiDesc')}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6" style={{ marginBottom: '20px' }}>
                                    <div className="pricing-boxarea" style={{ height: '100%', borderLeft: '4px solid #FFBA00' }}>
                                        <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                            <i className="fa-solid fa-plane-departure" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                            {t('donMueangTitle')}
                                        </h5>
                                        <p style={{ margin: 0, lineHeight: '1.7', color: '#555' }}>
                                            {t('donMueangDesc')}
                                        </p>
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
