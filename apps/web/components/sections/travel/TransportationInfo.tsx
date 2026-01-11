'use client'
import { useTranslations } from 'next-intl'
import { interchangeStations } from "@/data/travelData"

export default function TransportationInfo() {
    const t = useTranslations('travelVisa')

    return (
        <div className="sp1" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 m-auto">
                        <div className="heading2 space-margin60">
                            <h2 data-aos="fade-up" data-aos-duration={800}>{t('transportationTitle')}</h2>
                        </div>

                        <div data-aos="fade-up" data-aos-duration={1000}>
                            {/* BTS */}
                            <div className="pricing-boxarea" style={{ marginBottom: '20px', borderLeft: '4px solid #9dc93e' }}>
                                <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                    <i className="fa-solid fa-train" style={{ marginRight: '10px', color: '#9dc93e' }} />
                                    {t('btsTitle')}
                                </h5>
                                <p style={{ margin: 0, lineHeight: '1.8', color: '#333' }}>
                                    {t('btsDesc')}
                                </p>
                            </div>

                            {/* MRT */}
                            <div className="pricing-boxarea" style={{ marginBottom: '20px', borderLeft: '4px solid #1565c0' }}>
                                <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                    <i className="fa-solid fa-train-subway" style={{ marginRight: '10px', color: '#1565c0' }} />
                                    {t('mrtTitle')}
                                </h5>
                                <p style={{ margin: 0, lineHeight: '1.8', color: '#333' }}>
                                    {t('mrtDesc')}
                                </p>
                            </div>

                            {/* ARL */}
                            <div className="pricing-boxarea" style={{ marginBottom: '20px', borderLeft: '4px solid #e74c3c' }}>
                                <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                    <i className="fa-solid fa-plane-departure" style={{ marginRight: '10px', color: '#e74c3c' }} />
                                    {t('arlTitle')}
                                </h5>
                                <p style={{ margin: 0, lineHeight: '1.8', color: '#333' }}>
                                    {t('arlDesc')}
                                </p>
                            </div>

                            {/* Taxi */}
                            <div className="pricing-boxarea" style={{ marginBottom: '30px', borderLeft: '4px solid #FFBA00' }}>
                                <h5 style={{ color: '#1a237e', marginBottom: '15px' }}>
                                    <i className="fa-solid fa-taxi" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                    {t('taxiTitle')}
                                </h5>
                                <p style={{ margin: 0, lineHeight: '1.8', color: '#333' }}>
                                    {t('taxiDesc')}
                                </p>
                            </div>

                            {/* Interchange Stations Table */}
                            <div className="pricing-boxarea" style={{ marginBottom: '30px', padding: 0, overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#1a237e', color: 'white' }}>
                                            <th style={{ padding: '15px 20px', textAlign: 'left', fontWeight: '600' }}>MRT Subway</th>
                                            <th style={{ padding: '15px 20px', textAlign: 'left', fontWeight: '600' }}>BTS Sky Train</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {interchangeStations.map((station, index) => (
                                            <tr key={index} style={{ borderBottom: '1px solid #e0e0e0', backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                                                <td style={{ padding: '12px 20px', color: '#1565c0' }}>{station.mrt}</td>
                                                <td style={{ padding: '12px 20px', color: '#2e7d32' }}>{station.bts}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Train Map */}
                            <div className="pricing-boxarea" style={{ textAlign: 'center' }}>
                                <h5 style={{ color: '#1a237e', marginBottom: '20px' }}>
                                    <i className="fa-solid fa-map" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                    Bangkok Train Map
                                </h5>
                                <img
                                    src="/assets/img/BKK-train-map-01.png"
                                    alt="Bangkok BTS and MRT Train Map"
                                    style={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
