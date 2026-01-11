'use client'
import { useTranslations } from 'next-intl'

export default function ImportantUpdate() {
    const t = useTranslations('travelVisa')

    return (
        <div className="about1-section-area sp1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 m-auto">
                        <div className="heading2 space-margin60">
                            <h2 data-aos="fade-up" data-aos-duration={800}>{t('importantUpdateTitle')}</h2>
                        </div>
                        <div data-aos="fade-up" data-aos-duration={1000}>
                            <p style={{ lineHeight: '1.9', color: '#333', marginBottom: '20px' }}>
                                {t('importantUpdateDesc')}
                            </p>
                            <p style={{ lineHeight: '1.9', color: '#333', margin: 0 }}>
                                <a href="https://tdac.immigration.go.th" target="_blank" rel="noopener noreferrer" style={{ color: '#1565c0', fontWeight: '600' }}>https://tdac.immigration.go.th</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
