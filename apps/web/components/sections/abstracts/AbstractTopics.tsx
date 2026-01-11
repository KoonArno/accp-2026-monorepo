'use client'
import { useTranslations } from 'next-intl'
import { abstractTopics } from "@/data/abstractData"

export default function AbstractTopics() {
    const t = useTranslations('callForAbstracts')

    return (
        <div className="about1-section-area sp1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        <div className="about-header-area heading2">
                            <p data-aos="fade-up" data-aos-duration={800} style={{ fontSize: '18px', lineHeight: '1.8', color: '#333', marginBottom: '30px' }}>
                                {t('invitation')}
                            </p>

                            <ul data-aos="fade-up" data-aos-duration={1000} style={{ listStyle: 'none', padding: 0 }}>
                                {abstractTopics.map((topic, index) => (
                                    <li key={index} style={{
                                        padding: '15px 20px',
                                        marginBottom: '10px',
                                        backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#fff',
                                        borderLeft: '4px solid #FFBA00',
                                        borderRadius: '0 8px 8px 0',
                                        fontSize: '16px',
                                        color: '#333',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <strong>{topic.title}</strong>
                                        {topic.subtopics && topic.subtopics.length > 0 && (
                                            <ul style={{ marginTop: '8px', marginLeft: '20px', fontSize: '14px', color: '#666' }}>
                                                {topic.subtopics.map((subtopic, subIndex) => (
                                                    <li key={subIndex}>{subtopic}</li>
                                                ))}
                                            </ul>
                                        )}
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
