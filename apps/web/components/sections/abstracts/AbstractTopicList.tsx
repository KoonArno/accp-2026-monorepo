'use client'

import { useTranslations } from 'next-intl';

export default function AbstractTopicList() {
    const t = useTranslations('callForAbstracts');
    const tCategories = useTranslations('abstractSubmission.categories');

    const topicsKey = [
        "clinicalPharmacy",
        "socialAdministrative",
        "pharmaceuticalSciences",
        "pharmacology",
        "education",
        "digitalPharmacy"
    ];

    return (
        <div className="sp1" style={{ backgroundColor: '#fff', paddingBottom: '80px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        <div className="heading2 mb-4">
                            <h2 style={{ color: '#27313b', textTransform: 'uppercase', marginBottom: '20px', fontSize: '30px', fontWeight: '800' }}>{t('pageTitle')}</h2>
                            <p style={{ fontSize: '18px', color: '#555', marginBottom: '30px', lineHeight: '1.6' }}>
                                {t('invitation')}
                            </p>
                        </div>

                        <div className="topic-list-area">
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {topicsKey.map((key, index) => (
                                    <li key={index} style={{
                                        padding: '12px 15px',
                                        marginBottom: '10px',
                                        fontSize: '16px',
                                        color: '#333',
                                        backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
                                        borderRadius: '6px',
                                        borderLeft: '4px solid #FFBA00'
                                    }}>
                                        <span style={{ fontWeight: 'bold', marginRight: '10px', color: '#1a237e' }}>{index + 1}.</span> {tCategories(key)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
