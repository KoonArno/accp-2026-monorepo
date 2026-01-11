'use client'
import { useTranslations } from 'next-intl';
import { sponsorLogos } from '@/data/sponsorshipData';

export default function SponsorsList() {
    const t = useTranslations('sponsorship');
    const tCommon = useTranslations('common');

    return (
        <div className="brands1-section-area sp2">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 m-auto">
                        <div className="brand-header heading2 space-margin60 text-center">
                            <h5 data-aos="fade-left" data-aos-duration={800}>{tCommon('sponsorship')}</h5>
                            <div className="space16" />
                            <h2 className="text-anime-style-3">{t('currentSponsors')}</h2>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="row justify-content-center">
                            {sponsorLogos.map((sponsor, index) => (
                                <div
                                    key={index}
                                    className="col-lg-3 col-md-4 col-6 mb-4"
                                    data-aos="zoom-in"
                                    data-aos-duration={800 + (index * 100)}
                                >
                                    <div
                                        className="brand-box"
                                        style={{
                                            padding: '30px 40px',
                                            minHeight: '120px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <img
                                            src={sponsor.logo}
                                            alt={sponsor.name}
                                            style={{
                                                maxWidth: '100%',
                                                height: 'auto',
                                                maxHeight: '80px'
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
