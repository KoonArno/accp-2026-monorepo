'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations, useLocale } from 'next-intl';
import { workshops } from '@/data/workshopData';

export default function PreconferenceWorkshops() {
    const tCommon = useTranslations('common');
    const tProgram = useTranslations('program');
    const t = useTranslations('workshops'); // Specialized keys
    const tContact = useTranslations('contact');
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
                                        <Link href={`/${locale}`}>{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{tProgram('pageTitle')}</span> <i className="fa-solid fa-angle-right" /> <span>{tCommon('workshops')}</span></Link>
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
                                        <h5 data-aos="fade-up" data-aos-duration={800}>{t('introTitle')}</h5>
                                        <div className="space16" />
                                        <h2 className="text-anime-style-3">{t('introSubtitle')}</h2>
                                        <div className="space16" />
                                        <p data-aos="fade-up" data-aos-duration={1000}>
                                            {t('introDesc')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Important Note */}
                    <div className="container" style={{ marginBottom: '40px' }}>
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <div className="pricing-boxarea" data-aos="fade-up" data-aos-duration={800} style={{
                                    background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                                    border: '2px solid #F59E0B'
                                }}>
                                    <p style={{ margin: 0, color: '#92400E' }}>
                                        <i className="fa-solid fa-circle-info" style={{ marginRight: '10px', fontSize: '18px' }} />
                                        <strong>Note:</strong> {t('note')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Workshops Grid */}
                    <div className="service2-section-area sp2" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="container">
                            <div className="row">
                                {workshops.map((workshop, index) => (
                                    <div key={index} className="col-lg-6" data-aos="fade-up" data-aos-duration={800} data-aos-delay={index * 100}>
                                        <div className="pricing-boxarea" style={{
                                            marginBottom: '30px',
                                            padding: 0,
                                            overflow: 'hidden',
                                            position: 'relative'
                                        }}>
                                            {workshop.isFull && (
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '20px',
                                                    right: '-30px',
                                                    backgroundColor: '#EF4444',
                                                    color: 'white',
                                                    padding: '5px 40px',
                                                    transform: 'rotate(45deg)',
                                                    fontSize: '12px',
                                                    fontWeight: 'bold',
                                                    zIndex: 10
                                                }}>{t('full')}</div>
                                            )}

                                            {/* Header */}
                                            <div style={{
                                                background: `linear-gradient(135deg, ${workshop.color} 0%, ${workshop.color}dd 100%)`,
                                                color: 'white',
                                                padding: '25px'
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                                                    <div style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                                        borderRadius: '12px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        flexShrink: 0
                                                    }}>
                                                        <i className={`fa-solid ${workshop.icon}`} style={{ fontSize: '22px' }} />
                                                    </div>
                                                    <div>
                                                        <span style={{
                                                            backgroundColor: 'rgba(255,255,255,0.2)',
                                                            padding: '3px 10px',
                                                            borderRadius: '10px',
                                                            fontSize: '11px',
                                                            fontWeight: '600'
                                                        }}>{workshop.id}</span>
                                                        <h5 style={{ color: 'white', margin: '10px 0 0 0', fontSize: '17px' }}>{t(workshop.titleKey)}</h5>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div style={{ padding: '25px' }}>
                                                {/* Info Grid */}
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                                                    <div>
                                                        <p style={{ margin: '0 0 3px 0', fontSize: '11px', color: '#999', textTransform: 'uppercase', fontWeight: '600' }}>{t('date')}</p>
                                                        <p style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>{workshop.date}<br />{workshop.time}</p>
                                                    </div>
                                                    <div>
                                                        <p style={{ margin: '0 0 3px 0', fontSize: '11px', color: '#999', textTransform: 'uppercase', fontWeight: '600' }}>{t('duration')}</p>
                                                        <p style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>{t(workshop.durationKey)}</p>
                                                    </div>
                                                    <div>
                                                        <p style={{ margin: '0 0 3px 0', fontSize: '11px', color: '#999', textTransform: 'uppercase', fontWeight: '600' }}>{tContact('venue')}</p>
                                                        <p style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>{workshop.venue}</p>
                                                    </div>
                                                    <div>
                                                        <p style={{ margin: '0 0 3px 0', fontSize: '11px', color: '#999', textTransform: 'uppercase', fontWeight: '600' }}>{t('fee')}</p>
                                                        <p style={{ margin: 0, fontWeight: '700', fontSize: '16px', color: workshop.color }}>{workshop.fee}</p>
                                                    </div>
                                                </div>

                                                {/* Instructors */}
                                                <div style={{ marginBottom: '20px' }}>
                                                    <p style={{ margin: '0 0 10px 0', fontSize: '11px', color: '#999', textTransform: 'uppercase', fontWeight: '600' }}>
                                                        <i className="fa-solid fa-chalkboard-user" style={{ marginRight: '5px' }} />
                                                        {t('instructor')}
                                                    </p>
                                                    {workshop.instructors.map((instructor, i) => (
                                                        <div key={i} style={{ marginBottom: '8px' }}>
                                                            <p style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>{instructor.name}</p>
                                                            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{instructor.affiliation}</p>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Objectives */}
                                                <div style={{ marginBottom: '20px' }}>
                                                    <p style={{ margin: '0 0 10px 0', fontSize: '11px', color: '#999', textTransform: 'uppercase', fontWeight: '600' }}>
                                                        <i className="fa-solid fa-bullseye" style={{ marginRight: '5px' }} />
                                                        {t('learningObjectives')}
                                                    </p>
                                                    <ul style={{ margin: 0, paddingLeft: '18px' }}>
                                                        {(t.raw(workshop.objectivesKey) as any[]).map((obj: string, i: number) => (
                                                            <li key={i} style={{ fontSize: '13px', color: '#555', marginBottom: '5px' }}>{obj}</li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Footer */}
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    flexWrap: 'wrap',
                                                    gap: '15px',
                                                    borderTop: '1px solid #eee',
                                                    paddingTop: '20px'
                                                }}>
                                                    <div>
                                                        <span style={{ fontSize: '12px', color: '#666' }}>
                                                            <i className="fa-solid fa-users" style={{ marginRight: '5px' }} />
                                                            {workshop.enrolled}/{workshop.capacity} {t('enrolled')}
                                                        </span>
                                                        <div style={{
                                                            backgroundColor: '#e0e0e0',
                                                            height: '6px',
                                                            width: '100px',
                                                            borderRadius: '3px',
                                                            marginTop: '5px'
                                                        }}>
                                                            <div style={{
                                                                backgroundColor: workshop.isFull ? '#EF4444' : workshop.color,
                                                                height: '100%',
                                                                width: `${(workshop.enrolled / workshop.capacity) * 100}%`,
                                                                borderRadius: '3px'
                                                            }} />
                                                        </div>
                                                    </div>
                                                    <Link
                                                        href={workshop.isFull ? "#" : "/registration"}
                                                        className="vl-btn1"
                                                        style={{
                                                            backgroundColor: workshop.isFull ? '#ccc' : workshop.color,
                                                            cursor: workshop.isFull ? 'not-allowed' : 'pointer',
                                                            padding: '12px 25px',
                                                            fontSize: '14px'
                                                        }}
                                                    >
                                                        {workshop.isFull ? t('workshopFull') : t('registerNow')}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                </div>
            </Layout>
        </>
    )
}
