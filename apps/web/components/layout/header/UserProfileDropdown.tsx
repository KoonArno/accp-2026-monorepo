'use client'
import { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function UserProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const t = useTranslations('common');
    const tUser = useTranslations('userProfile');
    const locale = useLocale();
    const router = useRouter();
    const { user, logout } = useAuth();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        router.push(`/${locale}`);
    };

    if (!user) return null;

    // Get user initials
    const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

    return (
        <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(26, 35, 126, 0.2)'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(26, 35, 126, 0.3)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(26, 35, 126, 0.2)';
                }}
            >
                {/* Avatar */}
                <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FFBA00 0%, #FFD54F 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#1a237e'
                }}>
                    {initials}
                </div>
                
                {/* User Name */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    color: '#fff'
                }}>
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>
                        {user.firstName} {user.lastName}
                    </span>
                </div>

                {/* Dropdown Icon */}
                <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`} style={{
                    fontSize: '12px',
                    color: '#fff',
                    marginLeft: '5px'
                }} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    background: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                    minWidth: '240px',
                    overflow: 'hidden',
                    zIndex: 1000,
                    animation: 'slideDown 0.2s ease'
                }}>
                    {/* User Info Header */}
                    <div style={{
                        padding: '16px',
                        background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
                        borderBottom: '1px solid #e0e0e0'
                    }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#333', marginBottom: '4px' }}>
                            {user.firstName} {user.lastName}
                        </div>
                        <div style={{ fontSize: '13px', color: '#666' }}>
                            {user.email}
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div style={{ padding: '8px 0' }}>
                        <Link
                            href={`/${locale}/my-tickets`}
                            onClick={() => setIsOpen(false)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 16px',
                                color: '#333',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#f8f8f8';
                                e.currentTarget.style.paddingLeft = '20px';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.paddingLeft = '16px';
                            }}
                        >
                            <i className="fa-solid fa-ticket" style={{ color: '#1a237e', fontSize: '16px', width: '20px' }} />
                            <span style={{ fontSize: '14px', fontWeight: '500' }}>{tUser('myTickets')}</span>
                        </Link>

                        <Link
                            href={`/${locale}/abstract-status`}
                            onClick={() => setIsOpen(false)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 16px',
                                color: '#333',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#f8f8f8';
                                e.currentTarget.style.paddingLeft = '20px';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.paddingLeft = '16px';
                            }}
                        >
                            <i className="fa-solid fa-file-lines" style={{ color: '#1a237e', fontSize: '16px', width: '20px' }} />
                            <span style={{ fontSize: '14px', fontWeight: '500' }}>{tUser('abstractStatus')}</span>
                        </Link>

                        <div style={{ height: '1px', background: '#e8e8e8', margin: '8px 16px' }} />

                        <button
                            onClick={handleLogout}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 16px',
                                background: 'transparent',
                                border: 'none',
                                color: '#d32f2f',
                                cursor: 'pointer',
                                textAlign: 'left',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#ffebee';
                                e.currentTarget.style.paddingLeft = '20px';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.paddingLeft = '16px';
                            }}
                        >
                            <i className="fa-solid fa-right-from-bracket" style={{ fontSize: '16px', width: '20px' }} />
                            <span>{tUser('logout')}</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Add CSS animation */}
            <style jsx>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
