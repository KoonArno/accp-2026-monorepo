'use client'
import { useState, useEffect } from 'react'

export default function LanguageSwitcher() {
    const [language, setLanguage] = useState<'th' | 'en'>('en')
    const [isHovered, setIsHovered] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const savedLang = localStorage.getItem('accp-language') as 'th' | 'en'
        if (savedLang) {
            setLanguage(savedLang)
        }
    }, [])

    const toggleLanguage = () => {
        const newLang = language === 'th' ? 'en' : 'th'
        setLanguage(newLang)
        localStorage.setItem('accp-language', newLang)
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('languageChange', { detail: newLang }))
        // Reload page to apply changes
        window.location.reload()
    }

    // Prevent hydration mismatch
    if (!mounted) {
        return null
    }

    return (
        <button
            onClick={toggleLanguage}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px 24px',
                background: isHovered
                    ? 'linear-gradient(135deg, #1a237e 0%, #3f51b5 100%)'
                    : 'linear-gradient(135deg, #3f51b5 0%, #7c4dff 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: 600,
                boxShadow: isHovered
                    ? '0 8px 30px rgba(26, 35, 126, 0.5)'
                    : '0 4px 20px rgba(63, 81, 181, 0.4)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'translateY(-3px) scale(1.05)' : 'translateY(0) scale(1)',
                backdropFilter: 'blur(10px)',
                letterSpacing: '0.5px',
                fontFamily: 'inherit',
            }}
            aria-label={language === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
        >
            {/* Globe Icon */}
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                    transition: 'transform 0.3s ease',
                    transform: isHovered ? 'rotate(20deg)' : 'rotate(0deg)'
                }}
            >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>

            {/* Language Label */}
            <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
            }}>
                {language === 'th' ? (
                    <>
                        <span style={{
                            padding: '2px 8px',
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '4px',
                            fontSize: '13px'
                        }}>TH</span>
                        <span style={{ fontSize: '14px' }}>→</span>
                        <span style={{ fontWeight: 700 }}>EN</span>
                    </>
                ) : (
                    <>
                        <span style={{
                            padding: '2px 8px',
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '4px',
                            fontSize: '13px'
                        }}>EN</span>
                        <span style={{ fontSize: '14px' }}>→</span>
                        <span style={{ fontWeight: 700 }}>ไทย</span>
                    </>
                )}
            </span>
        </button>
    )
}
