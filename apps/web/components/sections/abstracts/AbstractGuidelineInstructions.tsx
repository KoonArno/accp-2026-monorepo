'use client'
import { useTranslations } from 'next-intl'

export default function AbstractGuidelineInstructions() {
    const t = useTranslations('abstractGuideline')

    return (
        <div className="sp1" style={{ backgroundColor: '#f8f9fa', paddingTop: '60px', paddingBottom: '60px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        <div className="heading2 space-margin60">
                            <h2 data-aos="fade-up" data-aos-duration={800}>{t('instructionsTitle')}</h2>
                        </div>

                        <div data-aos="fade-up" data-aos-duration={1000}>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ padding: '15px 0', borderBottom: '1px solid #e0e0e0' }}>
                                    <p style={{ margin: 0, lineHeight: '1.8', color: '#333' }}>
                                        <i className="fa-solid fa-check-circle" style={{ color: '#4caf50', marginRight: '10px' }} />
                                        {t('rule1')}
                                    </p>
                                </li>
                                <li style={{ padding: '15px 0', borderBottom: '1px solid #e0e0e0' }}>
                                    <p style={{ margin: 0, lineHeight: '1.8', color: '#333' }}>
                                        <i className="fa-solid fa-check-circle" style={{ color: '#4caf50', marginRight: '10px' }} />
                                        {t('rule2')}
                                    </p>
                                </li>
                                <li style={{ padding: '15px 0', borderBottom: '1px solid #e0e0e0' }}>
                                    <p style={{ margin: 0, lineHeight: '1.8', color: '#333' }}>
                                        <i className="fa-solid fa-check-circle" style={{ color: '#4caf50', marginRight: '10px' }} />
                                        {t('rule3')}
                                    </p>
                                </li>
                                <li style={{ padding: '15px 0' }}>
                                    <p style={{ margin: 0, lineHeight: '1.8', color: '#333' }}>
                                        <i className="fa-solid fa-check-circle" style={{ color: '#4caf50', marginRight: '10px' }} />
                                        {t('rule4')}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
