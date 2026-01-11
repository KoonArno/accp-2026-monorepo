'use client'
import { useTranslations } from 'next-intl'

export default function RefundSchedule() {
    const t = useTranslations('policies')

    return (
        <div className="sp1" style={{ backgroundColor: '#f8f9fa', paddingTop: '60px', paddingBottom: '60px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 m-auto">
                        <div className="heading2 text-center space-margin60">
                            <h2 data-aos="fade-up" data-aos-duration={800}>{t('refundScheduleTitle')}</h2>
                            <p data-aos="fade-up" data-aos-duration={900} style={{ color: '#666', marginTop: '10px' }}>
                                {t('refundScheduleDesc')}
                            </p>
                        </div>

                        <div className="row" data-aos="fade-up" data-aos-duration={1000}>
                            <div className="col-md-4">
                                <div style={{
                                    background: '#fff',
                                    padding: '30px',
                                    borderRadius: '16px',
                                    textAlign: 'center',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    marginBottom: '20px',
                                    borderTop: '4px solid #4caf50'
                                }}>
                                    <div style={{
                                        fontSize: '48px',
                                        fontWeight: 'bold',
                                        color: '#4caf50',
                                        marginBottom: '10px'
                                    }}>80%</div>
                                    <h5 style={{ color: '#1a237e', marginBottom: '8px' }}>{t('refund80')}</h5>
                                    <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                                        {t('refund80Desc')}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div style={{
                                    background: '#fff',
                                    padding: '30px',
                                    borderRadius: '16px',
                                    textAlign: 'center',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    marginBottom: '20px',
                                    borderTop: '4px solid #ff9800'
                                }}>
                                    <div style={{
                                        fontSize: '48px',
                                        fontWeight: 'bold',
                                        color: '#ff9800',
                                        marginBottom: '10px'
                                    }}>50%</div>
                                    <h5 style={{ color: '#1a237e', marginBottom: '8px' }}>{t('refund50')}</h5>
                                    <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                                        {t('refund50Desc')}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div style={{
                                    background: '#fff',
                                    padding: '30px',
                                    borderRadius: '16px',
                                    textAlign: 'center',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    marginBottom: '20px',
                                    borderTop: '4px solid #f44336'
                                }}>
                                    <div style={{
                                        fontSize: '48px',
                                        fontWeight: 'bold',
                                        color: '#f44336',
                                        marginBottom: '10px'
                                    }}>0%</div>
                                    <h5 style={{ color: '#1a237e', marginBottom: '8px' }}>{t('refund0')}</h5>
                                    <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                                        {t('refund0Desc')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            backgroundColor: '#fff3e0',
                            padding: '20px 25px',
                            borderRadius: '12px',
                            border: '2px solid #FF9800',
                            marginTop: '20px'
                        }} data-aos="fade-up" data-aos-duration={1100}>
                            <p style={{ margin: 0, color: '#e65100', fontSize: '15px', lineHeight: '1.8' }}>
                                <i className="fa-solid fa-triangle-exclamation" style={{ marginRight: '10px' }} />
                                {t('importantFee')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
