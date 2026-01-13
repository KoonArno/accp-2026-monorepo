'use client'
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import UserProfileDropdown from './UserProfileDropdown';
import {
    HEADER_COLORS,
    getLanguageButtonStyle,
    languageSwitcherContainerStyle,
    getMenuLinkColor,
    getMenuLinkWeight,
    authButtonStyles
} from './headerStyles';

export default function Header1({ scroll, isMobileMenu, handleMobileMenu, isSearch, handleSearch, headerBgWhite }: any) {
    const t = useTranslations('common');
    const locale = useLocale();
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // Function to get the path without locale prefix
    const getPathWithoutLocale = () => {
        const segments = pathname.split('/');
        return '/' + segments.slice(2).join('/') || '/';
    }

    // Function to switch locale
    const switchLocale = (newLocale: string) => {
        const pathWithoutLocale = getPathWithoutLocale();
        return `/${newLocale}${pathWithoutLocale}`;
    }

    // Function to check if link is active
    const isActive = (path: string) => {
        if (path === `/${locale}` || path === `/${locale}/`) {
            return pathname === `/${locale}` || pathname === `/${locale}/`;
        }
        return pathname.startsWith(path);
    }

    // Toggle dropdown function
    const toggleDropdown = (menuName: string, e: React.MouseEvent) => {
        e.preventDefault();
        setOpenDropdown(openDropdown === menuName ? null : menuName);
    }

    // Dropdown styles - completely override CSS hover
    const getDropdownStyle = (menuName: string): React.CSSProperties => {
        const isOpen = openDropdown === menuName;
        return {
            visibility: isOpen ? 'visible' : 'hidden',
            opacity: isOpen ? 1 : 0,
            position: 'absolute',
            top: isOpen ? '50px' : '100px',
            zIndex: 9,
            transition: 'all 0.3s ease-in-out',
            pointerEvents: isOpen ? 'auto' : 'none',
        };
    };

    return (
        <>
            {/* Override CSS hover for dropdown - click only behavior */}
            <style jsx global>{`
                .header-area.homepage1 .main-menu ul > li:hover > ul.dropdown-padding {
                    visibility: hidden !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                }
                .header-area.homepage1 .main-menu ul > li.dropdown-open > ul.dropdown-padding {
                    visibility: visible !important;
                    opacity: 1 !important;
                    pointer-events: auto !important;
                    top: 50px !important;
                    z-index: 9 !important;
                }
            `}</style>
            <header>
                <div className={`header-area homepage1 header header-sticky d-none d-lg-block ${scroll ? 'sticky' : ''}`} id="header" style={headerBgWhite ? { background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' } : {}}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="header-elements">
                                    <div className="site-logo">
                                        <Link href={`/${locale}`}>
                                            <img
                                                src="/assets/img/logo/ACCP-BANGKOK-2026-04.png"
                                                alt="ACCP 2026"
                                                style={{ height: '55px', width: 'auto', marginLeft: '20px' }}
                                            />
                                        </Link>
                                    </div>

                                    <div className="main-menu">
                                        <ul>
                                            <li><Link href={`/${locale}`} style={{ color: isActive(`/${locale}`) ? '#FFBA00' : headerBgWhite ? '#333' : '#fff', fontWeight: isActive(`/${locale}`) ? '600' : 'normal' }}>{t('home')}</Link></li>
                                            <li className={openDropdown === 'about' ? 'dropdown-open' : ''}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => toggleDropdown('about', e)}
                                                    style={{ color: isActive(`/${locale}/about`) || isActive(`/${locale}/welcome-messages`) || openDropdown === 'about' ? '#FFBA00' : headerBgWhite ? '#333' : '#fff', fontWeight: isActive(`/${locale}/about`) || isActive(`/${locale}/welcome-messages`) ? '600' : 'normal', cursor: 'pointer' }}
                                                >
                                                    {t('about')} <i className={`fa-solid ${openDropdown === 'about' ? 'fa-angle-up' : 'fa-angle-down'}`} />
                                                </a>
                                                <ul className="dropdown-padding" style={getDropdownStyle('about')}>
                                                    <li><Link href={`/${locale}/about`}>{t('aboutACCP')}</Link></li>
                                                    <li><Link href={`/${locale}/welcome-messages`}>{t('welcomeMessages')}</Link></li>
                                                </ul>
                                            </li>
                                            <li className={openDropdown === 'program' ? 'dropdown-open' : ''}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => toggleDropdown('program', e)}
                                                    style={{ color: isActive(`/${locale}/program`) || isActive(`/${locale}/gala-dinner`) || isActive(`/${locale}/preconference-workshops`) || openDropdown === 'program' ? '#FFBA00' : headerBgWhite ? '#333' : '#fff', fontWeight: isActive(`/${locale}/program`) || isActive(`/${locale}/gala-dinner`) || isActive(`/${locale}/preconference-workshops`) ? '600' : 'normal', cursor: 'pointer' }}
                                                >
                                                    {t('program')} <i className={`fa-solid ${openDropdown === 'program' ? 'fa-angle-up' : 'fa-angle-down'}`} />
                                                </a>
                                                <ul className="dropdown-padding" style={getDropdownStyle('program')}>
                                                    <li><Link href={`/${locale}/program`}>{t('programOverview')}</Link></li>
                                                    <li><Link href={`/${locale}/program-plenary`}>{t('plenaryKeynotes')}</Link></li>
                                                    <li><Link href={`/${locale}/program-symposia`}>{t('symposia')}</Link></li>
                                                    <li><Link href={`/${locale}/program-oral-poster`}>{t('oralPoster')}</Link></li>
                                                    <li><Link href={`/${locale}/gala-dinner`}>{t('galaDinner')}</Link></li>
                                                    <li><Link href={`/${locale}/preconference-workshops`}>{t('workshops')}</Link></li>
                                                </ul>
                                            </li>
                                            <li className={openDropdown === 'abstracts' ? 'dropdown-open' : ''}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => toggleDropdown('abstracts', e)}
                                                    style={{ color: isActive(`/${locale}/call-for-abstracts`) || isActive(`/${locale}/abstract-submission-guideline`) || openDropdown === 'abstracts' ? '#FFBA00' : headerBgWhite ? '#333' : '#fff', fontWeight: isActive(`/${locale}/call-for-abstracts`) || isActive(`/${locale}/abstract-submission-guideline`) ? '600' : 'normal', cursor: 'pointer' }}
                                                >
                                                    {t('callForAbstracts')} <i className={`fa-solid ${openDropdown === 'abstracts' ? 'fa-angle-up' : 'fa-angle-down'}`} />
                                                </a>
                                                <ul className="dropdown-padding" style={getDropdownStyle('abstracts')}>
                                                    <li><Link href={`/${locale}/abstract-submission-guideline`}>{t('abstractGuideline')}</Link></li>
                                                    <li><Link href={`/${locale}/call-for-abstracts`}>{t('callForAbstracts')}</Link></li>
                                                </ul>
                                            </li>
                                            <li className={openDropdown === 'registration' ? 'dropdown-open' : ''}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => toggleDropdown('registration', e)}
                                                    style={{ color: isActive(`/${locale}/registration`) || openDropdown === 'registration' ? '#FFBA00' : headerBgWhite ? '#333' : '#fff', fontWeight: isActive(`/${locale}/registration`) ? '600' : 'normal', cursor: 'pointer' }}
                                                >
                                                    {t('registration')} <i className={`fa-solid ${openDropdown === 'registration' ? 'fa-angle-up' : 'fa-angle-down'}`} />
                                                </a>
                                                <ul className="dropdown-padding" style={getDropdownStyle('registration')}>
                                                    <li><Link href={`/${locale}/registration`}>{t('registrationInfo')}</Link></li>
                                                    <li><Link href={`/${locale}/registration-policies`}>{t('policies')}</Link></li>
                                                </ul>
                                            </li>
                                            <li className={openDropdown === 'travel' ? 'dropdown-open' : ''}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => toggleDropdown('travel', e)}
                                                    style={{ color: isActive(`/${locale}/accommodation`) || isActive(`/${locale}/travel-visa`) || openDropdown === 'travel' ? '#FFBA00' : headerBgWhite ? '#333' : '#fff', fontWeight: isActive(`/${locale}/accommodation`) || isActive(`/${locale}/travel-visa`) ? '600' : 'normal', cursor: 'pointer' }}
                                                >
                                                    {t('travelAccommodation')} <i className={`fa-solid ${openDropdown === 'travel' ? 'fa-angle-up' : 'fa-angle-down'}`} />
                                                </a>
                                                <ul className="dropdown-padding" style={getDropdownStyle('travel')}>
                                                    <li><Link href={`/${locale}/accommodation`}>{t('hotelsRates')}</Link></li>
                                                    <li><Link href={`/${locale}/travel-visa`}>{t('travelVisa')}</Link></li>
                                                </ul>
                                            </li>
                                            <li className={openDropdown === 'more' ? 'dropdown-open' : ''}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => toggleDropdown('more', e)}
                                                    style={{ color: isActive(`/${locale}/sponsorship`) || isActive(`/${locale}/gallery`) || isActive(`/${locale}/contact`) || openDropdown === 'more' ? '#FFBA00' : headerBgWhite ? '#333' : '#fff', fontWeight: isActive(`/${locale}/sponsorship`) || isActive(`/${locale}/gallery`) || isActive(`/${locale}/contact`) ? '600' : 'normal', cursor: 'pointer' }}
                                                >
                                                    {t('more')} <i className={`fa-solid ${openDropdown === 'more' ? 'fa-angle-up' : 'fa-angle-down'}`} />
                                                </a>
                                                <ul className="dropdown-padding" style={getDropdownStyle('more')}>
                                                    <li><Link href={`/${locale}/sponsorship`}>{t('sponsorship')}</Link></li>
                                                    <li><Link href={`/${locale}/gallery`}>{t('gallery')}</Link></li>
                                                    <li><Link href={`/${locale}/contact`}>{t('contact')}</Link></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="btn-area" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        {/* Language Switcher */}
                                        <div className="d-none d-lg-flex" style={languageSwitcherContainerStyle}>
                                            <Link
                                                href={`/th${getPathWithoutLocale()}`}
                                                style={getLanguageButtonStyle(locale === 'th', headerBgWhite)}
                                            >
                                                TH
                                            </Link>
                                            <Link
                                                href={`/en${getPathWithoutLocale()}`}
                                                style={getLanguageButtonStyle(locale === 'en', headerBgWhite)}
                                            >
                                                EN
                                            </Link>
                                        </div>

                                        {isAuthenticated ? (
                                            <UserProfileDropdown />
                                        ) : (
                                            <>
                                                <Link href={`/${locale}/login`} className="vl-btn1" style={authButtonStyles.login}>
                                                    <i className="fa-solid fa-right-to-bracket" style={{ marginRight: '6px' }} />
                                                    {t('login')}
                                                </Link>
                                                <Link href={`/${locale}/signup`} className="vl-btn1" style={authButtonStyles.signup}>
                                                    <i className="fa-solid fa-user-plus" style={{ marginRight: '6px' }} />
                                                    {t('signUp')}
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Header - Outside of header tag for proper fixed positioning */}
            <div className="mobile-header mobile-haeder1 d-block d-lg-none">
                <div className="container-fluid">
                    <div className="col-12">
                        <div className="mobile-header-elements">
                            <div className="mobile-logo">
                                <Link href={`/${locale}`}>
                                    <img src="/assets/img/logo/ACCP-BANGKOK-2026-04.png" alt="ACCP 2026" style={{ height: '60px', width: 'auto' }} />
                                </Link>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div className="mobile-nav-icon dots-menu" onClick={handleMobileMenu}>
                                    <i className="fa-solid fa-bars" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
