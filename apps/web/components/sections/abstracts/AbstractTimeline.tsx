'use client'
import { useTranslations } from 'next-intl'

export default function AbstractTimeline() {
    const t = useTranslations('callForAbstracts')

    const timelineItems = [
        {
            label: t('openingDate'),
            date: '15 January 2026',
            icon: 'fa-calendar-check',
            bgColor: '#e8f5e9',
            borderColor: '#4caf50',
            iconColor: '#4caf50',
            labelColor: '#2e7d32',
            dateColor: '#1b5e20'
        },
        {
            label: t('deadline'),
            date: '15 March 2026',
            icon: 'fa-calendar-xmark',
            bgColor: '#ffebee',
            borderColor: '#f44336',
            iconColor: '#f44336',
            labelColor: '#c62828',
            dateColor: '#b71c1c'
        },
        {
            label: t('notification'),
            date: '10 April 2026',
            icon: 'fa-envelope',
            bgColor: '#e3f2fd',
            borderColor: '#2196f3',
            iconColor: '#2196f3',
            labelColor: '#1565c0',
            dateColor: '#0d47a1'
        }
    ]

    return (
        <div className="sp1" style={{ backgroundColor: '#fff', paddingTop: '60px', paddingBottom: '60px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 m-auto">
                        <div className="heading2 text-center space-margin60">
                            <h2 data-aos="fade-up" data-aos-duration={800}>{t('timelineTitle')}</h2>
                        </div>

                        <div className="row" data-aos="fade-up" data-aos-duration={1000}>
                            {timelineItems.map((item, index) => (
                                <div key={index} className="col-md-4 mb-4">
                                    <div style={{
                                        backgroundColor: item.bgColor,
                                        padding: '25px',
                                        borderRadius: '12px',
                                        borderLeft: `5px solid ${item.borderColor}`,
                                        height: '100%'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                            <i className={`fa-solid ${item.icon}`} style={{ color: item.iconColor, marginRight: '10px', fontSize: '20px' }} />
                                            <span style={{ color: item.labelColor, fontWeight: '600' }}>{item.label}</span>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: item.dateColor }}>{item.date}</p>
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
