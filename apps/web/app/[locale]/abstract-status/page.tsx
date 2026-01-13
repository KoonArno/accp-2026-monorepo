'use client'
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';

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
        <Layout headerStyle={1} footerStyle={1} headerBgWhite={true}>
            <div className="abstract-page-container">
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Header */}
                    <div className="abstract-header-card">
                        <div>
                            <h1 className="abstract-page-title">
                                <i className="fa-solid fa-file-lines" style={{ color: '#FFBA00' }} />
                                {t('pageTitle')}
                            </h1>
                            <p className="abstract-page-description">
                                {t('pageDescription')}
                            </p>
                        </div>

                        <Link
                            href="/call-for-abstracts"
                            className="abstract-primary-button"
                        >
                            <i className="fa-solid fa-plus" />
                            {t('submitNew')}
                        </Link>
                    </div>

                    {/* Summary Cards */}
                    <div className="abstract-summary-grid">
                        <div className="abstract-summary-card" style={{ borderLeft: '4px solid #1a237e' }}>
                            <div className="abstract-summary-label">{t('totalSubmitted')}</div>
                            <div className="abstract-summary-value" style={{ color: '#1a237e' }}>2</div>
                        </div>

                        <div className="abstract-summary-card" style={{ borderLeft: '4px solid #00C853' }}>
                            <div className="abstract-summary-label">{t('accepted')}</div>
                            <div className="abstract-summary-value" style={{ color: '#00C853' }}>1</div>
                        </div>

                        <div className="abstract-summary-card" style={{ borderLeft: '4px solid #FF9800' }}>
                            <div className="abstract-summary-label">{t('underReview')}</div>
                            <div className="abstract-summary-value" style={{ color: '#FF9800' }}>1</div>
                        </div>
                    </div>

                    {/* Abstract List */}
                    {abstracts.map((abstract) => (
                        <div key={abstract.id} className="abstract-card">
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
                            <div
                                className="abstract-status-badge"
                                style={{
                                    background: abstract.statusColor,
                                    boxShadow: `0 4px 15px ${abstract.statusColor}60`,
                                }}
                            >
                                <i className={`fa-solid ${getStatusIcon(abstract.status)}`} />
                                {t(abstract.status)}
                            </div>

                            {/* Abstract Details */}
                            <div className="abstract-content-wrapper">
                                <h2 className="abstract-item-title">
                                    {abstract.title}
                                </h2>

                                <div className="abstract-tags-wrapper">
                                    <div className="abstract-tag abstract-tag-category">
                                        {t(abstract.category)}
                                    </div>
                                    <div className="abstract-tag abstract-tag-type">
                                        {t(abstract.presentationType)}
                                    </div>
                                </div>

                                <div className="abstract-details-grid">
                                    <div className="ticket-info-label">{t('abstractId')}:</div>
                                    <div className="ticket-info-value" style={{ fontFamily: 'monospace' }}>{abstract.id}</div>

                                    <div className="ticket-info-label">{t('submittedDate')}:</div>
                                    <div className="ticket-info-value">{abstract.submittedDate}</div>
                                </div>

                                {/* Presentation Details (if accepted) */}
                                {abstract.presentationDetails && (
                                    <div className="presentation-details-box">
                                        <h3 className="abstract-subsection-title" style={{ color: '#00695c' }}>
                                            <i className="fa-solid fa-calendar-check" />
                                            {t('presentationSchedule')}
                                        </h3>
                                        <div className="presentation-grid">
                                            <div>
                                                <div className="abstract-grid-label">{t('session')}</div>
                                                <div className="abstract-grid-value">{abstract.presentationDetails.session}</div>
                                            </div>
                                            <div>
                                                <div className="abstract-grid-label">{t('room')}</div>
                                                <div className="abstract-grid-value">{abstract.presentationDetails.room}</div>
                                            </div>
                                            <div>
                                                <div className="abstract-grid-label">{t('date')}</div>
                                                <div className="abstract-grid-value">{abstract.presentationDetails.date}</div>
                                            </div>
                                            <div>
                                                <div className="abstract-grid-label">{t('time')}</div>
                                                <div className="abstract-grid-value">{abstract.presentationDetails.time}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Review Comments */}
                                {abstract.reviewComments && (
                                    <div className="review-comments-box">
                                        <h3 className="abstract-subsection-title" style={{ color: '#1a237e' }}>
                                            <i className="fa-solid fa-comment-dots" />
                                            {t('reviewerComments')}
                                        </h3>
                                        <p className="review-comments-text">
                                            {abstract.reviewComments}
                                        </p>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="abstract-action-buttons">
                                    <button className="abstract-action-btn-primary">
                                        <i className="fa-solid fa-eye" />
                                        {t('viewFullAbstract')}
                                    </button>

                                    {abstract.status === 'accepted' && (
                                        <button className="abstract-action-btn-outline">
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
        </Layout>
    );
}
