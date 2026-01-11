import Link from 'next/link'

interface HotelProps {
    name: string;
    stars: number;
    type: string;
    distance: string;
    priceRange: string;
    features: string[];
    image: string;
    bookingLink: string;
    special: boolean;
}

export default function HotelCard({ hotel }: { hotel: HotelProps }) {
    return (
        <div className="row" style={{ marginBottom: '30px' }} data-aos="fade-up" data-aos-duration={800}>
            <div className="col-12">
                <div className="pricing-boxarea" style={{
                    padding: 0,
                    overflow: 'hidden',
                    border: hotel.special ? '3px solid #FFBA00' : 'none'
                }}>
                    {hotel.special && (
                        <div style={{
                            background: 'linear-gradient(135deg, #FFBA00 0%, #FFD54F 100%)',
                            color: '#1a237e',
                            padding: '8px 20px',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            textAlign: 'center'
                        }}>
                            <i className="fa-solid fa-star" style={{ marginRight: '8px' }} />
                            OFFICIAL CONFERENCE HOTEL - Special Rate Available
                        </div>
                    )}
                    <div className="row align-items-center" style={{ padding: '25px' }}>
                        <div className="col-md-3">
                            <div style={{
                                backgroundColor: '#e0e0e0',
                                borderRadius: '12px',
                                height: '150px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#999'
                            }}>
                                <i className="fa-solid fa-hotel" style={{ fontSize: '48px' }} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div style={{ marginBottom: '10px' }}>
                                {[...Array(hotel.stars)].map((_, i) => (
                                    <i key={i} className="fa-solid fa-star" style={{ color: '#FFBA00', marginRight: '3px', fontSize: '14px' }} />
                                ))}
                                <span style={{
                                    marginLeft: '10px',
                                    backgroundColor: hotel.special ? '#FFBA00' : '#e0e0e0',
                                    color: hotel.special ? '#1a237e' : '#666',
                                    padding: '3px 12px',
                                    borderRadius: '15px',
                                    fontSize: '12px',
                                    fontWeight: '600'
                                }}>{hotel.type}</span>
                            </div>
                            <h4 style={{ marginBottom: '10px', color: '#1a237e' }}>{hotel.name}</h4>
                            <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>
                                <i className="fa-solid fa-location-dot" style={{ marginRight: '8px', color: '#FFBA00' }} />
                                {hotel.distance} from venue
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {hotel.features.map((feature, fi) => (
                                    <span key={fi} style={{
                                        backgroundColor: '#f0f0f0',
                                        padding: '5px 12px',
                                        borderRadius: '15px',
                                        fontSize: '12px',
                                        color: '#555'
                                    }}>
                                        <i className="fa-solid fa-check" style={{ marginRight: '5px', color: '#10B981', fontSize: '10px' }} />
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-3 text-center">
                            <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '13px' }}>Starting from</p>
                            <p style={{ margin: '0 0 15px 0', fontWeight: 'bold', fontSize: '18px', color: '#1a237e' }}>{hotel.priceRange}</p>
                            <Link href={hotel.bookingLink} className="vl-btn1" style={{
                                backgroundColor: hotel.special ? '#FFBA00' : '#1a237e',
                                color: hotel.special ? '#1a237e' : 'white',
                                padding: '12px 25px',
                                fontSize: '14px',
                                display: 'inline-block'
                            }}>
                                Book Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
