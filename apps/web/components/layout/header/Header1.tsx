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

    // Calculate IsHeaderWhite based on scroll or headerBgWhite prop
    // This prop seems to handle the visual state of the header
    const isHeaderWhite = scroll || headerBgWhite;

    // Define switch colors based on header state
    // When header is white (scrolled), we want a darker background for the switch to see it
    // When header is transparent (top), we want a light/transparent background
    const switchOffColor = isHeaderWhite ? "#e4e4e4" : "#ffba00"; // TH background
    const switchOnColor = isHeaderWhite ? "#e4e4e4" : "#ffba00";  // EN background
    const switchHandleColor = "#fff"; // Handle is always white to show the flag clearly (if we put flag in handle) - or keep color handle?

    // User requested: "header เป็นสีขาวให้พื้นหลังของปุ่ม toggle switch เปลี่ยนภาษา"
    // And: "พื้นหลังตัวย่อภาษาเป็น icon ธงภาษา" -> This likely means uncheckedIcon/checkedIcon should be flags


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
                                                src={scroll ? "/assets/img/logo/ACCP-BANGKOK-2026-04.png" : "/assets/img/logo/ACCP-2026-Logo-White.png"}
                                                alt="ACCP 2026"
                                                style={{ 
                                                    height: scroll ? '55px' : '150px', 
                                                    width: 'auto', 
                                                    marginLeft: '0',
                                                    marginTop: scroll ? '0' : '-40px',
                                                    marginBottom: scroll ? '0' : '-40px',
                                                    position: 'relative',
                                                    zIndex: 100,
                                                    transition: 'all 0.3s ease'
                                                }}
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

                                    <div className="btn-area" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '15px' }}>
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
                                    <img src="/assets/img/logo/ACCP-2026-Logo-New.png" alt="ACCP 2026" style={{ height: '60px', width: 'auto' }} />
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
