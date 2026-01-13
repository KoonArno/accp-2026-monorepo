'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations, useLocale } from 'next-intl';
import { galaHighlights, galaMenu } from '@/data/galaData';

export default function GalaDinner() {
    const tCommon = useTranslations('common');
    const tProgram = useTranslations('program');
    const t = useTranslations('galaDinner');
    const locale = useLocale();

    return (
        <>
            <style jsx>{`
                .about1-section-area[style*="background"] .about-header-area p {
                    color: #ffffff !important;
                }
                .about1-section-area[style*="background"] .gala-info-box span {
                    color: rgba(255, 255, 255, 0.8) !important;
                }
                .about1-section-area[style*="background"] .gala-info-box p {
                    color: #ffffff !important;
                }
            `}</style>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    {/* Hero Header */}
                    <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg5.png)' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 m-auto">
                                    <div className="heading1 text-center">
                                        <h1>{t('pageTitle')}</h1>
                                        <div className="space20" />
                                        <Link href={`/${locale}`}>{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{tProgram('pageTitle')}</span> <i className="fa-solid fa-angle-right" /> <span>{t('pageTitle')}</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hero Banner */}
                    <div className="about1-section-area sp1" style={{
                        background: 'linear-gradient(135deg, #1a237e 0%, #311b92 100%)',
                        color: 'white'
                    }}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6" data-aos="fade-right" data-aos-duration={800}>
                                    <div className="about-header-area">
                                        <span style={{
                                            backgroundColor: '#FFBA00',
                                            color: '#1a237e',
                                            padding: '6px 18px',
                                            borderRadius: '25px',
                                            fontSize: '13px',
                                            fontWeight: '700',
                                            display: 'inline-block',
                                            marginBottom: '20px'
                                        }}>{t('socialEvent')}</span>
                                        <h2 style={{ color: 'white', fontSize: '38px', lineHeight: '1.3', marginBottom: '20px' }}>
                                            {t('celebrationTitle')}
                                        </h2>
                                        <p style={{ fontSize: '17px', color: 'white', lineHeight: '1.8', marginBottom: '30px' }}>
                                            {t('celebrationDesc')}
                                        </p>
                                        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                                            <div className="gala-info-box">
                                                <div style={{
                                                    width: '45px',
                                                    height: '45px',
                                                    borderRadius: '50%',
                                                    backgroundColor: 'rgba(255,186,0,0.2)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0
                                                }}>
                                                    <i className="fa-regular fa-calendar" style={{ color: '#FFBA00', fontSize: '20px' }} />
                                                </div>
                                                <div>
                                                    <span style={{ fontSize: '13px', display: 'block', marginBottom: '2px', color: 'rgba(255, 255, 255, 0.8)' }}>{tCommon('days')}</span>
                                                    <p style={{ margin: 0, fontWeight: '600', fontSize: '16px', color: '#ffffff' }}>July 10, 2026</p>
                                                </div>
                                            </div>

                                            <div className="gala-info-box">
                                                <div style={{
                                                    width: '45px',
                                                    height: '45px',
                                                    borderRadius: '50%',
                                                    backgroundColor: 'rgba(255,186,0,0.2)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0
                                                }}>
                                                    <i className="fa-regular fa-clock" style={{ color: '#FFBA00', fontSize: '20px' }} />
                                                </div>
                                                <div>
                                                    <span style={{ fontSize: '13px', display: 'block', marginBottom: '2px', color: 'rgba(255, 255, 255, 0.8)' }}>{tCommon('hours')}</span>
                                                    <p style={{ margin: 0, fontWeight: '600', fontSize: '16px', color: '#ffffff' }}>19:00 - 22:00</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6" data-aos="fade-left" data-aos-duration={800}>
                                    <div style={{
                                        backgroundColor: 'rgba(255,255,255,0.08)',
                                        borderRadius: '20px',
                                        padding: '35px',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                                            <div style={{
                                                width: '80px',
                                                height: '80px',
                                                borderRadius: '50%',
                                                backgroundColor: 'rgba(255,186,0,0.2)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: '0 auto'
                                            }}>
                                                <i className="fa-solid fa-champagne-glasses" style={{ fontSize: '35px', color: '#FFBA00' }} />
                                            </div>
                                        </div>
                                        <h4 style={{ color: 'white', textAlign: 'center', marginBottom: '25px' }}>{t('eventHighlights')}</h4>
                                        <div className="row">
                                            {galaHighlights.map((item, index) => (
                                                <div className="col-6" key={index} style={{ marginBottom: '15px' }}>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '10px',
                                                        padding: '10px',
                                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                                        borderRadius: '10px'
                                                    }}>
                                                        <i className={`fa-solid ${item.icon}`} style={{ color: '#FFBA00', fontSize: '14px' }} />
                                                        <span style={{ fontSize: '13px' }}>{t(item.textKey)}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Venue Info */}
                    <div className="service2-section-area sp1">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 m-auto">
                                    <div className="heading2 text-center space-margin60">
                                        <h5 data-aos="fade-up" data-aos-duration={800}>{t('venueDetails')}</h5>
                                        <div className="space16" />
                                        <h2 className="text-anime-style-3">{t('grandBallroom')}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration={800}>
                                    <div className="service2-boxarea" style={{ textAlign: 'center' }}>
                                        <div className="icon-area" style={{ backgroundColor: '#FCE7F3' }}>
                                            <i className="fa-solid fa-location-dot" style={{ color: '#EC4899' }} />
                                        </div>
                                        <div className="content-area">
                                            <Link href="#">{t('location')}</Link>
                                            <div className="space8" />
                                            <p dangerouslySetInnerHTML={{ __html: t.raw('locationDesc') }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration={800} data-aos-delay={100}>
                                    <div className="service2-boxarea" style={{ textAlign: 'center' }}>
                                        <div className="icon-area" style={{ backgroundColor: '#DBEAFE' }}>
                                            <i className="fa-solid fa-shirt" style={{ color: '#3B82F6' }} />
                                        </div>
                                        <div className="content-area">
                                            <Link href="#">{t('dressCode')}</Link>
                                            <div className="space8" />
                                            <p>{t('dressCodeDesc')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration={800} data-aos-delay={200}>
                                    <div className="service2-boxarea" style={{ textAlign: 'center' }}>
                                        <div className="icon-area" style={{ backgroundColor: '#FEF3C7' }}>
                                            <i className="fa-solid fa-ticket" style={{ color: '#F59E0B' }} />
                                        </div>
                                        <div className="content-area">
                                            <Link href="#">{t('ticketPrice')}</Link>
                                            <div className="space8" />
                                            <p><strong style={{ fontSize: '20px', color: '#1a237e' }}>THB 2,500</strong><br />{t('priceDesc')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Menu Preview */}
                    <div className="pricing1-section-area sp2" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 m-auto">
                                    <div className="heading2 text-center space-margin60">
                                        <h5 data-aos="fade-up" data-aos-duration={800}>{t('culinaryExperience')}</h5>
                                        <div className="space16" />
                                        <h2 className="text-anime-style-3">{t('menuPreview')}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-10 m-auto">
                                    <div className="pricing-boxarea" data-aos="fade-up" data-aos-duration={800}>
                                        <div className="row">
                                            <div className="col-md-4" style={{ marginBottom: '25px' }}>
                                                <h6 style={{
                                                    color: '#1a237e',
                                                    marginBottom: '15px',
                                                    paddingBottom: '10px',
                                                    borderBottom: '3px solid #FFBA00',
                                                    display: 'inline-block'
                                                }}>
                                                    <i className="fa-solid fa-leaf" style={{ marginRight: '8px', color: '#10B981' }} />
                                                    {t('appetizers')}
                                                </h6>
                                                <ul style={{ listStyle: 'none', padding: 0, color: '#666' }}>
                                                    {galaMenu.appetizers.map((item, index) => (
                                                        <li key={index} style={{ padding: '8px 0', borderBottom: '1px dashed #eee' }}>{t(item.nameKey)}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="col-md-4" style={{ marginBottom: '25px' }}>
                                                <h6 style={{
                                                    color: '#1a237e',
                                                    marginBottom: '15px',
                                                    paddingBottom: '10px',
                                                    borderBottom: '3px solid #FFBA00',
                                                    display: 'inline-block'
                                                }}>
                                                    <i className="fa-solid fa-utensils" style={{ marginRight: '8px', color: '#8B5CF6' }} />
                                                    {t('mainCourse')}
                                                </h6>
                                                <ul style={{ listStyle: 'none', padding: 0, color: '#666' }}>
                                                    {galaMenu.mainCourse.map((item, index) => (
                                                        <li key={index} style={{ padding: '8px 0', borderBottom: '1px dashed #eee' }}>{t(item.nameKey)}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="col-md-4" style={{ marginBottom: '25px' }}>
                                                <h6 style={{
                                                    color: '#1a237e',
                                                    marginBottom: '15px',
                                                    paddingBottom: '10px',
                                                    borderBottom: '3px solid #FFBA00',
                                                    display: 'inline-block'
                                                }}>
                                                    <i className="fa-solid fa-ice-cream" style={{ marginRight: '8px', color: '#EC4899' }} />
                                                    {t('desserts')}
                                                </h6>
                                                <ul style={{ listStyle: 'none', padding: 0, color: '#666' }}>
                                                    {galaMenu.desserts.map((item, index) => (
                                                        <li key={index} style={{ padding: '8px 0', borderBottom: '1px dashed #eee' }}>{t(item.nameKey)}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <div style={{
                                            marginTop: '20px',
                                            paddingTop: '20px',
                                            borderTop: '1px solid #eee',
                                            textAlign: 'center'
                                        }}>
                                            <p style={{ color: '#999', margin: 0, fontSize: '14px' }}>
                                                <i className="fa-solid fa-circle-info" style={{ marginRight: '8px', color: '#FFBA00' }} />
                                                {t('dietaryNote')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </Layout>
        </>
    )
}
