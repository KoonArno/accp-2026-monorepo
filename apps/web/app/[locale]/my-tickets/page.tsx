'use client'
import { useTranslations } from 'next-intl';
import Link from 'next/link';

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
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
                }}>
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
                    <div key={ticket.id} style={{
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
                            background: 'linear-gradient(90deg, #1a237e 0%, #3949ab 50%, #FFBA00 100%)'
                        }} />

                        {/* Status Badge */}
                        <div style={{
                            position: 'absolute',
                            top: '20px',
                            right: '40px',
                            padding: '8px 20px',
                            background: 'linear-gradient(135deg, #00C853 0%, #69F0AE 100%)',
                            color: '#fff',
                            borderRadius: '20px',
                            fontSize: '14px',
                            fontWeight: '600',
                            boxShadow: '0 4px 15px rgba(0, 200, 83, 0.3)'
                        }}>
                            <i className="fa-solid fa-circle-check" style={{ marginRight: '6px' }} />
                            {t(ticket.status)}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '40px', marginTop: '20px' }}>
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

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'auto 1fr',
                                    gap: '12px 20px',
                                    marginBottom: '25px'
                                }}>
                                    <div style={{ color: '#999', fontSize: '14px' }}>{t('ticketId')}:</div>
                                    <div style={{ color: '#333', fontSize: '14px', fontWeight: '600', fontFamily: 'monospace' }}>{ticket.id}</div>
                                    
                                    <div style={{ color: '#999', fontSize: '14px' }}>{t('purchaseDate')}:</div>
                                    <div style={{ color: '#333', fontSize: '14px', fontWeight: '600' }}>{ticket.purchaseDate}</div>
                                    
                                    <div style={{ color: '#999', fontSize: '14px' }}>{t('amountPaid')}:</div>
                                    <div style={{ color: '#00C853', fontSize: '18px', fontWeight: '700' }}>{ticket.amount}</div>
                                </div>

                                <div style={{
                                    padding: '20px',
                                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                                    borderRadius: '12px',
                                    borderLeft: '4px solid #1a237e'
                                }}>
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
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '30px',
                                background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                                borderRadius: '16px',
                                border: '2px dashed #e0e0e0'
                            }}>
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
                <div style={{
                    background: '#fff',
                    borderRadius: '20px',
                    padding: '40px',
                    marginBottom: '25px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
                }}>
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

                    <div style={{
                        padding: '25px',
                        background: 'linear-gradient(135deg, #fce4ec 0%, #ffffff 100%)',
                        borderRadius: '12px',
                        border: '1px solid #f8bbd0',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '25px',
                            right: '25px',
                            padding: '6px 16px',
                            background: 'linear-gradient(135deg, #00C853 0%, #69F0AE 100%)',
                            color: '#fff',
                            borderRadius: '16px',
                            fontSize: '12px',
                            fontWeight: '600'
                        }}>
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

                        <div style={{
                            display: 'flex',
                            gap: '30px',
                            flexWrap: 'wrap',
                            fontSize: '14px'
                        }}>
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
                    <div style={{
                        background: '#fff',
                        borderRadius: '20px',
                        padding: '40px',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
                    }}>
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
                            <div key={addon.id} style={{
                                padding: '25px',
                                background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                                borderRadius: '12px',
                                border: '1px solid #e8e8e8',
                                marginBottom: '15px',
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '25px',
                                    right: '25px',
                                    padding: '6px 16px',
                                    background: 'linear-gradient(135deg, #00C853 0%, #69F0AE 100%)',
                                    color: '#fff',
                                    borderRadius: '16px',
                                    fontSize: '12px',
                                    fontWeight: '600'
                                }}>
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

                                <div style={{
                                    display: 'flex',
                                    gap: '30px',
                                    flexWrap: 'wrap',
                                    fontSize: '14px'
                                }}>
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
    );
}
