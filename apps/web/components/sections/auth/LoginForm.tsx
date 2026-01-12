'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginForm() {
    const t = useTranslations('login');
    const locale = useLocale();
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Validation
            if (!email || !password) {
                setError(locale === 'th' ? 'กรุณากรอกข้อมูลให้ครบถ้วน' : 'Please fill in all fields');
                setIsLoading(false);
                return;
            }

            // Real API Call
            const response = await fetch('http://localhost:3002/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle specific errors
                if (response.status === 401) {
                    setError(locale === 'th' ? 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' : 'Invalid email or password');
                } else if (response.status === 403) {
                     setError(locale === 'th' ? 'บัญชีของคุณถูกระงับ กรุณาติดต่อเจ้าหน้าที่' : 'Account suspended. Please contact support.');
                } else {
                    setError(data.error || (locale === 'th' ? 'เข้าสู่ระบบไม่สำเร็จ' : 'Login failed'));
                }
                setIsLoading(false);
                return;
            }
            
            // Login Success
            login({
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                email: data.user.email,
                country: data.user.country,
                isThai: data.user.isThai,
                delegateType: data.user.delegateType,
                idCard: data.user.idCard
            });
            
            // Redirect
            router.push(`/${locale}`);
        } catch (err) {
            console.error('Login error:', err);
            setError(locale === 'th' ? 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง' : 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            maxWidth: '420px',
            margin: '0 auto'
        }}>
            {/* Logo */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <Link href={`/${locale}`}>
                    <img src="/assets/img/logo/accp_logo_main.png" alt="ACCP 2026"
                        style={{ height: '80px', width: 'auto' }} />
                </Link>
            </div>

            {/* Title */}
            <h2 style={{
                fontSize: '24px', fontWeight: '600', color: '#1a1a1a',
                textAlign: 'center', marginBottom: '8px'
            }}>
                {locale === 'th' ? 'เข้าสู่ระบบ' : 'Sign In'}
            </h2>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '32px' }}>
                {locale === 'th' ? 'กรอกอีเมลและรหัสผ่านเพื่อเข้าสู่ระบบ' : 'Enter your email and password to sign in'}
            </p>

            {/* Error Message */}
            {error && (
                <div style={{
                    padding: '12px 16px',
                    background: '#ffebee',
                    border: '1px solid #ef5350',
                    borderRadius: '8px',
                    color: '#c62828',
                    fontSize: '14px',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
                {/* Email */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '8px' }}>
                        {t('email')} <span style={{ color: '#e53935' }}>*</span>
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        required
                        style={{
                            width: '100%',
                            padding: '14px 16px',
                            fontSize: '15px',
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                            boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#1a237e'}
                        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                </div>

                {/* Password */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '8px' }}>
                        {t('password')} <span style={{ color: '#e53935' }}>*</span>
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        style={{
                            width: '100%',
                            padding: '14px 16px',
                            fontSize: '15px',
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                            boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#1a237e'}
                        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                </div>

                {/* Remember Me & Forgot Password */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#666' }}>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            style={{ width: '16px', height: '16px', accentColor: '#1a237e' }}
                        />
                        {t('rememberMe')}
                    </label>
                    <Link href={`/${locale}/forgot-password`} style={{ fontSize: '14px', color: '#1a237e', textDecoration: 'none', fontWeight: '500' }}>
                        {t('forgotPassword')}
                    </Link>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                        width: '100%',
                        padding: '14px',
                        background: isLoading ? '#9fa8da' : '#1a237e',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        transition: 'background 0.2s'
                    }}
                >
                    {isLoading
                        ? (locale === 'th' ? 'กำลังเข้าสู่ระบบ...' : 'Signing in...')
                        : t('signIn')
                    }
                </button>
            </form>

            {/* Sign Up Link */}
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <p style={{ fontSize: '14px', color: '#666' }}>
                    {t('noAccount')}{' '}
                    <Link href={`/${locale}/signup`} style={{ color: '#1a237e', fontWeight: '600', textDecoration: 'none' }}>
                        {t('signUp')}
                    </Link>
                </p>
            </div>
        </div>
    );
}
