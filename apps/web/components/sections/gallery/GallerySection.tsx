'use client'
import { useState } from "react"
import { useTranslations } from 'next-intl'
import { galleryData } from "@/data/galleryData"

type TabType = 'accp2025' | 'venue' | 'bangkok';

export default function GallerySection() {
    const t = useTranslations('gallery')
    const [activeTab, setActiveTab] = useState<TabType>('accp2025')
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [lightboxImage, setLightboxImage] = useState({ src: '', alt: '' })

    const openLightbox = (src: string, alt: string) => {
        setLightboxImage({ src, alt })
        setLightboxOpen(true)
    }

    const closeLightbox = () => {
        setLightboxOpen(false)
    }

    const tabTitles = {
        accp2025: { title: t('accp2025Title'), subtitle: t('accp2025Subtitle') },
        venue: { title: t('venueTitle'), subtitle: t('venueSubtitle') },
        bangkok: { title: t('bangkokTitle'), subtitle: t('bangkokSubtitle') }
    }

    return (
        <>
            {/* Tab Navigation */}
            <section style={{
                background: '#f8f9fa',
                padding: '0',
                position: 'sticky',
                top: '0',
                zIndex: 100
            }}>
                <div className="container">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '10px',
                        flexWrap: 'wrap',
                        padding: '20px 0',
                        borderBottom: '1px solid #e0e0e0'
                    }}>
                        <button
                            onClick={() => setActiveTab('accp2025')}
                            style={{
                                padding: '12px 30px',
                                borderRadius: '50px',
                                border: 'none',
                                background: activeTab === 'accp2025'
                                    ? 'linear-gradient(135deg, #7B2D8E, #5a1f6a)'
                                    : '#fff',
                                color: activeTab === 'accp2025' ? '#fff' : '#333',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: activeTab === 'accp2025'
                                    ? '0 4px 15px rgba(123,45,142,0.3)'
                                    : '0 2px 8px rgba(0,0,0,0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <i className="fa-solid fa-camera-retro"></i>
                            {t('accp2025Recap')}
                        </button>
                        <button
                            onClick={() => setActiveTab('venue')}
                            style={{
                                padding: '12px 30px',
                                borderRadius: '50px',
                                border: 'none',
                                background: activeTab === 'venue'
                                    ? 'linear-gradient(135deg, #7B2D8E, #5a1f6a)'
                                    : '#fff',
                                color: activeTab === 'venue' ? '#fff' : '#333',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: activeTab === 'venue'
                                    ? '0 4px 15px rgba(123,45,142,0.3)'
                                    : '0 2px 8px rgba(0,0,0,0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <i className="fa-solid fa-building"></i>
                            {t('venue')}
                        </button>
                        <button
                            onClick={() => setActiveTab('bangkok')}
                            style={{
                                padding: '12px 30px',
                                borderRadius: '50px',
                                border: 'none',
                                background: activeTab === 'bangkok'
                                    ? 'linear-gradient(135deg, #7B2D8E, #5a1f6a)'
                                    : '#fff',
                                color: activeTab === 'bangkok' ? '#fff' : '#333',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: activeTab === 'bangkok'
                                    ? '0 4px 15px rgba(123,45,142,0.3)'
                                    : '0 2px 8px rgba(0,0,0,0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <i className="fa-solid fa-location-dot"></i>
                            {t('exploreBangkok')}
                        </button>
                    </div>
                </div>
            </section>

            {/* Gallery Content */}
            <section style={{ padding: '60px 0 80px', background: '#f8f9fa' }}>
                <div className="container">
                    {/* Section Header */}
                    <div className="text-center" style={{ marginBottom: '50px' }}>
                        <h2 style={{
                            fontSize: '2.5rem',
                            fontWeight: '700',
                            color: '#1a1a2e',
                            marginBottom: '15px'
                        }}>
                            {tabTitles[activeTab].title}
                        </h2>
                        <p style={{
                            color: '#666',
                            fontSize: '1.1rem',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            {tabTitles[activeTab].subtitle}
                        </p>
                    </div>

                    {/* Gallery Grid */}
                    <div className="row g-4">
                        {galleryData[activeTab].images.map((image, index) => (
                            <div
                                key={image.id}
                                className={index % 5 === 0 || index % 5 === 3 ? 'col-lg-6 col-md-6' : 'col-lg-4 col-md-6'}
                            >
                                <div
                                    onClick={() => openLightbox(image.src, image.alt)}
                                    style={{
                                        position: 'relative',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        height: index % 5 === 0 || index % 5 === 3 ? '350px' : '280px',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                        transition: 'all 0.4s ease'
                                    }}
                                    className="gallery-item"
                                >
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.5s ease'
                                        }}
                                    />
                                    {/* Overlay */}
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)',
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        padding: '20px'
                                    }} className="gallery-overlay">
                                        <span style={{
                                            color: '#FFBA00',
                                            fontSize: '12px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            marginBottom: '5px'
                                        }}>
                                            {image.category}
                                        </span>
                                        <span style={{
                                            color: '#fff',
                                            fontSize: '1.1rem',
                                            fontWeight: '600'
                                        }}>
                                            {image.alt}
                                        </span>
                                    </div>
                                    {/* Zoom Icon */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '60px',
                                        height: '60px',
                                        background: 'rgba(255,186,0,0.9)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease'
                                    }} className="zoom-icon">
                                        <i className="fa-solid fa-magnifying-glass-plus" style={{ color: '#fff', fontSize: '24px' }}></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Video Section for ACCP 2025 */}
                    {activeTab === 'accp2025' && (
                        <div style={{ marginTop: '60px' }}>
                            <div className="text-center" style={{ marginBottom: '40px' }}>
                                <h3 style={{
                                    fontSize: '2rem',
                                    fontWeight: '700',
                                    color: '#1a1a2e',
                                    marginBottom: '15px'
                                }}>
                                    <i className="fa-solid fa-video" style={{ color: '#7B2D8E', marginRight: '15px' }}></i>
                                    {t('videoTitle')}
                                </h3>
                                <p style={{ color: '#666' }}>
                                    {t('videoDesc')}
                                </p>
                            </div>
                            <div style={{
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                                background: '#000',
                                aspectRatio: '16/9',
                                maxWidth: '900px',
                                margin: '0 auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative'
                            }}>
                                <img
                                    src="/assets/img/all-images/memory/memory-img1.png"
                                    alt="Video Thumbnail"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        opacity: 0.6
                                    }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '15px'
                                }}>
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        background: 'linear-gradient(135deg, #FFBA00, #FF8C00)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        boxShadow: '0 10px 30px rgba(255,186,0,0.4)',
                                        transition: 'transform 0.3s ease'
                                    }}>
                                        <i className="fa-solid fa-play" style={{ color: '#fff', fontSize: '28px', marginLeft: '5px' }}></i>
                                    </div>
                                    <span style={{ color: '#fff', fontWeight: '600', fontSize: '1.1rem' }}>
                                        {t('comingSoon')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox Modal */}
            {lightboxOpen && (
                <div
                    onClick={closeLightbox}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.95)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}
                >
                    <button
                        onClick={closeLightbox}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            width: '50px',
                            height: '50px',
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '50%',
                            color: '#fff',
                            fontSize: '24px',
                            cursor: 'pointer',
                            transition: 'background 0.3s ease'
                        }}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <img
                        src={lightboxImage.src}
                        alt={lightboxImage.alt}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: '90%',
                            maxHeight: '90vh',
                            objectFit: 'contain',
                            borderRadius: '8px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        bottom: '30px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: '#fff',
                        fontSize: '1.1rem',
                        fontWeight: '500',
                        textAlign: 'center'
                    }}>
                        {lightboxImage.alt}
                    </div>
                </div>
            )}

            {/* Custom Styles */}
            <style jsx global>{`
                .gallery-item:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.2) !important;
                }
                .gallery-item:hover img {
                    transform: scale(1.1);
                }
                .gallery-item:hover .gallery-overlay {
                    opacity: 1 !important;
                }
                .gallery-item:hover .zoom-icon {
                    opacity: 1 !important;
                }
            `}</style>
        </>
    )
}
