'use client'
import { useTranslations } from 'next-intl';
import { symposiaData } from '@/data/symposiaData';

export default function SymposiaList() {
    const t = useTranslations('program'); // Or specialized translation file

    return (
        <div className="service2-section-area sp2" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container">
                <div className="row">
                    {symposiaData.map((track, trackIndex) => (
                        <div className="col-lg-6" key={trackIndex} data-aos="fade-up" data-aos-duration={800} data-aos-delay={trackIndex * 50}>
                            <div className="pricing-boxarea" style={{
                                marginBottom: '30px',
                                overflow: 'hidden',
                                padding: 0
                            }}>
                                <div style={{
                                    background: `linear-gradient(135deg, ${track.color} 0%, ${track.color}dd 100%)`,
                                    color: 'white',
                                    padding: '20px 25px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <span style={{
                                            backgroundColor: 'rgba(255,255,255,0.2)',
                                            padding: '4px 12px',
                                            borderRadius: '15px',
                                            fontSize: '12px',
                                            fontWeight: '600'
                                        }}>{track.track}</span>
                                        <h5 style={{ color: 'white', margin: '10px 0 0 0' }}>{track.name}</h5>
                                    </div>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <i className="fa-solid fa-users" style={{ fontSize: '20px' }} />
                                    </div>
                                </div>
                                <div style={{ padding: '20px 25px' }}>
                                    {track.sessions.map((session, sessionIndex) => (
                                        <div key={sessionIndex} style={{
                                            padding: '15px 0',
                                            borderBottom: sessionIndex < track.sessions.length - 1 ? '1px solid #eee' : 'none'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                                <span style={{
                                                    backgroundColor: `${track.color}15`,
                                                    color: track.color,
                                                    padding: '4px 12px',
                                                    borderRadius: '15px',
                                                    fontSize: '12px',
                                                    fontWeight: '600'
                                                }}>{session.day}</span>
                                                <span style={{ fontSize: '13px', color: '#666' }}>
                                                    <i className="fa-solid fa-location-dot" style={{ marginRight: '5px' }} />
                                                    {session.room}
                                                </span>
                                            </div>
                                            <h6 style={{ fontSize: '15px', marginBottom: '8px' }}>{session.title}</h6>
                                            <div style={{ fontSize: '13px', color: track.color, fontWeight: '600' }}>
                                                <i className="fa-regular fa-clock" style={{ marginRight: '5px' }} />
                                                {session.time}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
