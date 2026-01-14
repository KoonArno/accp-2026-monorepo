'use client'
import { useState, useEffect } from 'react';
import Link from "next/link"
import { useTranslations } from 'next-intl';

interface Speaker {
    id: number;
    firstName: string;
    lastName: string;
    organization?: string;
    position?: string;
    photoUrl?: string;
    bio?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3002';

export default function PlenarySpeakers() {
    const t = useTranslations('plenary');
    const [speakers, setSpeakers] = useState<Speaker[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSpeakers = async () => {
            try {
                const res = await fetch(`${API_URL}/api/speakers`);
                if (res.ok) {
                    const data = await res.json();
                    setSpeakers(data.speakers || []);
                }
            } catch (error) {
                console.error('Failed to fetch speakers:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSpeakers();
    }, []);

    // Helper to get reliable image URL from Google Drive via our proxy
    const getSpeakerImageUrl = (url: string | undefined) => {
        if (!url) return '';

        if (url.includes('drive.google.com')) {
            return `${API_URL}/upload/proxy?url=${encodeURIComponent(url)}`;
        }

        return url;
    };

    if (isLoading) {
        return (
            <div style={{ padding: '80px 0', textAlign: 'center', background: '#f8f9fa' }}>
                <div className="container">
                    <p>Loading speakers...</p>
                </div>
            </div>
        );
    }

    if (speakers.length === 0) {
        return (
            <div style={{ padding: '80px 0', textAlign: 'center', background: '#f8f9fa' }}>
                <div className="container">
                    <p style={{ color: '#666' }}>No speakers available yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            background: '#f8f9fa',
            padding: '80px 0'
        }}>
            <div className="container">
                <div className="row justify-content-center">
                    {speakers.map((speaker, index) => (
                        <div className="col-xl-3 col-lg-4 col-md-6" key={speaker.id} data-aos="fade-up" data-aos-duration={800} data-aos-delay={index * 100}>
                            <div style={{
                                background: 'white',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                                marginBottom: '30px'
                            }}>
                                {/* Image Section */}
                                <div style={{
                                    width: '100%',
                                    height: '240px',
                                    background: 'linear-gradient(180deg, #f0f4f8 0%, #e2e8f0 100%)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'center'
                                }}>
                                    {/* Decorative Background Circle */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-40px',
                                        width: '280px',
                                        height: '280px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(236,72,153,0.15) 100%)',
                                    }} />

                                    {/* Speaker Image */}
                                    {speaker.photoUrl ? (
                                        <img
                                            src={getSpeakerImageUrl(speaker.photoUrl)}
                                            alt={`${speaker.firstName} ${speaker.lastName}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                objectPosition: 'top center',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                zIndex: 1
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            width: '140px',
                                            height: '140px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '40px',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                            zIndex: 1
                                        }}>
                                            <i className="fa-solid fa-user" style={{ fontSize: '60px', color: 'white' }} />
                                        </div>
                                    )}

                                    {/* Session Badge */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '16px',
                                        left: '16px',
                                        background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                                        color: 'white',
                                        padding: '8px 16px',
                                        borderRadius: '25px',
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        letterSpacing: '0.5px',
                                        boxShadow: '0 4px 15px rgba(139,92,246,0.4)',
                                        zIndex: 2
                                    }}>
                                        <i className="fa-solid fa-microphone" style={{ marginRight: '6px' }} />
                                        Plenary {index + 1}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div style={{ padding: '24px' }}>
                                    <Link href="#" style={{
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        color: '#8B5CF6',
                                        textDecoration: 'none',
                                        display: 'block',
                                        marginBottom: '4px'
                                    }}>
                                        {speaker.firstName} {speaker.lastName}
                                    </Link>

                                    <p style={{
                                        color: '#333',
                                        fontWeight: '500',
                                        marginBottom: '2px',
                                        fontSize: '14px'
                                    }}>
                                        {speaker.position || 'Speaker'}
                                    </p>

                                    <p style={{
                                        fontSize: '13px',
                                        color: '#888',
                                        marginBottom: '20px'
                                    }}>
                                        {speaker.organization || 'Organization'}
                                    </p>

                                    {/* Topic/Bio Section */}
                                    <div style={{
                                        borderTop: '1px solid #eee',
                                        paddingTop: '16px'
                                    }}>
                                        <p style={{
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            color: '#333',
                                            marginBottom: '12px',
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '8px'
                                        }}>
                                            <i className="fa-solid fa-quote-left" style={{
                                                color: '#FFBA00',
                                                fontSize: '16px',
                                                marginTop: '2px'
                                            }} />
                                            <span>{speaker.bio || 'Topic to be announced'}</span>
                                        </p>

                                        {/* Schedule Info */}
                                        <div style={{
                                            display: 'flex',
                                            gap: '20px',
                                            fontSize: '13px',
                                            color: '#666'
                                        }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <i className="fa-regular fa-calendar" />
                                                Day {(index % 3) + 1}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <i className="fa-regular fa-clock" />
                                                {index < 3 ? '09:00 - 10:30' : '14:00 - 15:30'}
                                            </span>
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
