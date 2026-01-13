'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations, useLocale } from 'next-intl';
import ProgramSchedule from '@/components/sections/program/ProgramSchedule';
import ProgramNavigation from '@/components/sections/program/ProgramNavigation';

export default function ProgramOverview() {
    const tCommon = useTranslations('common');
    const t = useTranslations('program');
    const tCta = useTranslations('cta');
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
                                        <h1>{t('pageTitle')}</h1>
                                        <div className="space20" />
                                        <Link href={`/${locale}`}>{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{t('pageTitle')}</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ProgramSchedule />

                    <ProgramNavigation />


                </div>
            </Layout>
        </>
    )
}
