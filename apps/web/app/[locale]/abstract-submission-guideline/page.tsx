'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations } from 'next-intl'

export default function AbstractSubmissionGuideline() {
    const tCommon = useTranslations('common')
    const t = useTranslations('abstractGuideline')

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                {/* Header with Background */}
                <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg16.png)' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <div className="heading1 text-center">
                                    <h1>{t('pageTitle').toUpperCase()}</h1>
                                    <div className="space20" />
                                    <Link href="/">{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{tCommon('callForAbstracts')}</span> <i className="fa-solid fa-angle-right" /> <span>{tCommon('abstractGuideline')}</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sp1" style={{ background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 m-auto">

                                {/* Main Content Area */}
                                <div className="abstract-box">

                                    {/* 1. General Information */}
                                    <div style={{ marginBottom: '50px' }}>
                                        <h2 style={{
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            color: '#1a5276',
                                            borderBottom: '3px solid #c9a227',
                                            paddingBottom: '12px',
                                            marginBottom: '30px'
                                        }}>
                                            {t('generalInformation')}
                                        </h2>

                                        <div className="info-table-container">
                                            <div className="info-row">
                                                <div className="info-label">{t('presentationType')}</div>
                                                <div className="info-value">{t('posterPresentation')} / {t('oralPresentation')}</div>
                                            </div>
                                            <div className="info-row">
                                                <div className="info-label">{t('language')}</div>
                                                <div className="info-value">{t('english')}</div>
                                            </div>
                                            <div className="info-row">
                                                <div className="info-label">{t('submissionMethod')}</div>
                                                <div className="info-value">{t('onlineSubmissionSystem')}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ABSTRACT TOPICS */}
                                    <div style={{ marginBottom: '50px' }}>
                                        <h2 style={{
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            color: '#1a5276',
                                            borderBottom: '3px solid #c9a227',
                                            paddingBottom: '12px',
                                            marginBottom: '30px'
                                        }}>
                                            {t('abstractTopicsTitle')}
                                        </h2>

                                        <div className="topics-grid-container">
                                            {[
                                                t('topic1'),
                                                t('topic2'),
                                                t('topic3'),
                                                t('topic4'),
                                                t('topic5'),
                                                t('topic6')
                                            ].map((topic, index) => (
                                                <div key={index} className={`topic-item ${index % 2 === 0 ? 'grey' : ''}`}>
                                                    <span style={{ color: '#c9a227', marginRight: '10px', fontWeight: '600' }}>•</span>
                                                    {topic}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 2. Abstract Structure */}
                                    <div style={{ marginBottom: '50px' }}>
                                        <h2 style={{
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            color: '#1a5276',
                                            borderBottom: '3px solid #c9a227',
                                            paddingBottom: '12px',
                                            marginBottom: '30px'
                                        }}>
                                            {t('abstractStructure')}
                                        </h2>

                                        <p style={{ marginBottom: '25px', color: '#555', fontSize: '17px' }}>
                                            {t('structureIntro')}
                                        </p>

                                        <div style={{ border: '1px solid #e9ecef', borderRadius: '8px', overflow: 'hidden' }}>
                                            {[
                                                { num: '2.1', title: t('structure21'), desc: t('structure21Desc') },
                                                { num: '2.2', title: t('structure22'), items: [t('structure22Item1'), t('structure22Item2'), t('structure22Item3')] },
                                                { num: '2.3', title: t('structure23'), items: [t('structure23Item1'), t('structure23Item2')] },
                                                { num: '2.4', title: t('structure24'), desc: t('structure24Desc') },
                                                { num: '2.5', title: t('structure25'), items: [t('structure25Item1'), t('structure25Item2'), t('structure25Item3'), t('structure25Item4')] },
                                                { num: '2.6', title: t('structure26'), desc: t('structure26Desc') },
                                                { num: '2.7', title: t('structure27'), desc: t('structure27Desc') }
                                            ].map((item, index) => (
                                                <div key={index} className={`structure-item ${index % 2 === 0 ? 'even' : ''}`}>
                                                    <div className="structure-header">
                                                        <span className="structure-num">{item.num}</span>
                                                        <span className="structure-title">{item.title}</span>
                                                        {item.desc && <span className="structure-desc"> — {item.desc}</span>}
                                                    </div>
                                                    {item.items && (
                                                        <ul style={{ margin: '12px 0 0 35px', color: '#555', fontSize: '16px' }}>
                                                            {item.items.map((subItem, idx) => (
                                                                <li key={idx} style={{ marginBottom: '6px' }}>{subItem}</li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 3. Maximum Word Limit */}
                                    <div style={{ marginBottom: '50px' }}>
                                        <h2 style={{
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            color: '#1a5276',
                                            borderBottom: '3px solid #c9a227',
                                            paddingBottom: '12px',
                                            marginBottom: '30px'
                                        }}>
                                            {t('maxWordLimit')}
                                        </h2>

                                        <div style={{
                                            backgroundColor: '#fef9e7',
                                            border: '2px solid #c9a227',
                                            borderRadius: '8px',
                                            padding: '25px 30px',
                                            textAlign: 'center'
                                        }}>
                                            <p style={{ margin: 0, fontSize: '22px', fontWeight: '600', color: '#1a5276' }}>
                                                {t('wordLimit')}
                                            </p>
                                        </div>
                                    </div>

                                    {/* 4. Formatting Requirements */}
                                    <div style={{ marginBottom: '50px' }}>
                                        <h2 style={{
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            color: '#1a5276',
                                            borderBottom: '3px solid #c9a227',
                                            paddingBottom: '12px',
                                            marginBottom: '30px'
                                        }}>
                                            {t('formattingRequirements')}
                                        </h2>

                                        <div className="formatting-box">
                                            <ul className="formatting-list">
                                                <li style={{ marginBottom: '10px' }}>{t('formatFont')}</li>
                                                <li style={{ marginBottom: '10px' }}>{t('formatFontSize')}</li>
                                                <li style={{ marginBottom: '10px' }}>{t('formatLineSpacing')}</li>
                                                <li style={{ marginBottom: '10px' }}>{t('formatAbbreviations')}</li>
                                                <li>{t('formatNoTables')}</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <div style={{
                                        textAlign: 'center',
                                        paddingTop: '30px',
                                        borderTop: '1px solid #e9ecef'
                                    }}>
                                        <Link href="/call-for-abstracts" style={{
                                            display: 'inline-block',
                                            backgroundColor: '#c9a227',
                                            color: 'white',
                                            padding: '18px 50px',
                                            borderRadius: '6px',
                                            fontSize: '18px',
                                            fontWeight: '600',
                                            textDecoration: 'none',
                                            letterSpacing: '0.5px'
                                        }}>
                                            {tCommon('submitAbstract')}
                                        </Link>
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