'use client'
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function AbstractStatus() {
    const t = useTranslations('abstracts');
    const tUser = useTranslations('userProfile');

    // Mock abstract data
    const abstracts = [
        {
            id: 'ABS-2026-001234',
            title: 'Impact of Clinical Pharmacist Interventions on Medication Adherence in Chronic Disease Management',
            category: 'clinicalPharmacy',
            presentationType: 'oralPresentation',
            submittedDate: '2026-03-15',
            status: 'accepted',
            statusColor: '#00C853',
            reviewComments: 'Excellent research methodology. Well-written abstract with clear objectives and significant findings.',
            presentationDetails: {
                session: 'Oral Session 2A - Clinical Practice',
                date: 'July 10, 2026',
                time: '14:30 - 14:45',
                room: 'Conference Room B'
            }
        },
        {
            id: 'ABS-2026-001567',
            title: 'Pharmacoeconomic Analysis of Biosimilar Utilization in Oncology: A Multi-Center Study',
            category: 'pharmacoeconomics',
            presentationType: 'posterPresentation',
            submittedDate: '2026-03-20',
            status: 'underReview',
            statusColor: '#FF9800',
            reviewComments: null,
            presentationDetails: null
        }
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'accepted':
                return 'fa-circle-check';
            case 'underReview':
                return 'fa-clock';
            case 'rejected':
                return 'fa-circle-xmark';
            default:
                return 'fa-circle';
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            padding: '80px 20px 40px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{
                    background: '#fff',
                    borderRadius: '20px',
                    padding: '40px',
                    marginBottom: '30px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <div>
                        <h1 style={{
                            fontSize: '32px',
                            fontWeight: '700',
                            color: '#1a237e',
                            marginBottom: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px'
                        }}>
                            <i className="fa-solid fa-file-lines" style={{ color: '#FFBA00' }} />
                            {t('pageTitle')}
                        </h1>
                        <p style={{ color: '#666', fontSize: '16px', margin: 0 }}>
                            {t('pageDescription')}
                        </p>
                    </div>

                    <Link
                        href="/call-for-abstracts"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'linear-gradient(135deg, #00695c 0%, #00897b 100%)',
                            color: '#fff',
                            padding: '12px 24px',
                            borderRadius: '25px',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 6px 20px rgba(0, 105, 92, 0.3)'
                        }}
                    >
                        <i className="fa-solid fa-plus" />
                        {t('submitNew')}
                    </Link>
                </div>

                {/* Summary Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px',
                    marginBottom: '30px'
                }}>
                    <div style={{
                        background: '#fff',
                        borderRadius: '16px',
                        padding: '25px',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                        borderLeft: '4px solid #1a237e'
                    }}>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>{t('totalSubmitted')}</div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: '#1a237e' }}>2</div>
                    </div>

                    <div style={{
                        background: '#fff',
                        borderRadius: '16px',
                        padding: '25px',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                        borderLeft: '4px solid #00C853'
                    }}>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>{t('accepted')}</div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: '#00C853' }}>1</div>
                    </div>

                    <div style={{
                        background: '#fff',
                        borderRadius: '16px',
                        padding: '25px',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                        borderLeft: '4px solid #FF9800'
                    }}>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>{t('underReview')}</div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: '#FF9800' }}>1</div>
                    </div>
                </div>

                {/* Abstract List */}
                {abstracts.map((abstract) => (
                    <div key={abstract.id} style={{
                        background: '#fff',
                        borderRadius: '20px',
                        padding: '40px',
                        marginBottom: '25px',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Decorative gradient bar */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '6px',
                            background: `linear-gradient(90deg, ${abstract.statusColor} 0%, ${abstract.statusColor}dd 100%)`
                        }} />

                        {/* Status Badge */}
                        <div style={{
                            position: 'absolute',
                            top: '20px',
                            right: '40px',
                            padding: '10px 20px',
                            background: abstract.statusColor,
                            color: '#fff',
                            borderRadius: '20px',
                            fontSize: '14px',
                            fontWeight: '600',
                            boxShadow: `0 4px 15px ${abstract.statusColor}60`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <i className={`fa-solid ${getStatusIcon(abstract.status)}`} />
                            {t(abstract.status)}
                        </div>

                        {/* Abstract Details */}
                        <div style={{ paddingRight: '180px', marginTop: '10px' }}>
                            <h2 style={{
                                fontSize: '22px',
                                fontWeight: '700',
                                color: '#333',
                                marginBottom: '20px',
                                lineHeight: '1.4'
                            }}>
                                {abstract.title}
                            </h2>

                            <div style={{
                                display: 'flex',
                                gap: '15px',
                                flexWrap: 'wrap',
                                marginBottom: '25px'
                            }}>
                                <div style={{
                                    padding: '6px 16px',
                                    background: '#f5f5f5',
                                    borderRadius: '8px',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    color: '#1a237e'
                                }}>
                                    {t(abstract.category)}
                                </div>
                                <div style={{
                                    padding: '6px 16px',
                                    background: '#e8f5e9',
                                    borderRadius: '8px',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    color: '#00695c'
                                }}>
                                    {t(abstract.presentationType)}
                                </div>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'auto 1fr',
                                gap: '12px 20px',
                                marginBottom: '25px'
                            }}>
                                <div style={{ color: '#999', fontSize: '14px' }}>{t('abstractId')}:</div>
                                <div style={{ color: '#333', fontSize: '14px', fontWeight: '600', fontFamily: 'monospace' }}>{abstract.id}</div>
                                
                                <div style={{ color: '#999', fontSize: '14px' }}>{t('submittedDate')}:</div>
                                <div style={{ color: '#333', fontSize: '14px', fontWeight: '600' }}>{abstract.submittedDate}</div>
                            </div>

                            {/* Presentation Details (if accepted) */}
                            {abstract.presentationDetails && (
                                <div style={{
                                    padding: '25px',
                                    background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)',
                                    borderRadius: '12px',
                                    borderLeft: '4px solid #00C853',
                                    marginBottom: '20px'
                                }}>
                                    <h3 style={{
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        color: '#00695c',
                                        marginBottom: '15px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <i className="fa-solid fa-calendar-check" />
                                        {t('presentationSchedule')}
                                    </h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                                        <div>
                                            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>{t('session')}</div>
                                            <div style={{ fontSize: '14px', color: '#333', fontWeight: '600' }}>{abstract.presentationDetails.session}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>{t('room')}</div>
                                            <div style={{ fontSize: '14px', color: '#333', fontWeight: '600' }}>{abstract.presentationDetails.room}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>{t('date')}</div>
                                            <div style={{ fontSize: '14px', color: '#333', fontWeight: '600' }}>{abstract.presentationDetails.date}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>{t('time')}</div>
                                            <div style={{ fontSize: '14px', color: '#333', fontWeight: '600' }}>{abstract.presentationDetails.time}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Review Comments */}
                            {abstract.reviewComments && (
                                <div style={{
                                    padding: '20px',
                                    background: '#f8f9fa',
                                    borderRadius: '12px',
                                    borderLeft: '4px solid #1a237e',
                                    marginBottom: '20px'
                                }}>
                                    <h3 style={{
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        color: '#1a237e',
                                        marginBottom: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <i className="fa-solid fa-comment-dots" />
                                        {t('reviewerComments')}
                                    </h3>
                                    <p style={{
                                        fontSize: '14px',
                                        color: '#333',
                                        lineHeight: '1.6',
                                        margin: 0
                                    }}>
                                        {abstract.reviewComments}
                                    </p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div style={{
                                display: 'flex',
                                gap: '12px',
                                flexWrap: 'wrap'
                            }}>
                                <button style={{
                                    padding: '10px 20px',
                                    background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
                                    border: 'none',
                                    borderRadius: '10px',
                                    color: '#fff',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <i className="fa-solid fa-eye" />
                                    {t('viewFullAbstract')}
                                </button>
                                
                                {abstract.status === 'accepted' && (
                                    <button style={{
                                        padding: '10px 20px',
                                        background: 'transparent',
                                        border: '2px solid #00C853',
                                        borderRadius: '10px',
                                        color: '#00C853',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <i className="fa-solid fa-download" />
                                        {t('downloadCertificate')}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
