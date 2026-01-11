'use client'
import { useTranslations } from 'next-intl';
import { oralSessions } from '@/data/oralPosterData';

export default function OralPresentations() {
    const t = useTranslations('program'); // Or 'oralPoster' if you separate keys

    return (
        <div className="service2-section-area sp2" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="heading2 space-margin60">
                            <h5 data-aos="fade-up" data-aos-duration={800}>
                                <i className="fa-solid fa-microphone" style={{ marginRight: '10px', color: '#10B981' }} />
                                Oral Presentations
                            </h5>
                        </div>
                    </div>
                </div>
                {oralSessions.map((session, sessionIndex) => (
                    <div key={sessionIndex} className="row" style={{ marginBottom: '30px' }} data-aos="fade-up" data-aos-duration={800}>
                        <div className="col-12">
                            <div className="pricing-boxarea" style={{ padding: 0, overflow: 'hidden' }}>
                                <div style={{
                                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                    color: 'white',
                                    padding: '18px 25px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexWrap: 'wrap',
                                    gap: '15px',
                                    alignItems: 'center'
                                }}>
                                    <span style={{ fontWeight: '600' }}><i className="fa-regular fa-calendar" style={{ marginRight: '8px' }} />{session.day}</span>
                                    <span><i className="fa-regular fa-clock" style={{ marginRight: '8px' }} />{session.time}</span>
                                    <span><i className="fa-solid fa-location-dot" style={{ marginRight: '8px' }} />{session.room}</span>
                                </div>
                                <div>
                                    {session.presentations.map((pres, presIndex) => (
                                        <div key={presIndex} style={{
                                            padding: '20px 25px',
                                            borderBottom: presIndex < session.presentations.length - 1 ? '1px solid #eee' : 'none',
                                            display: 'flex',
                                            gap: '20px',
                                            alignItems: 'flex-start',
                                            backgroundColor: presIndex % 2 === 0 ? '#fff' : '#fafafa'
                                        }}>
                                            <div style={{
                                                backgroundColor: '#D1FAE5',
                                                color: '#10B981',
                                                padding: '8px 14px',
                                                borderRadius: '8px',
                                                fontWeight: 'bold',
                                                fontSize: '13px',
                                                whiteSpace: 'nowrap'
                                            }}>{pres.id}</div>
                                            <div style={{ flex: 1 }}>
                                                <h6 style={{ margin: '0 0 10px 0', fontSize: '15px', lineHeight: '1.5' }}>{pres.title}</h6>
                                                <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
                                                    <strong>{pres.presenter}</strong>
                                                    <span style={{ margin: '0 8px' }}>•</span>
                                                    {pres.affiliation}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
