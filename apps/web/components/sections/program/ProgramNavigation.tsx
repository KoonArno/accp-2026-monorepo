'use client'
import Link from "next/link"
import { useTranslations } from 'next-intl';

export default function ProgramNavigation() {
    const t = useTranslations('program');
    const tCommon = useTranslations('common');

    const navItems = [
        { href: '/program-plenary', labelKey: 'plenaryKeynotes', icon: 'fa-microphone', color: '#8B5CF6', bgColor: '#EDE9FE', gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)' },
        { href: '/program-symposia', labelKey: 'symposia', icon: 'fa-users', color: '#3B82F6', bgColor: '#DBEAFE', gradient: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)' },
        { href: '/program-oral-poster', labelKey: 'oralPoster', icon: 'fa-image', color: '#10B981', bgColor: '#D1FAE5', gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)' },
        { href: '/preconference-workshops', labelKey: 'workshops', icon: 'fa-chalkboard-user', color: '#F59E0B', bgColor: '#FEF3C7', gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)' },
        { href: '/gala-dinner', labelKey: 'galaDinner', icon: 'fa-champagne-glasses', color: '#6633CC', bgColor: '#EDE4FF', gradient: 'linear-gradient(135deg, #6633CC 0%, #9966FF 100%)' },
    ];

    return (
        <div className="program-nav-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        <div className="heading2 text-center space-margin60">
                            <span className="nav-badge" data-aos="fade-up" data-aos-duration={600}>
                                <i className="fa-solid fa-compass" /> {t('navigation')}
                            </span>
                            <div className="space16" />
                            <h2 className="text-anime-style-3">{t('exploreProgram')}</h2>
                            <div className="space16" />
                            <p className="nav-subtitle" data-aos="fade-up" data-aos-duration={800}>
                                {t('exploreDesc') || 'Discover all the exciting sessions and events'}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row nav-cards-row">
                    {navItems.map((item, index) => (
                        <div 
                            key={item.href}
                            className="col-xl col-lg-4 col-md-6" 
                            data-aos="fade-up" 
                            data-aos-duration={600} 
                            data-aos-delay={index * 80}
                        >
                            <Link href={item.href} className="nav-card-link">
                                <div className="nav-card" style={{ '--card-color': item.color, '--card-gradient': item.gradient } as React.CSSProperties}>
                                    <div className="nav-card-glow" style={{ background: item.gradient }} />
                                    <div className="nav-card-content">
                                        <div className="nav-icon-wrapper" style={{ background: item.bgColor }}>
                                            <i className={`fa-solid ${item.icon}`} style={{ color: item.color }} />
                                        </div>
                                        <h4 className="nav-card-title">{tCommon(item.labelKey)}</h4>
                                        <span className="nav-card-arrow">
                                            <i className="fa-solid fa-arrow-right" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .program-nav-section {
                    padding: 80px 0;
                    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
                    position: relative;
                    overflow: hidden;
                }
                .program-nav-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent 0%, rgba(26, 35, 126, 0.1) 50%, transparent 100%);
                }
                .nav-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
                    color: white;
                    padding: 10px 24px;
                    border-radius: 30px;
                    font-size: 14px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .nav-subtitle {
                    color: #64748b;
                    font-size: 16px;
                    max-width: 500px;
                    margin: 0 auto;
                }
                .nav-cards-row {
                    margin-top: 20px;
                    gap: 20px 0;
                }
                .nav-card-link {
                    text-decoration: none;
                    display: block;
                }
                .nav-card {
                    position: relative;
                    background: white;
                    border-radius: 20px;
                    padding: 30px 24px;
                    text-align: center;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
                    border: 1px solid rgba(0, 0, 0, 0.04);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow: hidden;
                    height: 100%;
                    min-height: 180px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .nav-card-glow {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    opacity: 0;
                    transition: all 0.4s ease;
                }
                .nav-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
                    border-color: var(--card-color);
                }
                .nav-card:hover .nav-card-glow {
                    opacity: 1;
                    height: 5px;
                }
                .nav-card-content {
                    position: relative;
                    z-index: 1;
                }
                .nav-icon-wrapper {
                    width: 70px;
                    height: 70px;
                    border-radius: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 16px;
                    font-size: 28px;
                    transition: all 0.4s ease;
                }
                .nav-card:hover .nav-icon-wrapper {
                    transform: scale(1.1) rotate(-5deg);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                }
                .nav-card-title {
                    font-size: 16px;
                    font-weight: 700;
                    color: #1e293b;
                    margin: 0 0 8px;
                    transition: color 0.3s ease;
                    line-height: 1.3;
                }
                .nav-card:hover .nav-card-title {
                    color: var(--card-color);
                }
                .nav-card-arrow {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: #f1f5f9;
                    color: #94a3b8;
                    font-size: 12px;
                    transition: all 0.4s ease;
                }
                .nav-card:hover .nav-card-arrow {
                    background: var(--card-gradient);
                    color: white;
                    transform: translateX(5px);
                }
                @media (max-width: 1199px) {
                    .nav-cards-row {
                        gap: 24px 0;
                    }
                }
                @media (max-width: 768px) {
                    .program-nav-section {
                        padding: 60px 0;
                    }
                    .nav-card {
                        min-height: 160px;
                        padding: 24px 20px;
                    }
                    .nav-icon-wrapper {
                        width: 60px;
                        height: 60px;
                        font-size: 24px;
                    }
                    .nav-card-title {
                        font-size: 15px;
                    }
                }
            `}</style>
        </div>
    )
}
