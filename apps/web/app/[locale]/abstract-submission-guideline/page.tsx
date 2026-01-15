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

                                    {/* Introduction */}
                                    <div style={{ marginBottom: '40px' }}>
                                        <p style={{ fontSize: '17px', color: '#555', lineHeight: '1.8', marginBottom: '30px' }}>
                                            {t('intro')}
                                        </p>
                                    </div>

                                    {/* Important Dates */}
                                    <div style={{ marginBottom: '50px' }}>
                                        <h2 style={{
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            color: '#1a5276',
                                            borderBottom: '3px solid #c9a227',
                                            paddingBottom: '12px',
                                            marginBottom: '30px'
                                        }}>
                                            {t('importantDatesTitle')}
                                        </h2>

                                        <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
                                            <ul style={{ margin: 0, paddingLeft: '20px', color: '#555', fontSize: '16px', lineHeight: '2' }}>
                                                <li><strong>{t('submissionDeadline')}</strong></li>
                                                <li>{t('authorNotification')}</li>
                                                <li>{t('earlyBirdRegistration')}</li>
                                                <li>{t('regularRegistration')}</li>
                                            </ul>
                                            <p style={{ marginTop: '20px', marginBottom: 0, color: '#d32f2f', fontWeight: '600', fontSize: '15px' }}>
                                                ⚠️ {t('presenterRegistrationNote')}
                                            </p>
                                        </div>
                                    </div>

                                    {/* General Information */}
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
                                                <div className="info-value">☐ {t('posterPresentation')} / ☐ {t('oralPresentation')}</div>
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

                                    {/* ABSTRACT SUBMISSION GUIDELINES */}
                                    <div style={{ marginBottom: '50px' }}>
                                        <h2 style={{
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            color: '#1a5276',
                                            borderBottom: '3px solid #c9a227',
                                            paddingBottom: '12px',
                                            marginBottom: '30px'
                                        }}>
                                            {t('submissionGuidelinesTitle')}
                                        </h2>

                                        <ul style={{ paddingLeft: '20px', color: '#555', fontSize: '16px', lineHeight: '1.8' }}>
                                            <li style={{ marginBottom: '12px' }}>{t('guideline1')}</li>
                                            <li style={{ marginBottom: '12px' }}>{t('guideline2')}</li>
                                            <li style={{ marginBottom: '12px' }}>{t('guideline3')}</li>
                                            <li style={{ marginBottom: '12px' }}>{t('guideline4')}</li>
                                            <li style={{ marginBottom: '12px' }}>{t('guideline5')}</li>
                                            <li style={{ marginBottom: '12px' }}>{t('guideline6')}</li>
                                            <li style={{ marginBottom: '12px' }}><strong>{t('guideline7')}</strong></li>
                                            <li style={{ marginBottom: '12px' }}><strong>{t('guideline8')}</strong></li>
                                            <li style={{ marginBottom: '12px' }}>{t('guideline9')}</li>
                                            <li style={{ marginBottom: '12px' }}>{t('guideline10')}</li>
                                            <li style={{ marginBottom: '12px' }}>{t('guideline11')}</li>
                                            <li style={{ marginBottom: '12px' }}>{t('guideline12')}</li>
                                        </ul>

                                        <div style={{ backgroundColor: '#e3f2fd', padding: '20px', borderRadius: '8px', marginTop: '20px', border: '1px solid #90caf9' }}>
                                            <p style={{ margin: 0, fontSize: '15px', color: '#1565c0' }}>
                                                ℹ️ {t('acknowledgementNote')}
                                            </p>
                                        </div>

                                        <div style={{ backgroundColor: '#fff3e0', padding: '20px', borderRadius: '8px', marginTop: '15px', border: '1px solid #ffb74d' }}>
                                            <p style={{ margin: 0, fontSize: '15px', color: '#e65100' }}>
                                                📋 {t('reviewNote')}
                                            </p>
                                        </div>

                                        <div style={{ backgroundColor: '#ffebee', padding: '20px', borderRadius: '8px', marginTop: '15px', border: '1px solid #ef5350' }}>
                                            <p style={{ margin: 0, fontSize: '15px', color: '#c62828', fontWeight: '600' }}>
                                                🚫 {t('noMediaNote')}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Abstract Structure */}
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
                                                { title: t('structure21'), desc: t('structure21Desc') },
                                                { title: t('structure22'), items: [t('structure22Item1'), t('structure22Item2'), t('structure22Item3')] },
                                                { title: t('structure23'), items: [t('structure23Item1'), t('structure23Item2')] },
                                                { title: t('structure24'), desc: t('structure24Desc') },
                                                { title: t('structure25'), items: [t('structure25Item1'), t('structure25Item2'), t('structure25Item3'), t('structure25Item4')] },
                                                { title: t('structure26'), desc: t('structure26Desc') },
                                                { title: t('structure27'), desc: t('structure27Desc') }
                                            ].map((item, index) => (
                                                <div key={index} className={`structure-item ${index % 2 === 0 ? 'even' : ''}`}>
                                                    <div className="structure-header">
                                                        <span className="structure-title"><strong>{item.title}</strong></span>
                                                        {item.desc && <span className="structure-desc"> {item.desc}</span>}
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

                                    {/* Maximum Word Limit */}
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

                                    {/* Formatting Requirements */}
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

                                    {/* Declaration & Assignation */}
                                    <div style={{ marginBottom: '50px' }}>
                                        <h2 style={{
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            color: '#1a5276',
                                            borderBottom: '3px solid #c9a227',
                                            paddingBottom: '12px',
                                            marginBottom: '30px'
                                        }}>
                                            {t('declarationTitle')}
                                        </h2>

                                        <ul style={{ paddingLeft: '20px', color: '#555', fontSize: '16px', lineHeight: '1.8' }}>
                                            <li style={{ marginBottom: '12px' }}>{t('declaration1')}</li>
                                            <li style={{ marginBottom: '12px' }}>{t('declaration2')}</li>
                                            <li>{t('declaration3')}</li>
                                        </ul>
                                    </div>

                                    {/* Acceptance Notification */}
                                    <div style={{ marginBottom: '50px' }}>
                                        <h2 style={{
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            color: '#1a5276',
                                            borderBottom: '3px solid #c9a227',
                                            paddingBottom: '12px',
                                            marginBottom: '30px'
                                        }}>
                                            {t('acceptanceTitle')}
                                        </h2>

                                        <ul style={{ paddingLeft: '20px', color: '#555', fontSize: '16px', lineHeight: '1.8' }}>
                                            <li style={{ marginBottom: '12px' }}>{t('acceptance1')}</li>
                                            <li style={{ marginBottom: '12px' }}>{t('acceptance2')}</li>
                                            <li><strong style={{ color: '#d32f2f' }}>{t('acceptance3')}</strong></li>
                                        </ul>
                                    </div>

                                    {/* Abstract Withdrawal */}
                                    <div style={{ marginBottom: '50px' }}>
                                        <h2 style={{
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            color: '#1a5276',
                                            borderBottom: '3px solid #c9a227',
                                            paddingBottom: '12px',
                                            marginBottom: '30px'
                                        }}>
                                            {t('withdrawalTitle')}
                                        </h2>

                                        <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.8' }}>
                                            {t('withdrawal1')}
                                        </p>
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