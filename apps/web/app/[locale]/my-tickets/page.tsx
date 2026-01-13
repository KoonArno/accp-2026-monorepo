'use client'
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';

export default function MyTickets() {
    const t = useTranslations('tickets');
    const tUser = useTranslations('userProfile');

    // Mock ticket data
    const tickets = [
        {
            id: 'ACCP2026-REG-001234',
            type: 'professionalRegistration',
            category: 'earlyBird',
            status: 'confirmed',
            purchaseDate: '2026-02-15',
            amount: '$450',
            includes: [
                'fullAccess',
                'conferenceMaterials',
                'coffeeLunch',
                'certificate',
                'galaDinner'
            ],
            qrCode: true
        }
    ];

    // Gala Dinner Ticket
    const galaDinnerTicket = {
        id: 'ACCP2026-GALA-001234',
        eventName: 'galaDinnerEvent',
        status: 'confirmed',
        date: 'July 10, 2026',
        time: '19:00 - 22:00',
        venue: 'Centara Grand Ballroom',
        dressCode: 'formalAttire',
        qrCode: true
    };

    const addons = [
        {
            id: 'ACCP2026-WS-001234',
            type: 'preWorkshop',
            name: 'Advanced Pharmacokinetics in Clinical Practice',
            date: 'July 8, 2026',
            time: '09:00 - 17:00',
            status: 'confirmed',
            amount: '$70'
        }
    ];

    return (
        <Layout headerStyle={1} footerStyle={1} headerBgWhite={true}>
            <div className="ticket-page-container">
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Header */}
                    <div className="ticket-header-card">
                        <h1 style={{
                            fontSize: '32px',
                            fontWeight: '700',
                            color: '#1a237e',
                            marginBottom: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px'
                        }}>
                            <i className="fa-solid fa-ticket" style={{ color: '#FFBA00' }} />
                            {t('pageTitle')}
                        </h1>
                        <p style={{ color: '#666', fontSize: '16px' }}>
                            {t('pageDescription')}
                        </p>
                    </div>

                    {/* Main Registration Ticket */}
                    {tickets.map((ticket) => (
                        <div key={ticket.id} className="ticket-card">
                            {/* Decorative gradient bar */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '6px',
                                background: 'linear-gradient(90deg, #1a237e 0%, #3949ab 50%, #FFBA00 100%)'
                            }} />

                            {/* Status Badge */}
                            <div className="ticket-status-badge">
                                <i className="fa-solid fa-circle-check" style={{ marginRight: '6px' }} />
                                {t(ticket.status)}
                            </div>

                            <div className="ticket-layout-grid">
                                {/* Left side - Ticket Details */}
                                <div>
                                    <h2 style={{
                                        fontSize: '24px',
                                        fontWeight: '700',
                                        color: '#333',
                                        marginBottom: '10px'
                                    }}>
                                        {t(ticket.type)}
                                    </h2>

                                    <div style={{
                                        display: 'inline-block',
                                        padding: '6px 16px',
                                        background: '#f5f5f5',
                                        borderRadius: '8px',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        color: '#1a237e',
                                        marginBottom: '20px'
                                    }}>
                                        {t(ticket.category)}
                                    </div>

                                    <div className="ticket-details-grid">
                                        <div className="ticket-info-label">{t('ticketId')}:</div>
                                        <div className="ticket-info-value" style={{ fontFamily: 'monospace' }}>{ticket.id}</div>

                                        <div className="ticket-info-label">{t('purchaseDate')}:</div>
                                        <div className="ticket-info-value">{ticket.purchaseDate}</div>

                                        <div className="ticket-info-label">{t('amountPaid')}:</div>
                                        <div className="ticket-info-value" style={{ color: '#00C853', fontSize: '18px', fontWeight: '700' }}>{ticket.amount}</div>
                                    </div>

                                    <div className="ticket-includes-box">
                                        <h3 style={{
                                            fontSize: '14px',
                                            fontWeight: '700',
                                            color: '#1a237e',
                                            marginBottom: '12px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}>
                                            {t('registrationIncludes')}
                                        </h3>
                                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                            {ticket.includes.map((item, idx) => (
                                                <li key={idx} style={{
                                                    color: '#333',
                                                    fontSize: '14px',
                                                    marginBottom: '8px',
                                                    lineHeight: '1.6'
                                                }}>
                                                    {t(item)}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Right side - QR Code */}
                                <div className="ticket-qr-section">
                                    <div style={{
                                        width: '180px',
                                        height: '180px',
                                        background: '#fff',
                                        border: '2px solid #1a237e',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '15px',
                                        position: 'relative'
                                    }}>
                                        {/* QR Code Placeholder */}
                                        <div style={{
                                            width: '160px',
                                            height: '160px',
                                            background: 'repeating-linear-gradient(0deg, #1a237e, #1a237e 2px, transparent 2px, transparent 4px), repeating-linear-gradient(90deg, #1a237e, #1a237e 2px, transparent 2px, transparent 4px)',
                                            opacity: 0.8
                                        }} />
                                    </div>
                                    <p style={{
                                        fontSize: '12px',
                                        color: '#666',
                                        textAlign: 'center',
                                        margin: '0 0 8px 0'
                                    }}>
                                        {t('scanQrCode')}
                                    </p>

                                    {/* Download Button */}
                                    <button style={{
                                        width: 'calc(100% - 20px)',
                                        padding: '10px 16px',
                                        background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
                                        border: 'none',
                                        borderRadius: '10px',
                                        color: '#fff',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        transition: 'all 0.3s ease',
                                        marginBottom: '10px'
                                    }}>
                                        <i className="fa-solid fa-download" />
                                        {t('downloadPdf')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Gala Dinner Ticket */}
                    <div className="ticket-card">
                        <h2 style={{
                            fontSize: '22px',
                            fontWeight: '700',
                            color: '#333',
                            marginBottom: '25px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <i className="fa-solid fa-champagne-glasses" style={{ color: '#C2185B' }} />
                            {t(galaDinnerTicket.eventName)}
                        </h2>

                        <div className="gala-card">
                            <div className="ticket-status-badge">
                                {t(galaDinnerTicket.status)}
                            </div>

                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: '700',
                                color: '#333',
                                marginBottom: '15px',
                                paddingRight: '120px'
                            }}>
                                An Elegant Evening of Fine Dining & Networking
                            </h3>

                            <div className="addon-details-flex">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <i className="fa-solid fa-calendar" style={{ color: '#C2185B' }} />
                                    <span style={{ color: '#666' }}>{galaDinnerTicket.date}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <i className="fa-solid fa-clock" style={{ color: '#C2185B' }} />
                                    <span style={{ color: '#666' }}>{galaDinnerTicket.time}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <i className="fa-solid fa-location-dot" style={{ color: '#C2185B' }} />
                                    <span style={{ color: '#666' }}>{galaDinnerTicket.venue}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <i className="fa-solid fa-user-tie" style={{ color: '#C2185B' }} />
                                    <span style={{ color: '#C2185B', fontWeight: '700' }}>{t(galaDinnerTicket.dressCode)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Workshop Add-ons */}
                    {addons.length > 0 && (
                        <div className="ticket-card">
                            <h2 style={{
                                fontSize: '22px',
                                fontWeight: '700',
                                color: '#333',
                                marginBottom: '25px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <i className="fa-solid fa-briefcase" style={{ color: '#00695c' }} />
                                {t('registeredWorkshops')}
                            </h2>

                            {addons.map((addon) => (
                                <div key={addon.id} className="addon-card">
                                    <div className="ticket-status-badge">
                                        {t(addon.status)}
                                    </div>

                                    <h3 style={{
                                        fontSize: '18px',
                                        fontWeight: '700',
                                        color: '#333',
                                        marginBottom: '15px',
                                        paddingRight: '120px'
                                    }}>
                                        {addon.name}
                                    </h3>

                                    <div className="addon-details-flex">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <i className="fa-solid fa-calendar" style={{ color: '#00695c' }} />
                                            <span style={{ color: '#666' }}>{addon.date}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <i className="fa-solid fa-clock" style={{ color: '#00695c' }} />
                                            <span style={{ color: '#666' }}>{addon.time}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <i className="fa-solid fa-tag" style={{ color: '#00695c' }} />
                                            <span style={{ color: '#00695c', fontWeight: '700' }}>{addon.amount}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
