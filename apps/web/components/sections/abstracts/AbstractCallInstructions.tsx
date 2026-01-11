'use client'
import { useTranslations } from 'next-intl'

export default function AbstractCallInstructions() {
    const t = useTranslations('callForAbstracts')

    return (
        <div className="sp1" style={{ backgroundColor: '#f8f9fa', paddingTop: '60px', paddingBottom: '60px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        <div className="heading2 space-margin60">
                            <h2 data-aos="fade-up" data-aos-duration={800}>{t('instructionsTitle')}</h2>
                            <p data-aos="fade-up" data-aos-duration={900} style={{ color: '#666', marginTop: '10px' }}>{t('seeExample')}</p>
                        </div>

                        <div data-aos="fade-up" data-aos-duration={1000}>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ padding: '15px 0', borderBottom: '1px solid #e0e0e0' }}>
                                    <p style={{ margin: 0, lineHeight: '1.8', color: '#333' }}>
                                        {t('formatDoc')}
                                    </p>
                                </li>
                                <li style={{ padding: '15px 0', borderBottom: '1px solid #e0e0e0' }}>
                                    <p style={{ margin: 0, lineHeight: '1.8', color: '#333' }}>
                                        {t('englishOnly')}
                                    </p>
                                </li>
                                <li style={{ padding: '15px 0', borderBottom: '1px solid #e0e0e0' }}>
                                    <p style={{ margin: 0, lineHeight: '1.8', color: '#333' }}>
                                        {t('wordCount')}
                                    </p>
                                </li>
                            </ul>

                            <div style={{ marginTop: '30px' }}>
                                <h5 style={{ color: '#1a237e', marginBottom: '20px' }}>{t('structureTitle')}</h5>

                                {/* Title Section */}
                                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '15px', borderLeft: '4px solid #FFBA00' }}>
                                    <h6 style={{ color: '#1a237e', marginBottom: '10px' }}>{t('titleSection')}</h6>
                                    <p style={{ margin: 0, color: '#666', fontSize: '14px', lineHeight: '1.7' }}>
                                        {t('titleFormat')}
                                    </p>
                                    <ul style={{ margin: '10px 0 0 0', paddingLeft: '20px', color: '#333', fontSize: '14px', lineHeight: '1.8' }}>
                                        <li>{t('titleRule1')}</li>
                                        <li>{t('titleRule2')}</li>
                                    </ul>
                                </div>

                                {/* Authors Section */}
                                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '15px', borderLeft: '4px solid #FFBA00' }}>
                                    <h6 style={{ color: '#1a237e', marginBottom: '10px' }}>{t('authorsSection')}</h6>
                                    <ul style={{ margin: 0, paddingLeft: '20px', color: '#333', fontSize: '14px', lineHeight: '1.8' }}>
                                        <li>{t('authorRule1')}</li>
                                        <li>{t('authorRule2')}</li>
                                        <li>{t('authorRule3')}</li>
                                        <li>{t('authorRule4')}</li>
                                    </ul>
                                </div>

                                {/* Abstract Body Section */}
                                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '15px', borderLeft: '4px solid #FFBA00' }}>
                                    <h6 style={{ color: '#1a237e', marginBottom: '10px' }}>{t('abstractSection')}</h6>
                                    <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>
                                        {t('abstractFormat')}
                                    </p>
                                    <ul style={{ margin: 0, paddingLeft: '20px', color: '#333', fontSize: '14px', lineHeight: '1.8' }}>
                                        <li><strong>{t('background')}</strong></li>
                                        <li><strong>{t('methods')}</strong></li>
                                        <li><strong>{t('results')}</strong></li>
                                        <li><strong>{t('conclusions')}</strong></li>
                                    </ul>
                                </div>

                                {/* Keywords Section */}
                                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '15px', borderLeft: '4px solid #FFBA00' }}>
                                    <h6 style={{ color: '#1a237e', marginBottom: '10px' }}>{t('keywordsSection')}</h6>
                                    <p style={{ margin: 0, color: '#333', fontSize: '14px', lineHeight: '1.8' }}>
                                        {t('keywordsFormat')}
                                    </p>
                                </div>

                                {/* Important Note */}
                                <div style={{ backgroundColor: '#fff3e0', padding: '20px', borderRadius: '8px', border: '2px solid #FF9800' }}>
                                    <p style={{ margin: 0, color: '#e65100', fontSize: '14px', lineHeight: '1.8' }}>
                                        {t('importantNote')}
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
