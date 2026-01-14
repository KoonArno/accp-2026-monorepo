'use client'
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Hourglass } from 'react-loader-spinner';
import Layout from '@/components/layout/Layout';

export default function AbstractStatus() {
    const t = useTranslations('abstracts');
    const tUser = useTranslations('userProfile');
    const { user } = useAuth();
    
    const [abstracts, setAbstracts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAbstracts = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            console.log('🔍 DEBUG - Current user:', user);
            console.log('🔍 DEBUG - Sending email to API:', user.email);

            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${API_URL}/api/abstracts/user`, {
                    credentials: 'include',
                    headers: {
                        'x-user-email': user.email,
                    },
                });

                console.log('🔍 DEBUG - Response status:', response.status);

                if (!response.ok) {
                    throw new Error('Failed to fetch abstracts');
                }

                const data = await response.json();
                console.log('🔍 DEBUG - Received data:', data);
                setAbstracts(data.abstracts || []);
            } catch (err) {
                console.error('Error fetching abstracts:', err);
                setError('Failed to load abstracts');
            } finally {
                setLoading(false);
            }
        };

        fetchAbstracts();
    }, [user]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'accepted':
                return '#00C853';
            case 'rejected':
                return '#D32F2F';
            case 'pending':
            default:
                return '#FF9800';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    // Calculate summary stats
    const totalSubmitted = abstracts.length;
    const acceptedCount = abstracts.filter(a => a.status === 'accepted').length;
    const underReviewCount = abstracts.filter(a => a.status === 'pending').length;

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
                            <div className="abstract-summary-value" style={{ color: '#1a237e' }}>{totalSubmitted}</div>
                        </div>

                        <div className="abstract-summary-card" style={{ borderLeft: '4px solid #00C853' }}>
                            <div className="abstract-summary-label">{t('accepted')}</div>
                            <div className="abstract-summary-value" style={{ color: '#00C853' }}>{acceptedCount}</div>
                        </div>

                        <div className="abstract-summary-card" style={{ borderLeft: '4px solid #FF9800' }}>
                            <div className="abstract-summary-label">{t('underReview')}</div>
                            <div className="abstract-summary-value" style={{ color: '#FF9800' }}>{underReviewCount}</div>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 20px' }}>
                            <Hourglass
                                visible={true}
                                height="60"
                                width="60"
                                ariaLabel="hourglass-loading"
                                colors={['#1a237e', '#FFBA00']}
                            />
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && abstracts.length === 0 && (
                        <div style={{
                            textAlign: 'center',
                            padding: '60px 20px',
                            background: '#f5f5f5',
                            borderRadius: '12px',
                            marginTop: '24px'
                        }}>
                            <i className="fa-solid fa-inbox" style={{ fontSize: '64px', color: '#bdbdbd', marginBottom: '16px' }} />
                            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>
                                {t('emptyState.title')}
                            </h3>
                            <p style={{ color: '#999', marginBottom: '24px' }}>
                                {t('emptyState.message')}
                            </p>
                            <Link href="/abstract-submission" className="abstract-primary-button">
                                <i className="fa-solid fa-plus" />
                                {t('emptyState.submitButton')}
                            </Link>
                        </div>
                    )}

                    {/* Abstract List */}
                    {!loading && abstracts.map((abstract) => {
                        const statusColor = getStatusColor(abstract.status);
                        return (
                        <div key={abstract.id} className="abstract-card">
                            {/* Decorative gradient bar */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '6px',
                                background: `linear-gradient(90deg, ${statusColor} 0%, ${statusColor}dd 100%)`
                            }} />

                            {/* Status Badge */}
                            <div
                                className="abstract-status-badge"
                                style={{
                                    background: statusColor,
                                    boxShadow: `0 4px 15px ${statusColor}60`,
                                }}
                            >
                                <i className={`fa-solid ${getStatusIcon(abstract.status)}`} />
                                {t(`status.${abstract.status}`)}
                            </div>

                            {/* Abstract Details */}
                            <div className="abstract-content-wrapper">
                                <h2 className="abstract-item-title">
                                    {abstract.title}
                                </h2>

                                <div className="abstract-tags-wrapper">
                                    <div className="abstract-tag abstract-tag-category">
                                        {abstract.category}
                                    </div>
                                    <div className="abstract-tag abstract-tag-type">
                                        {abstract.presentationType === 'oral' ? t('oralPresentation') : t('posterPresentation')}
                                    </div>
                                </div>

                                <div className="abstract-details-grid">
                                    <div className="ticket-info-label">{t('abstractId')}:</div>
                                    <div className="ticket-info-value" style={{ fontFamily: 'monospace' }}>{abstract.trackingId}</div>

                                    <div className="ticket-info-label">{t('submittedDate')}:</div>
                                    <div className="ticket-info-value">{formatDate(abstract.createdAt)}</div>
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
                                    <button 
                                        className="abstract-action-btn-primary"
                                        onClick={() => abstract.fullPaperUrl && window.open(abstract.fullPaperUrl, '_blank')}
                                        disabled={!abstract.fullPaperUrl}
                                        style={{ opacity: abstract.fullPaperUrl ? 1 : 0.5, cursor: abstract.fullPaperUrl ? 'pointer' : 'not-allowed' }}
                                    >
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
                    );
                    })}
                </div>
            </div>
        </Layout>
    );
}
