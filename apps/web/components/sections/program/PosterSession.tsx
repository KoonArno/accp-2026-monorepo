'use client'
import { useTranslations } from 'next-intl';
import { posterTopics, posterSchedule } from '@/data/oralPosterData';

export default function PosterSession() {
    const t = useTranslations('program');

    return (
        <div className="service1-section-area sp1">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="heading2 space-margin60">
                            <h5 data-aos="fade-up" data-aos-duration={800}>
                                <i className="fa-solid fa-image" style={{ marginRight: '10px', color: '#F59E0B' }} />
                                Poster Presentations
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-5" data-aos="fade-right" data-aos-duration={800}>
                        <div className="pricing-boxarea" style={{ height: '100%' }}>
                            <h5 style={{ marginBottom: '25px' }}>
                                <i className="fa-regular fa-calendar" style={{ marginRight: '10px', color: '#F59E0B' }} />
                                Poster Viewing Schedule
                            </h5>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {posterSchedule.map((schedule, index) => (
                                    <div key={index} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '15px 18px',
                                        backgroundColor: '#FEF3C7',
                                        borderRadius: '12px',
                                        borderLeft: '4px solid #F59E0B'
                                    }}>
                                        <div>
                                            <span style={{ fontWeight: '700', color: '#1a237e' }}>{schedule.day}</span>
                                            <span style={{ margin: '0 10px', color: '#999' }}>|</span>
                                            <span style={{ color: '#666' }}>{schedule.time}</span>
                                        </div>
                                        <span style={{ color: '#F59E0B', fontWeight: '500', fontSize: '13px' }}>{schedule.venue}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7" data-aos="fade-left" data-aos-duration={800}>
                        <div className="pricing-boxarea" style={{ height: '100%' }}>
                            <h5 style={{ marginBottom: '25px' }}>
                                <i className="fa-solid fa-chart-pie" style={{ marginRight: '10px', color: '#F59E0B' }} />
                                Posters by Topic (Expected)
                            </h5>
                            <div className="row">
                                {posterTopics.map((topic, index) => (
                                    <div className="col-md-6" key={index} style={{ marginBottom: '20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '10px',
                                                backgroundColor: '#FEF3C7',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <i className={`fa-solid ${topic.icon}`} style={{ color: '#F59E0B' }} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                    <span style={{ fontSize: '13px', fontWeight: '500' }}>{topic.topic}</span>
                                                    <span style={{ fontWeight: 'bold', color: '#1a237e' }}>{topic.count}</span>
                                                </div>
                                                <div style={{ backgroundColor: '#e0e0e0', height: '6px', borderRadius: '3px' }}>
                                                    <div style={{
                                                        backgroundColor: '#F59E0B',
                                                        height: '100%',
                                                        width: `${(topic.count / 45) * 100}%`,
                                                        borderRadius: '3px',
                                                        transition: 'width 0.5s ease'
                                                    }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
