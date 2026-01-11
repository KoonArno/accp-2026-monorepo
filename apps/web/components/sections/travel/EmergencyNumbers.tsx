'use client'
import { useTranslations } from 'next-intl'

export default function EmergencyNumbers() {
    const t = useTranslations('travelVisa')

    const emergencyItems = [
        { service: t('police'), number: '191' },
        { service: t('ambulance'), number: '1669' },
        { service: t('touristPolice'), number: '1155' },
        { service: t('fire'), number: '199' }
    ]

    return (
        <div className="sp1" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 m-auto">
                        <div className="heading2 space-margin60">
                            <h2 data-aos="fade-up" data-aos-duration={800}>{t('emergencyTitle')}</h2>
                        </div>

                        <div data-aos="fade-up" data-aos-duration={1000}>
                            <div className="pricing-boxarea" style={{ padding: 0, overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <tbody>
                                        {emergencyItems.map((item, index) => (
                                            <tr key={index} style={{
                                                borderBottom: '1px solid #e0e0e0',
                                                backgroundColor: index % 2 === 0 ? '#fff' : '#f5f5dc'
                                            }}>
                                                <td style={{ padding: '15px 20px', color: '#333', lineHeight: '1.5' }}>{item.service}</td>
                                                <td style={{ padding: '15px 20px', color: '#1a237e', fontWeight: '600', textAlign: 'right', whiteSpace: 'nowrap' }}>{item.number}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
