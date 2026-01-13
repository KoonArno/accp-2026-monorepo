'use client'
import Link from "next/link"
import { useTranslations } from 'next-intl';
import { plenarySpeakers } from '@/data/plenaryData';

export default function PlenarySpeakers() {
    const t = useTranslations('plenary');

    return (
        <div className="team1-section-area sp2" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container">
                <div className="row">
                    {plenarySpeakers.map((speaker, index) => (
                        <div className="col-lg-4 col-md-6" key={index} data-aos="fade-up" data-aos-duration={800} data-aos-delay={index * 100}>
                            <div className="team1-boxarea">
                                <div className="img1">
                                    <div style={{
                                        width: '100%',
                                        height: '280px',
                                        background: 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <i className="fa-solid fa-user" style={{ fontSize: '80px', color: '#bbb' }} />
                                    </div>
                                    <div className="session-badge" style={{
                                        position: 'absolute',
                                        top: '15px',
                                        left: '15px',
                                        background: '#8B5CF6',
                                        color: 'white',
                                        padding: '5px 12px',
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        fontWeight: '600'
                                    }}>
                                        {speaker.session}
                                    </div>
                                </div>
                                <div className="content-area">
                                    <Link href="#">{speaker.name}</Link>
                                    <p style={{ color: '#8B5CF6', fontWeight: '500', marginBottom: '5px' }}>{speaker.role}</p>
                                    <p style={{ fontSize: '13px', color: '#888' }}>{speaker.affiliation}</p>
                                    <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                                        <p style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                                            <i className="fa-solid fa-quote-left" style={{ color: '#FFBA00', marginRight: '8px' }} />
                                            {speaker.topic}
                                        </p>
                                        <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#666' }}>
                                            <span><i className="fa-regular fa-calendar" style={{ marginRight: '5px' }} />{speaker.day}</span>
                                            <span><i className="fa-regular fa-clock" style={{ marginRight: '5px' }} />{speaker.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
