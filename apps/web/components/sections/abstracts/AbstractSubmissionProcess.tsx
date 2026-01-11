'use client'
import { useTranslations } from 'next-intl'

export default function AbstractSubmissionProcess() {
    const t = useTranslations('abstractGuideline')

    return (
        <div className="sp1" style={{ backgroundColor: '#f8f9fa', paddingTop: '60px', paddingBottom: '60px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        <div className="heading2 space-margin60">
                            <h2 data-aos="fade-up" data-aos-duration={800}>{t('howToSubmitTitle')}</h2>
                        </div>

                        <div data-aos="fade-up" data-aos-duration={1000}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                                    <div style={{
                                        minWidth: '50px',
                                        height: '50px',
                                        background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontSize: '20px',
                                        fontWeight: 'bold'
                                    }}>1</div>
                                    <div style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '12px' }}>
                                        <h5 style={{ color: '#1a237e', marginBottom: '8px' }}>{t('processStep1Title')}</h5>
                                        <p style={{ margin: 0, color: '#666', fontSize: '14px', lineHeight: '1.7' }}>
                                            {t('processStep1Desc')}
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                                    <div style={{
                                        minWidth: '50px',
                                        height: '50px',
                                        background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontSize: '20px',
                                        fontWeight: 'bold'
                                    }}>2</div>
                                    <div style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '12px' }}>
                                        <h5 style={{ color: '#1a237e', marginBottom: '8px' }}>{t('processStep2Title')}</h5>
                                        <p style={{ margin: 0, color: '#666', fontSize: '14px', lineHeight: '1.7' }}>
                                            {t('processStep2Desc')}
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                                    <div style={{
                                        minWidth: '50px',
                                        height: '50px',
                                        background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontSize: '20px',
                                        fontWeight: 'bold'
                                    }}>3</div>
                                    <div style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '12px' }}>
                                        <h5 style={{ color: '#1a237e', marginBottom: '8px' }}>{t('processStep3Title')}</h5>
                                        <p style={{ margin: 0, color: '#666', fontSize: '14px', lineHeight: '1.7' }}>
                                            {t('processStep3Desc')}
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                                    <div style={{
                                        minWidth: '50px',
                                        height: '50px',
                                        background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontSize: '20px',
                                        fontWeight: 'bold'
                                    }}>4</div>
                                    <div style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '12px' }}>
                                        <h5 style={{ color: '#1a237e', marginBottom: '8px' }}>{t('processStep4Title')}</h5>
                                        <p style={{ margin: 0, color: '#666', fontSize: '14px', lineHeight: '1.7' }}>
                                            {t('processStep4Desc')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div style={{ backgroundColor: '#e3f2fd', padding: '20px', borderRadius: '12px', marginTop: '25px', border: '2px solid #2196F3' }}>
                                <p style={{ margin: 0, color: '#1565c0', fontSize: '15px', lineHeight: '1.8' }}>
                                    <i className="fa-solid fa-circle-info" style={{ marginRight: '10px' }} />
                                    {t('processNote')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
