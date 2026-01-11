'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations } from 'next-intl'
import ImportantUpdate from "@/components/sections/travel/ImportantUpdate"
import GeneralInfo from "@/components/sections/travel/GeneralInfo"
import PracticalInfo from "@/components/sections/travel/PracticalInfo"
import AirportInfo from "@/components/sections/travel/AirportInfo"
import VisaInfo from "@/components/sections/travel/VisaInfo"
import TransportationInfo from "@/components/sections/travel/TransportationInfo"
import AdditionalInfo from "@/components/sections/travel/AdditionalInfo"
import EmergencyNumbers from "@/components/sections/travel/EmergencyNumbers"

export default function TravelVisa() {
    const t = useTranslations('travelVisa')
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
                                        <Link href="/">{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{tCommon('travelAccommodation')}</span> <i className="fa-solid fa-angle-right" /> <span>{tCommon('travelVisa')}</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ImportantUpdate />
                    <GeneralInfo />
                    <PracticalInfo />
                    <AirportInfo />
                    <VisaInfo />
                    <TransportationInfo />
                    <AdditionalInfo />
                    <EmergencyNumbers />

                    {/* CTA */}
                    <div className="cta1-section-area" style={{
                        background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
                        padding: '80px 0'
                    }}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-8" data-aos="fade-right" data-aos-duration={800}>
                                    <div className="cta-content">
                                        <h3 style={{ color: 'white', marginBottom: '10px' }}>{t('ctaTitle') || 'Need Accommodation?'}</h3>
                                        <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>{t('ctaDesc') || 'Check out our partner hotels with special conference rates.'}</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 text-lg-end" data-aos="fade-left" data-aos-duration={800}>
                                    <div className="btn-area1">
                                        <Link href="/accommodation" className="vl-btn1">{tCommon('hotelsRates')}</Link>
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
