'use client'
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function ContactInfo() {
    const t = useTranslations('contact');
    const tCommon = useTranslations('common');

    return (
        <div className="contact2-bg-section" style={{ paddingTop: '60px', paddingBottom: '100px', background: '#fff' }}>
            {/* Map Section with Container */}
            <div className="container" style={{ marginBottom: '40px' }}>
                <div style={{
                    background: '#f8f9fa',
                    borderRadius: '16px',
                    padding: '15px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    overflow: 'hidden'
                }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3873.8619932305305!2d100.5276269!3d13.8473214!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29b5cb4ca105b%3A0xb3aaa2c0ba72d485!2z4Liq4Lig4Liy4LmA4Lig4Liq4Lix4LiK4LiB4Lij4Lij4Lih!5e0!3m2!1sth!2sth!4v1767929802367!5m2!1sth!2sth"
                        width="100%"
                        height="350"
                        style={{ border: 0, display: 'block', borderRadius: '12px' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={900} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            height: '100%',
                            minHeight: '200px',
                            padding: '40px 20px',
                            backgroundColor: '#fff',
                            borderRadius: '16px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
                        }}>
                            <div className="icons" style={{
                                position: 'static',
                                marginBottom: '20px',
                                background: 'transparent',
                                width: 'auto',
                                height: 'auto',
                                borderRadius: '0'
                            }}>
                                <i className="fa-solid fa-envelope" style={{ fontSize: '48px', color: '#EA4335' }} />
                            </div>
                            <div className="text" style={{ paddingLeft: 0 }}>
                                <h5 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: '#1a1a2e', textTransform: 'none' }}>{tCommon('email')}</h5>
                                <Link href="mailto:pharthai@pharmacycouncil.org" style={{ fontSize: '16px', color: '#4a4a4a', fontWeight: '500', wordBreak: 'break-all' }}>pharthai@pharmacycouncil.org</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={1000} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            height: '100%',
                            minHeight: '260px',
                            padding: '40px 20px',
                            backgroundColor: '#fff',
                            borderRadius: '16px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
                        }}>
                            <div className="icons" style={{
                                position: 'static',
                                marginBottom: '20px',
                                background: 'transparent',
                                width: 'auto',
                                height: 'auto',
                                borderRadius: '0'
                            }}>
                                <i className="fa-solid fa-location-dot" style={{ fontSize: '48px', color: '#EA4335' }} />
                            </div>
                            <div className="text" style={{ paddingLeft: 0 }}>
                                <h5 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: '#1a1a2e', textTransform: 'none' }}>{t('location')}</h5>
                                <Link href="https://maps.google.com/?q=สภาเภสัชกรรม" target="_blank" style={{ fontSize: '16px', color: '#4a4a4a', fontWeight: '500' }}>{t('locationName')}</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={1100} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            height: '100%',
                            minHeight: '260px',
                            padding: '40px 20px',
                            backgroundColor: '#fff',
                            borderRadius: '16px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
                        }}>
                            <div className="icons" style={{
                                position: 'static',
                                marginBottom: '20px',
                                background: 'transparent',
                                width: 'auto',
                                height: 'auto',
                                borderRadius: '0'
                            }}>
                                <i className="fa-solid fa-phone" style={{ fontSize: '48px', color: '#34A853' }} />
                            </div>
                            <div className="text" style={{ paddingLeft: 0 }}>
                                <h5 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: '#1a1a2e', textTransform: 'none' }}>{tCommon('phone')}</h5>
                                <Link href="tel:+6625919992" style={{ fontSize: '16px', color: '#4a4a4a', fontWeight: '500' }}>0 2591 9992</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
