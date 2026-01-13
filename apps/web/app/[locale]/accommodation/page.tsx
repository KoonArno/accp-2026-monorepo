'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations } from 'next-intl'
import { hotels } from "@/data/hotelData"
import HotelCard from "@/components/sections/accommodation/HotelCard"

export default function Accommodation() {
    const t = useTranslations('accommodation')
    const tCommon = useTranslations('common')

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    {/* Header */}
                    <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg5.png)' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 m-auto">
                                    <div className="heading1 text-center">
                                        <h1>{t('pageTitle')}</h1>
                                        <div className="space20" />
                                        <Link href="/">{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{tCommon('travelAccommodation')}</span> <i className="fa-solid fa-angle-right" /> <span>{tCommon('hotelsRates')}</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Intro */}
                    <div className="about1-section-area sp1">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 m-auto">
                                    <div className="heading2 text-center space-margin60">
                                        <h5 data-aos="fade-up" data-aos-duration={800}>{t('subtitle')}</h5>
                                        <div className="space16" />
                                        <h2 className="text-anime-style-3">{t('partnerHotels')}</h2>
                                        <div className="space16" />
                                        <p data-aos="fade-up" data-aos-duration={1000}>
                                            {t('introDesc')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hotels List */}
                    <div className="service2-section-area sp2" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="container">
                            {hotels.map((hotel, index) => (
                                <HotelCard key={index} hotel={hotel} />
                            ))}
                        </div>
                    </div>

                    {/* Booking Info */}
                    <div className="sp1" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 m-auto">
                                    <div className="heading2 text-center space-margin60">
                                        <h2 data-aos="fade-up" data-aos-duration={800}>{t('howToBook')}</h2>
                                    </div>
                                    <div data-aos="fade-up" data-aos-duration={1000}>
                                        <div style={{ backgroundColor: '#e3f2fd', padding: '25px', borderRadius: '12px', marginBottom: '20px', border: '2px solid #2196F3' }}>
                                            <p style={{ margin: 0, color: '#1565c0', fontSize: '15px', lineHeight: '1.8' }}>
                                                <strong>📝 {t('bookingInstructions')}</strong><br />
                                                {t('bookingDesc')}
                                            </p>
                                        </div>
                                        <div style={{ backgroundColor: '#fff3e0', padding: '25px', borderRadius: '12px', border: '2px solid #FF9800' }}>
                                            <p style={{ margin: 0, color: '#e65100', fontSize: '15px', lineHeight: '1.8' }}>
                                                <strong>⚠️ {t('importantTitle')}</strong><br />
                                                {t('importantDesc')}
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
