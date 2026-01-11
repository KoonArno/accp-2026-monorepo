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
                                <div style={{
                                    backgroundColor: 'white',
                                    padding: '60px',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
                                    fontSize: '18px',
                                    lineHeight: '2',
                                    color: '#2c3e50'
                                }}>

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

                                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '17px' }}>
                                            <tbody>
                                                <tr>
                                                    <td style={{ padding: '15px 20px', backgroundColor: '#f8f9fa', fontWeight: '600', width: '30%', borderBottom: '1px solid #e9ecef' }}>
                                                        {t('presentationType')}
                                                    </td>
                                                    <td style={{ padding: '15px 20px', borderBottom: '1px solid #e9ecef' }}>
                                                        {t('posterPresentation')} / {t('oralPresentation')}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: '15px 20px', backgroundColor: '#f8f9fa', fontWeight: '600', borderBottom: '1px solid #e9ecef' }}>
                                                        {t('language')}
                                                    </td>
                                                    <td style={{ padding: '15px 20px', borderBottom: '1px solid #e9ecef' }}>
                                                        {t('english')}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: '15px 20px', backgroundColor: '#f8f9fa', fontWeight: '600' }}>
                                                        {t('submissionMethod')}
                                                    </td>
                                                    <td style={{ padding: '15px 20px' }}>
                                                        {t('onlineSubmissionSystem')}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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

                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(2, 1fr)',
                                            gap: '0',
                                            border: '1px solid #e9ecef',
                                            borderRadius: '8px',
                                            overflow: 'hidden'
                                        }}>
                                            {[
                                                t('topic1'),
                                                t('topic2'),
                                                t('topic3'),
                                                t('topic4'),
                                                t('topic5'),
                                                t('topic6')
                                            ].map((topic, index) => (
                                                <div key={index} style={{
                                                    padding: '18px 25px',
                                                    backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                                                    borderBottom: index < 4 ? '1px solid #e9ecef' : 'none',
                                                    borderRight: index % 2 === 0 ? '1px solid #e9ecef' : 'none',
                                                    fontSize: '17px'
                                                }}>
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
                                                <div key={index} style={{
                                                    padding: '20px 25px',
                                                    backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                                                    borderBottom: index < 6 ? '1px solid #e9ecef' : 'none'
                                                }}>
                                                    <div style={{ fontSize: '17px' }}>
                                                        <span style={{ color: '#1a5276', fontWeight: '700', marginRight: '10px' }}>{item.num}</span>
                                                        <span style={{ fontWeight: '600' }}>{item.title}</span>
                                                        {item.desc && <span style={{ color: '#555' }}> — {item.desc}</span>}
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

                                        <div style={{
                                            backgroundColor: '#f8f9fa',
                                            border: '1px solid #e9ecef',
                                            borderRadius: '8px',
                                            padding: '30px 35px'
                                        }}>
                                            <ul style={{ margin: 0, paddingLeft: '25px', fontSize: '17px', lineHeight: '2.2' }}>
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