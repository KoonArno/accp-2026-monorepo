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
                            <div className="table-responsive-container">
                                <table className="program-table">
                                    <thead>
                                        <tr>
                                            <th>Session</th>
                                            <th>Day</th>
                                            <th>Time</th>
                                            <th>Topic</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {plenarySchedule.map((item, index) => (
                                            <tr key={index} className={index % 2 !== 0 ? 'row-alt' : ''}>
                                                <td>
                                                    <span className="session-tag" style={{
                                                        backgroundColor: item.color.light,
                                                        color: item.color.bg,
                                                    }}>
                                                        {item.session}
                                                    </span>
                                                </td>
                                                <td>{item.day}</td>
                                                <td className="time-col">{item.time}</td>
                                                <td>{item.topic}</td>
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
