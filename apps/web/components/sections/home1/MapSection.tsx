'use client'
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function MapSection() {
    const t = useTranslations();

    return (
        <div className="map-section-area" style={{
            padding: '80px 0',
            background: '#fff'
        }}>
            <div className="container">
                {/* Header */}
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        <div className="heading2 text-center" style={{ marginBottom: '50px' }}>
                            <h5 data-aos="fade-up" data-aos-duration={800} style={{
                                color: '#3b5998',
                                fontWeight: '600',
                                letterSpacing: '2px',
                                textTransform: 'uppercase'
                            }}>
                                {t('map.subtitle')}
                            </h5>
                            <div className="space16" />
                            <h2 className="text-anime-style-3" style={{
                                fontSize: '36px',
                                fontWeight: '700',
                                color: '#1a1a2e'
                            }}>
                                {t('map.title')}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Main Content - Floor Plan + Details */}
                <div className="row align-items-stretch">
                    {/* Left: Floor Plan Image */}
                    <div className="col-lg-7 mb-4 mb-lg-0" data-aos="fade-right" data-aos-duration={800}>
                        <div style={{
                            background: '#fff',
                            borderRadius: '20px',
                            padding: '20px',
                            height: '100%',
                            boxShadow: '0 15px 50px rgba(0,0,0,0.1)',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{
                                position: 'relative',
                                flex: 1,
                                minHeight: '400px',
                                background: 'linear-gradient(135deg, #e8f4f8 0%, #d4e4ed 100%)',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {/* Placeholder for Floor Plan - Replace with actual floor plan image */}
                                <div style={{
                                    textAlign: 'center',
                                    padding: '40px'
                                }}>
                                    <i className="fa-solid fa-map" style={{
                                        fontSize: '80px',
                                        color: '#3b5998',
                                        marginBottom: '20px',
                                        display: 'block'
                                    }} />
                                    <p style={{
                                        color: '#6c757d',
                                        fontSize: '16px',
                                        margin: 0
                                    }}>
                                        {t('map.floorPlanNote')}
                                    </p>
                                </div>
                            </div>
                            <div style={{
                                marginTop: '16px',
                                textAlign: 'center'
                            }}>
                                <span style={{
                                    background: '#3b5998',
                                    color: '#fff',
                                    padding: '8px 20px',
                                    borderRadius: '20px',
                                    fontSize: '14px',
                                    fontWeight: '600'
                                }}>
                                    <i className="fa-solid fa-building" style={{ marginRight: '8px' }} />
                                    {t('map.floorLabel')}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Event Details */}
                    <div className="col-lg-5" data-aos="fade-left" data-aos-duration={800}>
                        <div style={{
                            background: '#fff',
                            borderRadius: '20px',
                            padding: '30px',
                            height: '100%',
                            boxShadow: '0 15px 50px rgba(0,0,0,0.1)'
                        }}>
                            {/* Venue Name */}
                            <div style={{ marginBottom: '28px' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    marginBottom: '12px'
                                }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'linear-gradient(135deg, #EA4335 0%, #c82333 100%)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <i className="fa-solid fa-location-dot" style={{ color: '#fff', fontSize: '20px' }} />
                                    </div>
                                    <div>
                                        <h4 style={{
                                            margin: 0,
                                            fontSize: '20px',
                                            fontWeight: '700',
                                            color: '#1a1a2e'
                                        }}>
                                            {t('map.venueName')}
                                        </h4>
                                    </div>
                                </div>
                                <p style={{
                                    color: '#6c757d',
                                    fontSize: '15px',
                                    lineHeight: '1.6',
                                    margin: 0,
                                    paddingLeft: '60px'
                                }}>
                                    {t('map.venueAddress')}
                                </p>
                            </div>

                            {/* Divider */}
                            <hr style={{ border: 'none', borderTop: '1px solid #e9ecef', margin: '20px 0' }} />

                            {/* Date & Time */}
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'linear-gradient(135deg, #3b5998 0%, #2d4373 100%)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <i className="fa-regular fa-calendar" style={{ color: '#fff', fontSize: '20px' }} />
                                    </div>
                                    <div>
                                        <p style={{ margin: 0, color: '#6c757d', fontSize: '13px' }}>{t('map.dateLabel')}</p>
                                        <p style={{ margin: 0, fontWeight: '600', fontSize: '16px', color: '#1a1a2e' }}>
                                            {t('map.eventDate')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Time */}
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'linear-gradient(135deg, #28a745 0%, #1e7e34 100%)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <i className="fa-regular fa-clock" style={{ color: '#fff', fontSize: '20px' }} />
                                    </div>
                                    <div>
                                        <p style={{ margin: 0, color: '#6c757d', fontSize: '13px' }}>{t('map.timeLabel')}</p>
                                        <p style={{ margin: 0, fontWeight: '600', fontSize: '16px', color: '#1a1a2e' }}>
                                            {t('map.eventTime')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Floor Info */}
                            <div style={{ marginBottom: '0' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'linear-gradient(135deg, #ffc107 0%, #e0a800 100%)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <i className="fa-solid fa-stairs" style={{ color: '#fff', fontSize: '20px' }} />
                                    </div>
                                    <div>
                                        <p style={{ margin: 0, color: '#6c757d', fontSize: '13px' }}>{t('map.floorLevelLabel')}</p>
                                        <p style={{ margin: 0, fontWeight: '600', fontSize: '16px', color: '#1a1a2e' }}>
                                            {t('map.floorLevel')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
