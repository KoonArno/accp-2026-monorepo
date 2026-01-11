'use client'
import { useTranslations } from 'next-intl'

export default function PolicyFaq() {
    const t = useTranslations('policies')

    const faqKeys = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6']

    return (
        <div className="sp1" style={{ backgroundColor: '#f8f9fa', paddingTop: '60px', paddingBottom: '60px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        <div className="heading2 text-center space-margin60">
                            <h2 data-aos="fade-up" data-aos-duration={800}>{t('faqTitle')}</h2>
                        </div>

                        <div className="accordion" id="policyFAQs" data-aos="fade-up" data-aos-duration={1000}>
                            {faqKeys.map((faqKey, index) => (
                                <div key={index} className="accordion-item" style={{
                                    border: 'none',
                                    marginBottom: '15px',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                                }}>
                                    <h2 className="accordion-header">
                                        <button
                                            className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#faq${index}`}
                                            aria-expanded={index === 0 ? 'true' : 'false'}
                                            style={{
                                                backgroundColor: '#fff',
                                                color: '#1a237e',
                                                fontWeight: '600',
                                                fontSize: '16px',
                                                padding: '20px 25px'
                                            }}
                                        >
                                            {t(`${faqKey}Q`)}
                                        </button>
                                    </h2>
                                    <div
                                        id={`faq${index}`}
                                        className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                        data-bs-parent="#policyFAQs"
                                    >
                                        <div className="accordion-body" style={{
                                            backgroundColor: '#fff',
                                            color: '#666',
                                            lineHeight: '1.8',
                                            padding: '0 25px 25px'
                                        }}>
                                            {t(`${faqKey}A`)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
