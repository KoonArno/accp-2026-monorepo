'use client'
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import Switch from 'react-switch';
import { US, TH } from 'country-flag-icons/react/3x2'

// Cast to any to avoid TypeScript error with React 18 types
const LanguageSwitch = Switch as any;
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
    const router = useRouter();

    const handleLanguageChange = (checked: boolean) => {
        const nextLocale = checked ? 'en' : 'th';
        router.push(switchLocale(nextLocale));
    };
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

    // Unified Dropdown Handler
    const handleDropdownInteraction = (menuName: string, type: 'enter' | 'leave' | 'click', e?: React.MouseEvent) => {
        if (type === 'click') {
            e?.preventDefault();
            setOpenDropdown(prev => prev === menuName ? null : menuName);
        } else if (type === 'enter') {
            setOpenDropdown(menuName);
        } else if (type === 'leave') {
            setOpenDropdown(null);
        }
    };

    // Calculate IsHeaderWhite based on scroll or headerBgWhite prop
    const isHeaderWhite = scroll || headerBgWhite;

    // Helper to get link styles
    const getLinkStyle = (path: string, menuName?: string) => {
        const isActiveLink = isActive(path);
        const isOpen = menuName && openDropdown === menuName;
        return {
            color: isActiveLink || isOpen ? '#FFBA00' : isHeaderWhite ? '#333' : '#fff',
            fontWeight: isActiveLink ? '600' : 'normal',
            cursor: 'pointer'
        };
    };

    // Helper for dropdown menu styles
    const getDropdownStyle = (menuName: string): React.CSSProperties => {
        const isOpen = openDropdown === menuName;
        return {
            display: isOpen ? 'block' : 'none',
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 999,
            minWidth: '220px',
            backgroundColor: '#fff',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            padding: '15px 0',
            borderRadius: '0 0 8px 8px',
            // Ensure visibility properties are not overridden
            visibility: 'visible',
            opacity: 1,
            pointerEvents: 'auto',
        };
    };

    return (
        <>
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

                                    <div className="main-menu" style={{ overflow: 'visible' }}>
                                        <ul style={{ overflow: 'visible' }}>
                                            <li>
                                                <Link href={`/${locale}`} style={getLinkStyle(`/${locale}`)}>{t('home')}</Link>
                                            </li>

                                            <li
                                                className={openDropdown === 'about' ? 'dropdown-open' : ''}
                                                onMouseEnter={() => handleDropdownInteraction('about', 'enter')}
                                                onMouseLeave={() => handleDropdownInteraction('about', 'leave')}
                                                style={{ position: 'relative', zIndex: openDropdown === 'about' ? 1000 : 'auto' }}
                                            >
                                                <a href="#" onClick={(e) => handleDropdownInteraction('about', 'click', e)} style={getLinkStyle(`/${locale}/about`, 'about')}>
                                                    {t('about')} <i className={`fa-solid ${openDropdown === 'about' ? 'fa-angle-up' : 'fa-angle-down'}`} />
                                                </a>
                                                <ul className="dropdown-padding" style={getDropdownStyle('about')}>
                                                    <li><Link href={`/${locale}/about`}>{t('aboutACCP')}</Link></li>
                                                    <li><Link href={`/${locale}/welcome-messages`}>{t('welcomeMessages')}</Link></li>
                                                </ul>
                                            </li>

                                            <li
                                                className={openDropdown === 'program' ? 'dropdown-open' : ''}
                                                onMouseEnter={() => handleDropdownInteraction('program', 'enter')}
                                                onMouseLeave={() => handleDropdownInteraction('program', 'leave')}
                                                style={{ position: 'relative', zIndex: openDropdown === 'program' ? 1000 : 'auto' }}
                                            >
                                                <a href="#" onClick={(e) => handleDropdownInteraction('program', 'click', e)} style={getLinkStyle(`/${locale}/program`, 'program')}>
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

                                            <li
                                                className={openDropdown === 'abstracts' ? 'dropdown-open' : ''}
                                                onMouseEnter={() => handleDropdownInteraction('abstracts', 'enter')}
                                                onMouseLeave={() => handleDropdownInteraction('abstracts', 'leave')}
                                                style={{ position: 'relative', zIndex: openDropdown === 'abstracts' ? 1000 : 'auto' }}
                                            >
                                                <a href="#" onClick={(e) => handleDropdownInteraction('abstracts', 'click', e)} style={getLinkStyle(`/${locale}/call-for-abstracts`, 'abstracts')}>
                                                    {t('callForAbstracts')} <i className={`fa-solid ${openDropdown === 'abstracts' ? 'fa-angle-up' : 'fa-angle-down'}`} />
                                                </a>
                                                <ul className="dropdown-padding" style={getDropdownStyle('abstracts')}>
                                                    <li><Link href={`/${locale}/abstract-submission-guideline`}>{t('abstractGuideline')}</Link></li>
                                                    <li><Link href={`/${locale}/call-for-abstracts`}>{t('callForAbstracts')}</Link></li>
                                                </ul>
                                            </li>

                                            <li
                                                className={openDropdown === 'registration' ? 'dropdown-open' : ''}
                                                onMouseEnter={() => handleDropdownInteraction('registration', 'enter')}
                                                onMouseLeave={() => handleDropdownInteraction('registration', 'leave')}
                                                style={{ position: 'relative', zIndex: openDropdown === 'registration' ? 1000 : 'auto' }}
                                            >
                                                <a href="#" onClick={(e) => handleDropdownInteraction('registration', 'click', e)} style={getLinkStyle(`/${locale}/registration`, 'registration')}>
                                                    {t('registration')} <i className={`fa-solid ${openDropdown === 'registration' ? 'fa-angle-up' : 'fa-angle-down'}`} />
                                                </a>
                                                <ul className="dropdown-padding" style={getDropdownStyle('registration')}>
                                                    <li><Link href={`/${locale}/registration`}>{t('registrationInfo')}</Link></li>
                                                    <li><Link href={`/${locale}/registration-policies`}>{t('policies')}</Link></li>
                                                </ul>
                                            </li>

                                            <li
                                                className={openDropdown === 'travel' ? 'dropdown-open' : ''}
                                                onMouseEnter={() => handleDropdownInteraction('travel', 'enter')}
                                                onMouseLeave={() => handleDropdownInteraction('travel', 'leave')}
                                                style={{ position: 'relative', zIndex: openDropdown === 'travel' ? 1000 : 'auto' }}
                                            >
                                                <a href="#" onClick={(e) => handleDropdownInteraction('travel', 'click', e)} style={getLinkStyle(`/${locale}/accommodation`, 'travel')}>
                                                    {t('travelAccommodation')} <i className={`fa-solid ${openDropdown === 'travel' ? 'fa-angle-up' : 'fa-angle-down'}`} />
                                                </a>
                                                <ul className="dropdown-padding" style={getDropdownStyle('travel')}>
                                                    <li><Link href={`/${locale}/accommodation`}>{t('hotelsRates')}</Link></li>
                                                    <li><Link href={`/${locale}/travel-visa`}>{t('travelVisa')}</Link></li>
                                                </ul>
                                            </li>

                                            <li
                                                className={openDropdown === 'more' ? 'dropdown-open' : ''}
                                                onMouseEnter={() => handleDropdownInteraction('more', 'enter')}
                                                onMouseLeave={() => handleDropdownInteraction('more', 'leave')}
                                                style={{ position: 'relative', zIndex: openDropdown === 'more' ? 1000 : 'auto' }}
                                            >
                                                <a href="#" onClick={(e) => handleDropdownInteraction('more', 'click', e)} style={getLinkStyle(`/${locale}/sponsorship`, 'more')}>
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
                                        <div className="d-none d-lg-flex" style={{ alignItems: 'center' }}>
                                            <div style={{
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '24px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                background: '#fff',
                                                padding: '2px'
                                            }}>
                                                <LanguageSwitch
                                                    onChange={handleLanguageChange}
                                                    checked={locale === 'en'}
                                                    offColor="#ffffff"
                                                    onColor="#ffffff"
                                                    offHandleColor="#FFBA00"
                                                    onHandleColor="#FFBA00"
                                                    handleDiameter={34}
                                                    checkedHandleIcon={
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                height: "100%",
                                                                fontSize: 14,
                                                                color: "#333",
                                                                fontWeight: "800",
                                                            }}
                                                        >
                                                            EN
                                                        </div>
                                                    }
                                                    uncheckedHandleIcon={
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                height: "100%",
                                                                fontSize: 14,
                                                                color: "#333",
                                                                fontWeight: "800",
                                                            }}
                                                        >
                                                            TH
                                                        </div>
                                                    }
                                                    uncheckedIcon={
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "flex-end",
                                                                alignItems: "center",
                                                                height: "100%",
                                                                paddingRight: 8
                                                            }}
                                                        >
                                                            <TH style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} title="Thai" />
                                                        </div>
                                                    }
                                                    checkedIcon={
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "flex-start",
                                                                alignItems: "center",
                                                                height: "100%",
                                                                paddingLeft: 8
                                                            }}
                                                        >
                                                            <US style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} title="English" />
                                                        </div>
                                                    }
                                                    boxShadow="none"
                                                    activeBoxShadow="none"
                                                    height={40}
                                                    width={96}
                                                    className="react-switch"
                                                    id="language-switch"
                                                />
                                            </div>
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
