'use client'
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import UserProfileDropdown from './header/UserProfileDropdown';

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: any) {
    const [isAccordion, setIsAccordion] = useState<number | null>(null)
    const t = useTranslations('common');
    const tContact = useTranslations('contact');
    const locale = useLocale();
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();

    // Function to get the path without locale prefix
    const getPathWithoutLocale = () => {
        const segments = pathname.split('/');
        return '/' + segments.slice(2).join('/') || '/';
    }

    const handleAccordion = (key: number) => {
        setIsAccordion(prevState => prevState === key ? null : key)
    }

    return (
        <>
            <div className={`mobile-sidebar mobile-sidebar1 ${isMobileMenu ? 'mobile-menu-active' : ''}`}>
                <div className="logosicon-area">
                    <div className="logos">
                        <img src="/assets/img/logo/accp_logo_main.png" alt="ACCP 2026" style={{ height: '140px', width: 'auto', background: 'white', padding: '8px', borderRadius: '8px' }} />
                    </div>
                    <div className="menu-close" onClick={handleMobileMenu}>
                        <i className="fa-solid fa-xmark" />
                    </div>
                </div>
                <div className="mobile-nav mobile-nav1">
                    <ul className="mobile-nav-list nav-list1">
                        <li className="hash-has-sub"><Link href={`/${locale}`} className="hash-nav">{t('home')}</Link></li>
                        <li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 1 ? "submenu-opened" : ""}`} onClick={() => handleAccordion(1)}><em /></span>
                            <Link href={`/${locale}/about`} className="hash-nav">{t('aboutACCP')}</Link>
                            <ul className={`sub-menu ${isAccordion == 1 ? "open-sub" : ""}`} style={{ display: `${isAccordion == 1 ? "block" : "none"}` }}>
                                <li className="hash-has-sub"><Link href={`/${locale}/about`} className="hash-nav">{t('aboutACCP')}</Link></li>
                                <li className="hash-has-sub"><Link href={`/${locale}/welcome-messages`} className="hash-nav">{t('welcomeMessages')}</Link></li>
                            </ul>
                        </li>
                        <li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 2 ? "submenu-opened" : ""}`} onClick={() => handleAccordion(2)}><em /></span>
                            <Link href={`/${locale}/program`} className="hash-nav">{t('program')}</Link>
                            <ul className={`sub-menu ${isAccordion == 2 ? "open-sub" : ""}`} style={{ display: `${isAccordion == 2 ? "block" : "none"}` }}>
                                <li className="hash-has-sub"><Link href={`/${locale}/program`} className="hash-nav">{t('programOverview')}</Link></li>
                                <li className="hash-has-sub"><Link href={`/${locale}/program-plenary`} className="hash-nav">{t('plenaryKeynotes')}</Link></li>
                                <li className="hash-has-sub"><Link href={`/${locale}/program-symposia`} className="hash-nav">{t('symposia')}</Link></li>
                                <li className="hash-has-sub"><Link href={`/${locale}/program-oral-poster`} className="hash-nav">{t('oralPoster')}</Link></li>
                                <li className="hash-has-sub"><Link href={`/${locale}/gala-dinner`} className="hash-nav">{t('galaDinner')}</Link></li>
                                <li className="hash-has-sub"><Link href={`/${locale}/preconference-workshops`} className="hash-nav">{t('workshops')}</Link></li>
                            </ul>
                        </li>
                        <li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 3 ? "submenu-opened" : ""}`} onClick={() => handleAccordion(3)}><em /></span>
                            <Link href={`/${locale}/call-for-abstracts`} className="hash-nav">{t('callForAbstracts')}</Link>
                            <ul className={`sub-menu ${isAccordion == 3 ? "open-sub" : ""}`} style={{ display: `${isAccordion == 3 ? "block" : "none"}` }}>
                                <li className="hash-has-sub"><Link href={`/${locale}/abstract-submission-guideline`} className="hash-nav">{t('abstractGuideline')}</Link></li>
                                <li className="hash-has-sub"><Link href={`/${locale}/call-for-abstracts`} className="hash-nav">{t('callForAbstracts')}</Link></li>
                            </ul>
                        </li>
                        <li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 4 ? "submenu-opened" : ""}`} onClick={() => handleAccordion(4)}><em /></span>
                            <Link href={`/${locale}/registration`} className="hash-nav">{t('registration')}</Link>
                            <ul className={`sub-menu ${isAccordion == 4 ? "open-sub" : ""}`} style={{ display: `${isAccordion == 4 ? "block" : "none"}` }}>
                                <li className="hash-has-sub"><Link href={`/${locale}/registration`} className="hash-nav">{t('registrationInfo')}</Link></li>
                                <li className="hash-has-sub"><Link href={`/${locale}/registration-policies`} className="hash-nav">{t('policies')}</Link></li>
                            </ul>
                        </li>
                        <li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 5 ? "submenu-opened" : ""}`} onClick={() => handleAccordion(5)}><em /></span>
                            <Link href={`/${locale}/accommodation`} className="hash-nav">{t('travelAccommodation')}</Link>
                            <ul className={`sub-menu ${isAccordion == 5 ? "open-sub" : ""}`} style={{ display: `${isAccordion == 5 ? "block" : "none"}` }}>
                                <li className="hash-has-sub"><Link href={`/${locale}/accommodation`} className="hash-nav">{t('hotelsRates')}</Link></li>
                                <li className="hash-has-sub"><Link href={`/${locale}/travel-visa`} className="hash-nav">{t('travelVisa')}</Link></li>
                            </ul>
                        </li>
                        <li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 6 ? "submenu-opened" : ""}`} onClick={() => handleAccordion(6)}><em /></span>
                            <Link href={`/${locale}/sponsorship`} className="hash-nav">{t('sponsorship')} & {t('gallery')}</Link>
                            <ul className={`sub-menu ${isAccordion == 6 ? "open-sub" : ""}`} style={{ display: `${isAccordion == 6 ? "block" : "none"}` }}>
                                <li className="hash-has-sub"><Link href={`/${locale}/sponsorship`} className="hash-nav">{t('sponsorship')}</Link></li>
                                <li className="hash-has-sub"><Link href={`/${locale}/gallery`} className="hash-nav">{t('gallery')}</Link></li>
                            </ul>
                        </li>

                    </ul>

                    <div className="allmobilesection">
                        {/* Language Switcher */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '4px',
                            padding: '10px 0',
                            marginBottom: '20px',
                            position: 'relative',
                            zIndex: 10
                        }}>
                            <Link
                                href={`/th${getPathWithoutLocale()}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '44px',
                                    height: '44px',
                                    background: locale === 'th' ? '#FFBA00' : '#E0E0E0',
                                    color: locale === 'th' ? '#fff' : '#000',
                                    textDecoration: 'none',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    transition: 'all 0.3s ease',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                TH
                            </Link>
                            <Link
                                href={`/en${getPathWithoutLocale()}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '44px',
                                    height: '44px',
                                    background: locale === 'en' ? '#FFBA00' : '#E0E0E0',
                                    color: locale === 'en' ? '#fff' : '#000',
                                    textDecoration: 'none',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    transition: 'all 0.3s ease',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                EN
                            </Link>
                        </div>

                        {isAuthenticated ? (
                            <div style={{ padding: '20px 0' }}>
                                <UserProfileDropdown />
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                                <Link href={`/${locale}/login`} className="vl-btn1" style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    background: 'transparent',
                                    border: '2px solid #FFBA00',
                                    color: '#FFBA00'
                                }}>{t('login')}</Link>
                                <Link href={`/${locale}/signup`} className="vl-btn1" style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    background: 'linear-gradient(135deg, #00C853 0%, #69F0AE 100%)',
                                    border: 'none',
                                    color: '#fff'
                                }}>{t('signUp')}</Link>
                            </div>
                        )}
                        <div className="single-footer">
                            <h3>{tContact('contactInfo')}</h3>
                            <div className="footer1-contact-info">
                                <div className="contact-info-single">
                                    <div className="contact-info-icon">
                                        <span><i className="fa-solid fa-envelope" /></span>
                                    </div>
                                    <div className="contact-info-text">
                                        <Link href="mailto:accpbangkok2026@gmail.com">accpbangkok2026@gmail.com</Link>
                                    </div>
                                </div>
                                <div className="single-footer">
                                    <h3>{tContact('venue')}</h3>
                                    <div className="contact-info-single">
                                        <div className="contact-info-icon">
                                            <span><i className="fa-solid fa-location-dot" /></span>
                                        </div>
                                        <div className="contact-info-text">
                                            <Link href="/#">Centara Grand & Bangkok <br />
                                                Convention Centre, CentralWorld</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-footer">
                                    <h3>{t('followUs')}</h3>
                                    <div className="social-links-mobile-menu" style={{ marginTop: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                            <i className="fa-brands fa-facebook" style={{ fontSize: '20px', color: '#1877F2' }} />
                                            <Link href="https://www.facebook.com/accpbangkok2026" target="_blank" style={{ color: '#333', fontSize: '16px', fontWeight: '500' }}>
                                                accpbangkok2026
                                            </Link>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <i className="fa-brands fa-instagram" style={{ fontSize: '20px', color: '#E4405F' }} />
                                            <Link href="https://www.instagram.com/accpbangkok2026" target="_blank" style={{ color: '#333', fontSize: '16px', fontWeight: '500' }}>
                                                accpbangkok2026
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
