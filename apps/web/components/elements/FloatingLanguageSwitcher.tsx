'use client'
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function FloatingLanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();

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

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999,
            display: 'flex',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '8px 12px',
            borderRadius: '50px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(26, 35, 126, 0.1)'
        }}>
            <Link
                href={switchLocale('en')}
                style={{
                    padding: '10px 16px',
                    borderRadius: '25px',
                    fontSize: '14px',
                    fontWeight: locale === 'en' ? '700' : '500',
                    background: locale === 'en' ? 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)' : 'transparent',
                    color: locale === 'en' ? '#fff' : '#1a237e',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}
            >
                🇬🇧 EN
            </Link>
            <Link
                href={switchLocale('th')}
                style={{
                    padding: '10px 16px',
                    borderRadius: '25px',
                    fontSize: '14px',
                    fontWeight: locale === 'th' ? '700' : '500',
                    background: locale === 'th' ? 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)' : 'transparent',
                    color: locale === 'th' ? '#fff' : '#1a237e',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}
            >
                🇹🇭 ไทย
            </Link>
        </div>
    )
}
