'use client'
import { useTranslations } from 'next-intl';
import React from 'react';

const welcomeStyles = {
    section: {
        background: '#f8f9fa',
        padding: '80px 0'
    },
    title: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#1a237e',
        textTransform: 'uppercase' as const,
        letterSpacing: '2px'
    },
    card: {
        background: '#ffffff',
        borderRadius: '20px',
        padding: '40px 30px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
        textAlign: 'center' as const,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer'
    },
    cardName: {
        fontSize: '18px',
        fontWeight: '700',
        color: '#1a237e',
        marginBottom: '24px',
        minHeight: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        overflow: 'hidden',
        margin: '0 auto 24px',
        border: '4px solid #e8e8e8',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover' as const
    },
    roleTitle: {
        fontSize: '16px',
        fontWeight: '600',
        fontStyle: 'italic' as const,
        color: '#000000',
        marginBottom: '8px'
    },
    rolePosition: {
        fontSize: '14px',
        color: '#000000',
        margin: 0
    }
} as const;

export default function WelcomeSection() {
    const t = useTranslations();

    const organizers = [
        {
            name: "Prof. Dr. Somchai Sawangjaroen",
            nameTh: "ศ.ดร.สมชาย สว่างเจริญ",
            titleKey: 'welcome.conferenceChair',
            position: "Faculty of Pharmacy, Chulalongkorn University",
            positionTh: "คณะเภสัชศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
            image: "/assets/img/all-images/team/team-img1.png"
        },
        {
            name: "Assoc. Prof. Dr. Patcharee Sriworakun",
            nameTh: "รศ.ดร.พัชรี ศรีวรกุล",
            titleKey: 'welcome.scientificChair',
            position: "Faculty of Pharmacy, Mahidol University",
            positionTh: "คณะเภสัชศาสตร์ มหาวิทยาลัยมหิดล",
            image: "/assets/img/all-images/team/team-img2.png"
        },
        {
            name: "Dr. Nattawut Leelarungrayub",
            nameTh: "ดร.ณัฐวุฒิ ลีลารุ่งเรือง",
            titleKey: 'welcome.organizingChair',
            position: "Pharmacy Council of Thailand",
            positionTh: "สภาเภสัชกรรม",
            image: "/assets/img/all-images/team/team-img3.png"
        }
    ];

    return (
        <div className="welcome-section-area sp1" style={welcomeStyles.section}>
            <div className="container">
                {/* Header */}
                <div className="text-center mb-5">
                    <h2 style={welcomeStyles.title} data-aos="fade-up">{t('welcome.title')}</h2>
                </div>

                {/* Profile Cards */}
                <div className="row justify-content-center g-4">
                    {organizers.map((person, index) => (
                        <div key={index} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={index * 100}>
                            <div style={welcomeStyles.card}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.08)';
                                }}>
                                {/* Name */}
                                <h4 style={welcomeStyles.cardName}>{person.name}</h4>

                                {/* Photo */}
                                <div style={welcomeStyles.imageContainer}>
                                    <img
                                        src={person.image}
                                        alt={person.name}
                                        style={welcomeStyles.image}
                                    />
                                </div>

                                {/* Title & Position */}
                                <p style={welcomeStyles.roleTitle}>{t(person.titleKey)}</p>
                                <p style={welcomeStyles.rolePosition}>{person.position}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
