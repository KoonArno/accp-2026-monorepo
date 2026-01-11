'use client'
import { useTranslations } from 'next-intl';

export default function ProgramSearch() {
    const t = useTranslations('program'); // Potentially add specific keys later

    return (
        <div className="container" style={{ marginBottom: '40px' }}>
            <div className="row">
                <div className="col-lg-8 m-auto">
                    <div className="pricing-boxarea" data-aos="fade-up" data-aos-duration={800} style={{ textAlign: 'center' }}>
                        <h5 style={{ marginBottom: '20px' }}>
                            <i className="fa-solid fa-magnifying-glass" style={{ marginRight: '10px', color: '#FFBA00' }} />
                            Search Presentations
                        </h5>
                        <div style={{ display: 'flex', gap: '10px', maxWidth: '600px', margin: '0 auto' }}>
                            <input
                                type="text"
                                placeholder="Search by title, author, or abstract number..."
                                style={{
                                    flex: 1,
                                    padding: '15px 20px',
                                    border: '2px solid #e0e0e0',
                                    borderRadius: '30px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    transition: 'border-color 0.3s'
                                }}
                            />
                            <button style={{
                                backgroundColor: '#1a237e',
                                color: 'white',
                                border: 'none',
                                padding: '15px 30px',
                                borderRadius: '30px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                transition: 'background 0.3s'
                            }}>
                                Search
                            </button>
                        </div>
                        <p style={{ color: '#999', fontSize: '13px', marginTop: '15px', marginBottom: 0 }}>
                            Full search functionality will be available when the program is finalized.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
