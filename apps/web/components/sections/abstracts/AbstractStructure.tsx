'use client'
import { useTranslations } from 'next-intl'

export default function AbstractStructure() {
    const t = useTranslations('abstractGuideline')
    const tCall = useTranslations('callForAbstracts')

    return (
        <div className="sp1" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        <div className="heading2 space-margin60">
                            <h2 data-aos="fade-up" data-aos-duration={800}>{t('structureTitle')}</h2>
                            <p data-aos="fade-up" data-aos-duration={900} style={{ color: '#666', marginTop: '10px' }}>{t('structureDesc')}</p>
                        </div>

                        <div data-aos="fade-up" data-aos-duration={1000}>
                            {/* Title Section */}
                            <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', marginBottom: '15px', borderLeft: '4px solid #FFBA00', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                                <h5 style={{ color: '#1a237e', marginBottom: '10px' }}>
                                    <span style={{ background: '#FFBA00', color: '#1a237e', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', marginRight: '10px' }}>1</span>
                                    {t('titleOfAbstract')}
                                </h5>
                                <p style={{ margin: 0, color: '#666', fontSize: '14px', lineHeight: '1.7' }}>
                                    {t('titleDesc')}
                                </p>
                            </div>

                            {/* Authors Section */}
                            <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', marginBottom: '15px', borderLeft: '4px solid #FFBA00', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                                <h5 style={{ color: '#1a237e', marginBottom: '10px' }}>
                                    <span style={{ background: '#FFBA00', color: '#1a237e', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', marginRight: '10px' }}>2</span>
                                    {t('authorsTitle')}
                                </h5>
                                <ul style={{ margin: 0, paddingLeft: '20px', color: '#666', fontSize: '14px', lineHeight: '1.8' }}>
                                    <li>{t('authorsDesc1')}</li>
                                    <li>{t('authorsDesc2')}</li>
                                    <li>{t('authorsDesc3')}</li>
                                </ul>
                            </div>

                            {/* Abstract Body Section */}
                            <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', marginBottom: '15px', borderLeft: '4px solid #FFBA00', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                                <h5 style={{ color: '#1a237e', marginBottom: '10px' }}>
                                    <span style={{ background: '#FFBA00', color: '#1a237e', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', marginRight: '10px' }}>3</span>
                                    {t('abstractBodyTitle')}
                                </h5>
                                <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>
                                    {t('abstractBodyDesc')}
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                                    <div style={{ background: '#f8f9fa', padding: '12px 15px', borderRadius: '8px' }}>
                                        <strong style={{ color: '#1a237e' }}>{tCall('background')}</strong>
                                    </div>
                                    <div style={{ background: '#f8f9fa', padding: '12px 15px', borderRadius: '8px' }}>
                                        <strong style={{ color: '#1a237e' }}>{tCall('methods')}</strong>
                                    </div>
                                    <div style={{ background: '#f8f9fa', padding: '12px 15px', borderRadius: '8px' }}>
                                        <strong style={{ color: '#1a237e' }}>{tCall('results')}</strong>
                                    </div>
                                    <div style={{ background: '#f8f9fa', padding: '12px 15px', borderRadius: '8px' }}>
                                        <strong style={{ color: '#1a237e' }}>{tCall('conclusions')}</strong>
                                    </div>
                                </div>
                            </div>

                            {/* Keywords Section */}
                            <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', marginBottom: '15px', borderLeft: '4px solid #FFBA00', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                                <h5 style={{ color: '#1a237e', marginBottom: '10px' }}>
                                    <span style={{ background: '#FFBA00', color: '#1a237e', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', marginRight: '10px' }}>4</span>
                                    {t('keywordsTitle')}
                                </h5>
                                <p style={{ margin: 0, color: '#666', fontSize: '14px', lineHeight: '1.7' }}>
                                    {t('keywordsDesc')}
                                </p>
                            </div>

                            {/* Important Note */}
                            <div style={{ backgroundColor: '#fff3e0', padding: '20px', borderRadius: '12px', border: '2px solid #FF9800', marginTop: '25px' }}>
                                <p style={{ margin: 0, color: '#e65100', fontSize: '15px', lineHeight: '1.8' }}>
                                    <i className="fa-solid fa-triangle-exclamation" style={{ marginRight: '10px' }} />
                                    {t('importantResults')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
