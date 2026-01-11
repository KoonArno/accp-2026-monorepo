import { welcomeMessages } from "@/data/welcomeData"

export default function WelcomeMessageList() {
    return (
        <div className="service1-section-area sp1" style={{ background: '#f8f9fa' }}>
            <div className="container">
                {welcomeMessages.map((person, index) => (
                    <div key={person.id} className="row align-items-center" style={{
                        marginBottom: '60px',
                        background: '#fff',
                        borderRadius: '20px',
                        padding: '40px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
                    }}>
                        {/* Alternate layout */}
                        {index % 2 === 0 ? (
                            <>
                                {/* Image on left */}
                                <div className="col-lg-4 text-center" style={{ marginBottom: '30px' }}>
                                    <div style={{
                                        position: 'relative',
                                        display: 'inline-block'
                                    }}>
                                        <div style={{
                                            width: '200px',
                                            height: '200px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
                                            padding: '5px',
                                            margin: '0 auto'
                                        }}>
                                            <img
                                                src={person.image}
                                                alt={person.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                    background: '#fff'
                                                }}
                                            />
                                        </div>
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '10px',
                                            right: '10px',
                                            background: '#ffc107',
                                            color: '#1a237e',
                                            padding: '8px 16px',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600',
                                            boxShadow: '0 4px 15px rgba(255,193,7,0.4)'
                                        }}>
                                            {person.role}
                                        </div>
                                    </div>
                                    <div className="space20" />
                                    <h4 style={{ color: '#1a237e', marginBottom: '5px' }}>{person.name}</h4>
                                    <p style={{ color: '#666', fontSize: '0.95rem' }}>{person.title}</p>
                                </div>
                                {/* Message on right */}
                                <div className="col-lg-8">
                                    <div style={{
                                        position: 'relative',
                                        paddingLeft: '30px'
                                    }}>
                                        <i className="fa-solid fa-quote-left" style={{
                                            position: 'absolute',
                                            left: '0',
                                            top: '0',
                                            fontSize: '2rem',
                                            color: '#ffc107',
                                            opacity: 0.5
                                        }} />
                                        {person.message.split('\n\n').map((paragraph, pIndex) => (
                                            <p key={pIndex} style={{
                                                color: '#444',
                                                lineHeight: '1.8',
                                                marginBottom: '15px',
                                                fontSize: '1rem'
                                            }}>
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Message on left */}
                                <div className="col-lg-8 order-lg-1 order-2">
                                    <div style={{
                                        position: 'relative',
                                        paddingRight: '30px'
                                    }}>
                                        <i className="fa-solid fa-quote-left" style={{
                                            position: 'absolute',
                                            right: '0',
                                            top: '0',
                                            fontSize: '2rem',
                                            color: '#ffc107',
                                            opacity: 0.5
                                        }} />
                                        {person.message.split('\n\n').map((paragraph, pIndex) => (
                                            <p key={pIndex} style={{
                                                color: '#444',
                                                lineHeight: '1.8',
                                                marginBottom: '15px',
                                                fontSize: '1rem'
                                            }}>
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                                {/* Image on right */}
                                <div className="col-lg-4 text-center order-lg-2 order-1" style={{ marginBottom: '30px' }}>
                                    <div style={{
                                        position: 'relative',
                                        display: 'inline-block'
                                    }}>
                                        <div style={{
                                            width: '200px',
                                            height: '200px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
                                            padding: '5px',
                                            margin: '0 auto'
                                        }}>
                                            <img
                                                src={person.image}
                                                alt={person.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                    background: '#fff'
                                                }}
                                            />
                                        </div>
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '10px',
                                            right: '10px',
                                            background: '#ffc107',
                                            color: '#1a237e',
                                            padding: '8px 16px',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600',
                                            boxShadow: '0 4px 15px rgba(255,193,7,0.4)'
                                        }}>
                                            {person.role}
                                        </div>
                                    </div>
                                    <div className="space20" />
                                    <h4 style={{ color: '#1a237e', marginBottom: '5px' }}>{person.name}</h4>
                                    <p style={{ color: '#666', fontSize: '0.95rem' }}>{person.title}</p>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
