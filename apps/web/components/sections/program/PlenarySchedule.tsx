'use client'
import { useTranslations } from 'next-intl';
import { plenarySchedule } from '@/data/plenaryData';

export default function PlenarySchedule() {
    const t = useTranslations('program');

    return (
        <div className="service1-section-area sp1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 m-auto">
                        <div className="heading2 text-center space-margin60">
                            <h5 data-aos="fade-up" data-aos-duration={800}>{t('overview')}</h5>
                            <div className="space16" />
                            <h2 className="text-anime-style-3">{t('schedule')}</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-10 m-auto">
                        <div className="pricing-boxarea" data-aos="fade-up" data-aos-duration={800}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#1a237e', color: 'white' }}>
                                        <th style={{ padding: '15px 20px', textAlign: 'left' }}>Session</th>
                                        <th style={{ padding: '15px 20px', textAlign: 'left' }}>Day</th>
                                        <th style={{ padding: '15px 20px', textAlign: 'left' }}>Time</th>
                                        <th style={{ padding: '15px 20px', textAlign: 'left' }}>Topic</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {plenarySchedule.map((item, index) => (
                                        <tr key={index} style={{
                                            borderBottom: '1px solid #eee',
                                            backgroundColor: index % 2 !== 0 ? '#fafafa' : 'transparent'
                                        }}>
                                            <td style={{ padding: '18px 20px' }}>
                                                <span style={{
                                                    backgroundColor: item.color.light,
                                                    color: item.color.bg,
                                                    padding: '5px 12px',
                                                    borderRadius: '15px',
                                                    fontSize: '12px',
                                                    fontWeight: '600'
                                                }}>
                                                    {item.session}
                                                </span>
                                            </td>
                                            <td style={{ padding: '18px 20px' }}>{item.day}</td>
                                            <td style={{ padding: '18px 20px', fontWeight: '600' }}>{item.time}</td>
                                            <td style={{ padding: '18px 20px' }}>{item.topic}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
