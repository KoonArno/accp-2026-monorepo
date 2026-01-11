'use client'
import { useTranslations } from 'next-intl'

export default function CallSubmissionSteps() {
    const t = useTranslations('callForAbstracts')

    return (
        <div className="sp1" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        <div className="heading2 space-margin60">
                            <h2 data-aos="fade-up" data-aos-duration={800}>{t('submissionTitle')}</h2>
                        </div>

                        <div data-aos="fade-up" data-aos-duration={1000}>
                            <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '12px', marginBottom: '20px' }}>
                                <p style={{ margin: 0, lineHeight: '1.8', color: '#333', fontSize: '16px' }}>
                                    {t('step1')}
                                </p>
                            </div>

                            <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', padding: '25px', borderRadius: '12px', marginBottom: '20px' }}>
                                <p style={{ margin: 0, lineHeight: '1.8', color: '#333', fontSize: '16px' }}>
                                    {t('step2')}
                                </p>
                            </div>

                            <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', padding: '25px', borderRadius: '12px', marginBottom: '20px' }}>
                                <p style={{ margin: 0, lineHeight: '1.8', color: '#333', fontSize: '16px' }}>
                                    {t('step3')}
                                </p>
                            </div>

                            <div style={{ backgroundColor: '#e3f2fd', padding: '25px', borderRadius: '12px', marginBottom: '20px', border: '2px solid #2196F3' }}>
                                <p style={{ margin: 0, lineHeight: '1.8', color: '#1565c0', fontSize: '16px' }}>
                                    <strong>📝</strong> {t('submissionNote')}
                                </p>
                            </div>

                            <div style={{ backgroundColor: '#fff3e0', padding: '25px', borderRadius: '12px', border: '2px solid #FF9800' }}>
                                <p style={{ margin: 0, lineHeight: '1.8', color: '#e65100', fontSize: '16px' }}>
                                    <strong>📄</strong> {t('fullPaperNote')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
