'use client'
import Link from "next/link"
import { useTranslations } from 'next-intl';
import { plenarySpeakers } from '@/data/plenaryData';

export default function PlenarySpeakers() {
    const t = useTranslations('plenary');

    return (
        <div className="team1-section-area sp2" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container">
                <div className="row">
                    {plenarySpeakers.map((speaker, index) => (
                        <div className="col-lg-4 col-md-6" key={index} data-aos="fade-up" data-aos-duration={800} data-aos-delay={index * 100}>
                            <div className="team1-boxarea">
                                <div className="img1">
                                    <div className="speaker-img-placeholder">
                                        <i className="fa-solid fa-user speaker-placeholder-icon" />
                                    </div>
                                    <div className="session-badge">
                                        {speaker.session}
                                    </div>
                                </div>
                                <div className="content-area">
                                    <Link href="#">{speaker.name}</Link>
                                    <p className="speaker-role">{speaker.role}</p>
                                    <p className="speaker-aff">{speaker.affiliation}</p>
                                    <div className="speaker-topic-box">
                                        <p className="speaker-topic">
                                            <i className="fa-solid fa-quote-left" />
                                            {speaker.topic}
                                        </p>
                                        <div className="speaker-meta">
                                            <span><i className="fa-regular fa-calendar" />{speaker.day}</span>
                                            <span><i className="fa-regular fa-clock" />{speaker.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
