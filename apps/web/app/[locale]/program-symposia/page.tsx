'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations, useLocale } from 'next-intl';
import SymposiaList from '@/components/sections/program/SymposiaList';

export default function Symposia() {
    const tCommon = useTranslations('common');
    const tProgram = useTranslations('program');
    const tSymposia = useTranslations('symposia');
    const locale = useLocale();

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    {/* Hero Header */}
                    <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg5.png)' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 m-auto">
                                    <div className="heading1 text-center">
                                        <h1>{tSymposia('pageTitle')}</h1>
                                        <div className="space20" />
                                        <Link href={`/${locale}`}>{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{tProgram('pageTitle')}</span> <i className="fa-solid fa-angle-right" /> <span>{tSymposia('pageTitle')}</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Introduction */}
                    <div className="service1-section-area sp1">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 m-auto">
                                    <div className="heading2 text-center space-margin60">
                                        <h5 data-aos="fade-up" data-aos-duration={800}>{tProgram('symposiaA')}</h5>
                                        <div className="space16" />
                                        <h2 className="text-anime-style-3">{tSymposia('scientificSymposiaTitle')}</h2>
                                        <div className="space16" />
                                        <p data-aos="fade-up" data-aos-duration={1000}>
                                            {tSymposia('scientificSymposiaDesc')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <SymposiaList />

                    {/* Note */}
                    <div className="container" style={{ padding: '40px 15px' }}>
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <div className="pricing-boxarea" data-aos="fade-up" data-aos-duration={800} style={{
                                    background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                                    border: '2px solid #F59E0B',
                                    textAlign: 'center'
                                }}>
                                    <p style={{ margin: 0, color: '#92400E', fontWeight: '500' }}>
                                        <i className="fa-solid fa-circle-info" style={{ marginRight: '10px' }} />
                                        <strong>Note:</strong> {tSymposia('note')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </Layout>
        </>
    )
}
