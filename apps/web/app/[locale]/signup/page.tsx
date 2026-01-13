'use client'
import Layout from "@/components/layout/Layout"
import { useTranslations } from 'next-intl';
import SignupForm from '@/components/sections/auth/SignupForm';

export default function SignUp() {
    const t = useTranslations('signup');

    return (
        <Layout headerStyle={1} footerStyle={1}>
            {/* Hero Section */}
            <div className="inner-page-header" style={{
                background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 50%, #5c6bc0 100%)',
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center'
            }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 m-auto">
                            <div className="heading1 text-center">
                                <h1 style={{ color: '#fff', fontSize: '42px', fontWeight: '700' }}>{t('createAccount')}</h1>
                                <div className="space10" />
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>{t('subtitle')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sign Up Form Section */}
            <div style={{
                background: 'linear-gradient(180deg, #e8eaf6 0%, #c5cae9 100%)',
                padding: '60px 0',
                minHeight: 'calc(100vh - 200px)'
            }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8">
                            <SignupForm />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
