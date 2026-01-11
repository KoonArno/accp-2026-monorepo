'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

import { useLocale } from 'next-intl'

export default function MemorialPopup() {
    const locale = useLocale()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Show popup on mount
        // Optional: Check sessionStorage if we want to show it only once per session
        // const hasSeenPopup = sessionStorage.getItem('hasSeenMemorialPopup')
        // if (!hasSeenPopup) {
        setIsVisible(true)
        // }
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        // sessionStorage.setItem('hasSeenMemorialPopup', 'true')
    }

    if (!isVisible) return null

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }}>
            <div style={{
                position: 'relative',
                maxWidth: '1200px',
                width: '100%',
                maxHeight: '95vh',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
                    <Image
                        src="/assets/img/memorial-popup.png"
                        alt="Memorial Popup"
                        width={1200}
                        height={675}
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '85vh',
                            objectFit: 'contain',
                            borderRadius: '8px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                        }}
                    />
                </div>

                <button
                    onClick={handleClose}
                    className="btn"
                    style={{
                        marginTop: '20px',
                        background: 'white',
                        color: 'black',
                        padding: '12px 30px',
                        fontSize: '18px',
                        fontWeight: '600',
                        border: 'none',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)',
                        transition: 'transform 0.2s',
                        fontFamily: 'inherit'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    {locale === 'th' ? 'เข้าสู่เว็บไซต์' : 'Enter Site'}
                </button>
            </div>
        </div>
    )
}
