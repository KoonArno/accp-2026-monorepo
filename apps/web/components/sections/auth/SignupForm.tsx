'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import { Hourglass } from 'react-loader-spinner';

type TabType = 'thaiStudent' | 'internationalStudent' | 'thaiProfessional' | 'internationalProfessional';



export default function SignupForm() {
    const t = useTranslations('signup');
    const tLogin = useTranslations('login');
    const locale = useLocale();
    const router = useRouter();
    const { login } = useAuth();

    const [activeTab, setActiveTab] = useState<TabType>('thaiStudent');
    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [organization, setOrganization] = useState('');
    const [phone, setPhone] = useState('');
    const [idCard, setIdCard] = useState('');
    const [pharmacyLicenseId, setPharmacyLicenseId] = useState('');
    const [passportId, setPassportId] = useState('');
    const [country, setCountry] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [studentDocument, setStudentDocument] = useState<File | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [step, setStep] = useState(1);

    // Handle file selection (store in state only, no upload yet)
    const handleFileSelect = (file: File) => {
        // Validate file type
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            alert(locale === 'th' ? 'รองรับเฉพาะไฟล์ PDF, JPG, PNG' : 'Only PDF, JPG, PNG files are allowed');
            return;
        }
        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
            alert(locale === 'th' ? 'ไฟล์ใหญ่เกินไป (สูงสุด 10MB)' : 'File too large (max 10MB)');
            return;
        }
        setStudentDocument(file);
    };

    const validateThaiId = (id: string): boolean => {
        if (id.length !== 13 || !/^\d{13}$/.test(id)) return false;
        let sum = 0;
        for (let i = 0; i < 12; i++) sum += parseInt(id[i]) * (13 - i);
        return (11 - (sum % 11)) % 10 === parseInt(id[12]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                alert(locale === 'th' ? 'กรุณากรอกข้อมูลให้ครบถ้วน' : 'Please fill all required fields');
                setIsLoading(false);
                return;
            }
            if (phone && !isValidPhoneNumber(phone)) {
                alert(locale === 'th' ? 'เบอร์โทรศัพท์ไม่ถูกต้อง' : 'Invalid phone number format');
                setIsLoading(false);
                return;
            }
            if (password !== confirmPassword) {
                alert(locale === 'th' ? 'รหัสผ่านไม่ตรงกัน' : 'Passwords do not match');
                setIsLoading(false);
                return;
            }
            if (!agreeTerms) {
                alert(locale === 'th' ? 'กรุณายอมรับข้อกำหนดการใช้งาน' : 'Please agree to terms');
                setIsLoading(false);
                return;
            }
            if (activeTab === 'thaiStudent' || activeTab === 'thaiProfessional') {
                if (!idCard) {
                    alert(locale === 'th' ? 'กรุณากรอกเลขบัตรประชาชน' : 'Please enter Thai ID card');
                    setIsLoading(false);
                    return;
                }
                // TODO: Re-enable validation for production
                // if (!validateThaiId(idCard)) {
                //     alert(locale === 'th' ? 'เลขบัตรประชาชนไม่ถูกต้อง' : 'Invalid Thai ID card number');
                //     setIsLoading(false);
                //     return;
                // }
            } else if (!country) {
                alert(locale === 'th' ? 'กรุณาระบุประเทศ' : 'Please enter country');
                setIsLoading(false);
                return;
            }

            // Validate student document for students
            const isStudent = activeTab === 'thaiStudent' || activeTab === 'internationalStudent';
            if (isStudent && !studentDocument) {
                alert(locale === 'th' ? 'กรุณาเลือกเอกสารยืนยันความเป็นนักศึกษา' : 'Please select student verification document');
                setIsLoading(false);
                return;
            }

            // API Call with FormData (file will be uploaded by backend)
            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            const formDataToSend = new FormData();
            formDataToSend.append('firstName', firstName);
            formDataToSend.append('lastName', lastName);
            formDataToSend.append('email', email);
            formDataToSend.append('password', password);
            formDataToSend.append('accountType', activeTab);
            if (phone) formDataToSend.append('phone', phone);
            if (organization) formDataToSend.append('organization', organization);
            if (activeTab === 'thaiStudent' || activeTab === 'thaiProfessional') {
                if (idCard) formDataToSend.append('idCard', idCard);
                if (pharmacyLicenseId) formDataToSend.append('pharmacyLicenseId', pharmacyLicenseId);
            }
            if (activeTab === 'internationalStudent' || activeTab === 'internationalProfessional') {
                if (passportId) formDataToSend.append('passportId', passportId);
                if (country) formDataToSend.append('country', country);
            }
            if (studentDocument) {
                formDataToSend.append('verificationDoc', studentDocument);
            }
            // Call Registration API
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                body: formDataToSend,
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || 'Registration failed');
                setIsLoading(false);
                return;
            }

            // Success handling (reuse isStudent from above)
            if (isStudent) {
                // Show pending modal
                setIsPending(true);
            } else {
                // Auto login for professionals
                login({
                    firstName: data.user.firstName,
                    lastName: data.user.lastName,
                    email: data.user.email,
                    // Map local state to AuthContext type
                    delegateType: activeTab === 'thaiProfessional' ? 'thai_pharmacist' : 'international_pharmacist',
                    isThai: activeTab === 'thaiProfessional',
                    country: country || 'Thailand',
                    idCard: idCard,
                });
                await new Promise(resolve => setTimeout(resolve, 100));
                router.push(`/${locale}`);
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const tabs: { id: TabType; label: string; labelTh: string; desc: string; descTh: string }[] = [
        { id: 'thaiStudent', label: 'Thai Student', labelTh: 'นักศึกษาไทย', desc: 'For Thai Student', descTh: 'สำหรับนักศึกษาชาวไทย' },
        { id: 'internationalStudent', label: 'International Student', labelTh: 'นักศึกษาต่างชาติ', desc: 'For International Student', descTh: 'สำหรับนักศึกษาชาวต่างชาติ' },
        { id: 'thaiProfessional', label: 'Thai Medical Professional', labelTh: 'บุคลากรทางการแพทย์ไทย', desc: 'For Thai Medical Professional', descTh: 'สำหรับบุคลากรทางการแพทย์ชาวไทย' },
        { id: 'internationalProfessional', label: 'International Medical Professional', labelTh: 'บุคลากรทางการแพทย์ต่างชาติ', desc: 'For International Medical Professional', descTh: 'สำหรับบุคลากรทางการแพทย์ชาวต่างชาติ' }
    ];

    const isThai = activeTab === 'thaiStudent';

    const inputStyle = {
        width: '100%',
        padding: '12px 14px',
        fontSize: '15px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        outline: 'none'
    };

    const phoneInputStyle = `
        /* react-international-phone custom styles */
        .react-international-phone-input-container {
            display: flex;
            align-items: center;
            width: 100%;
        }
        .react-international-phone-country-selector-dropdown {
            max-height: 250px;
            overflow-y: auto;
            z-index: 1000;
        }
        .react-international-phone-input {
            flex: 1;
        }
        
        /* Account Type Card Animation */
        .account-type-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }
        .account-type-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 24px rgba(0,0,0,0.08);
            border-color: #1a237e !important;
        }
        .account-type-card:active {
            transform: translateY(0);
        }
        
        /* Fade In Animation */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .step-content {
            animation: fadeIn 0.4s ease-out forwards;
        }
    `;

    const PhoneInputAny = PhoneInput as any;
    const HourglassAny = Hourglass as any;

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: phoneInputStyle }} />
            <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '40px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                maxWidth: '480px',
                margin: '0 auto',
                position: 'relative'
            }}>
                {/* Loading Overlay */}
                {isLoading && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(255,255,255,0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2000,
                        flexDirection: 'column',
                        gap: '20px'
                    }}>
                        <HourglassAny
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="hourglass-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            colors={['#1a237e', '#72a1ed']}
                        />
                        <div style={{ color: '#1a237e', fontSize: '18px', fontWeight: '600' }}>
                            {locale === 'th' ? 'กำลังดำเนินการ...' : 'Processing...'}
                        </div>
                    </div>
                )}

                {/* Modal Overlay */}
                {isPending && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '20px'
                    }}>
                        <div style={{
                            background: '#fff',
                            borderRadius: '16px',
                            padding: '40px',
                            width: '100%',
                            maxWidth: '400px',
                            textAlign: 'center',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.2)'
                        }}>
                            <div style={{ marginBottom: '24px' }}>
                                <img src="/assets/img/logo/accp_logo_main.png" alt="ACCP 2026"
                                    style={{ height: '80px', width: 'auto', margin: '0 auto' }} />
                            </div>
                            <div style={{ fontSize: '48px', marginBottom: '24px' }}>⏳</div>
                            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '16px' }}>
                                {locale === 'th' ? 'สร้างบัญชีสำเร็จ' : 'Account Created'}
                            </h3>
                            <p style={{ color: '#666', fontSize: '16px', marginBottom: '32px', lineHeight: '1.6' }}>
                                {t('pendingApproval')}
                            </p>
                            <button
                                onClick={() => router.push(`/${locale}/login`)}
                                style={{
                                    display: 'inline-block',
                                    padding: '12px 24px',
                                    background: '#1a237e',
                                    color: '#fff',
                                    borderRadius: '8px',
                                    border: 'none',
                                    fontWeight: '600',
                                    fontSize: '15px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    width: '100%'
                                }}
                            >
                                {locale === 'th' ? 'ตกลง' : 'OK'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <Link href={`/${locale}`}>
                        <img src="/assets/img/logo/accp_logo_main.png" alt="ACCP 2026"
                            style={{ height: '80px', width: 'auto' }} />
                    </Link>
                </div>

                {/* Title */}
                <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#1a1a1a', textAlign: 'center', marginBottom: '8px' }}>
                    {step === 1
                        ? (locale === 'th' ? 'เลือกประเภทบัญชี' : 'Select Account Type')
                        : (locale === 'th' ? 'สร้างบัญชี' : 'Create Account')
                    }
                </h2>
                <p style={{ textAlign: 'center', color: '#666', fontSize: '15px', marginBottom: '32px' }}>
                    {step === 1
                        ? (locale === 'th' ? 'กรุณาเลือกประเภทผู้ใช้งานของคุณเพื่อดำเนินการต่อ' : 'Please select your user type to continue')
                        : (locale === 'th' ? 'กรอกข้อมูลส่วนตัวเพื่อลงทะเบียน' : 'Please fill in your details to register')
                    }
                </p>

                {/* Step 1: Account Type Selection */}
                {step === 1 && (
                    <div className="step-content">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '24px' }}>
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    className="account-type-card"
                                    onClick={() => { setActiveTab(tab.id); setStep(2); }}
                                    style={{
                                        padding: '20px',
                                        border: '2px solid #eef0f2',
                                        borderRadius: '12px',
                                        background: '#fff',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        textAlign: 'left',
                                        width: '100%'
                                    }}
                                >
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '12px',
                                        background: tab.id.includes('Student') ? '#e8eaf6' : '#e0f2f1',
                                        color: tab.id.includes('Student') ? '#1a237e' : '#00695c',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '24px',
                                        flexShrink: 0
                                    }}>
                                        {tab.id.includes('Student') ? '🎓' : '⚕️'}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '4px' }}>
                                            {locale === 'th' ? tab.labelTh : tab.label}
                                        </div>
                                        <div style={{ fontSize: '13px', color: '#666' }}>
                                            {locale === 'th' ? tab.descTh : tab.desc}
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: 'auto', color: '#ccc' }}>
                                        →
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Login Link for Step 1 */}
                        <div style={{ textAlign: 'center', marginTop: '24px', borderTop: '1px solid #f0f0f0', paddingTop: '24px' }}>
                            <p style={{ fontSize: '14px', color: '#666' }}>
                                {t('haveAccount')}{' '}
                                <Link href={`/${locale}/login`} style={{ color: '#1a237e', fontWeight: '600', textDecoration: 'none' }}>
                                    {t('signIn')}
                                </Link>
                            </p>
                        </div>
                    </div>
                )}

                {/* Step 2: Form */}
                {step === 2 && (
                    <form onSubmit={handleSubmit} className="step-content">
                        {/* Selected Type Indicator / Back Button */}
                        <div style={{
                            marginBottom: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: '#f8f9fa',
                            padding: '16px',
                            borderRadius: '12px',
                            border: '1px solid #eef0f2'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    fontSize: '20px',
                                    color: activeTab.includes('Student') ? '#1a237e' : '#00695c'
                                }}>
                                    {activeTab.includes('Student') ? '🎓' : '⚕️'}
                                </div>
                                <div>
                                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#888', fontWeight: '600', letterSpacing: '0.5px' }}>
                                        {locale === 'th' ? 'ประเภทบัญชี' : 'Account Type'}
                                    </div>
                                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>
                                        {locale === 'th'
                                            ? tabs.find(t => t.id === activeTab)?.labelTh
                                            : tabs.find(t => t.id === activeTab)?.label
                                        }
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                style={{
                                    padding: '6px 12px',
                                    fontSize: '13px',
                                    color: '#1a237e',
                                    fontWeight: '600',
                                    background: 'transparent',
                                    border: '1px solid rgba(26, 35, 126, 0.2)',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {locale === 'th' ? 'เปลี่ยน' : 'Change'}
                            </button>
                        </div>
                        {/* Name Fields */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                    {t('firstName')} <span style={{ color: '#e53935' }}>*</span>
                                </label>
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                    placeholder={t('firstName')} required style={inputStyle} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                    {t('lastName')} <span style={{ color: '#e53935' }}>*</span>
                                </label>
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                                    placeholder={t('lastName')} required style={inputStyle} />
                            </div>
                        </div>

                        {/* Thai Student/Professional: ID Card */}
                        {(activeTab === 'thaiStudent' || activeTab === 'thaiProfessional') && (
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                    {locale === 'th' ? 'เลขบัตรประชาชน' : 'Thai ID Card'} <span style={{ color: '#e53935' }}>*</span>
                                </label>
                                <input type="text" value={idCard}
                                    onChange={(e) => setIdCard(e.target.value.replace(/\D/g, '').slice(0, 13))}
                                    placeholder={locale === 'th' ? 'เลข 13 หลัก' : '13-digit number'}
                                    maxLength={13} required style={inputStyle} />
                                <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                                    {locale === 'th' ? 'ยืนยันสัญชาติไทยเพื่อรับราคาพิเศษ' : 'Verify Thai nationality for THB pricing'}
                                </p>
                            </div>
                        )}

                        {/* Thai Professional: Pharmacy License ID (Optional) */}
                        {activeTab === 'thaiProfessional' && (
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                    {locale === 'th' ? 'หมายเลขใบอนุญาตประกอบวิชาชีพเภสัชกรรม (ถ้ามี)' : 'Pharmacy License Number (Optional)'}
                                </label>
                                <input type="text" value={pharmacyLicenseId}
                                    onChange={(e) => setPharmacyLicenseId(e.target.value)}
                                    placeholder={locale === 'th' ? 'ระบุเลขที่ใบอนุญาต' : 'Enter license number'}
                                    style={inputStyle} />
                            </div>
                        )}

                        {/* International: Passport ID + Country */}
                        {(activeTab === 'internationalStudent' || activeTab === 'internationalProfessional') && (
                            <>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                        {locale === 'th' ? 'หมายเลขหนังสือเดินทาง' : 'Passport ID'} <span style={{ color: '#e53935' }}>*</span>
                                    </label>
                                    <input type="text" value={passportId}
                                        onChange={(e) => setPassportId(e.target.value.toUpperCase())}
                                        placeholder={locale === 'th' ? 'เช่น AB1234567' : 'e.g. AB1234567'}
                                        maxLength={9}
                                        required style={inputStyle} />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                        {locale === 'th' ? 'ประเทศ' : 'Country'} <span style={{ color: '#e53935' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        placeholder={locale === 'th' ? 'กรอกชื่อประเทศ' : 'Enter country name'}
                                        required
                                        style={inputStyle}
                                    />
                                </div>
                            </>
                        )}

                        {/* Email */}
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                {t('email')} <span style={{ color: '#e53935' }}>*</span>
                            </label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@example.com" required style={inputStyle} />
                        </div>

                        {/* Organization */}
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                {t('organization')}
                            </label>
                            <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)}
                                placeholder={t('organization')} style={inputStyle} />
                        </div>

                        {/* Phone Number */}
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                {locale === 'th' ? 'เบอร์โทรศัพท์' : 'Phone Number'}
                            </label>
                            <div style={{
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                padding: '12px 14px',
                                background: '#fff'
                            }}>
                                {/* @ts-ignore */}
                                <PhoneInputAny
                                    defaultCountry="th"
                                    value={phone}
                                    onChange={(phone: string) => setPhone(phone)}
                                    inputStyle={{
                                        width: '100%',
                                        border: 'none',
                                        outline: 'none',
                                        fontSize: '15px',
                                        background: 'transparent'
                                    }}
                                    countrySelectorStyleProps={{
                                        buttonStyle: {
                                            border: 'none',
                                            background: 'transparent'
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {/* Password Fields */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                    {t('password')} <span style={{ color: '#e53935' }}>*</span>
                                </label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••" required style={inputStyle} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                    {t('confirmPassword')} <span style={{ color: '#e53935' }}>*</span>
                                </label>
                                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••" required style={inputStyle} />
                            </div>
                        </div>

                        {/* Student Document Upload */}
                        {(activeTab === 'thaiStudent' || activeTab === 'internationalStudent') && (
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                    {locale === 'th' ? 'เอกสารยืนยันความเป็นนักศึกษา (PDF, JPG, PNG)' : 'Student Verification Document (PDF, JPG, PNG)'} <span style={{ color: '#e53935' }}>*</span>
                                </label>
                                <input
                                    id="student-doc-input"
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleFileSelect(file);
                                        e.target.value = '';
                                    }}
                                    style={{ display: 'none' }}
                                />
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById('student-doc-input')?.click()}
                                        disabled={!!studentDocument}
                                        style={{
                                            flex: 1,
                                            padding: '12px 14px',
                                            fontSize: '15px',
                                            border: studentDocument ? '2px solid #4caf50' : '2px solid #1a237e',
                                            borderRadius: '8px',
                                            background: studentDocument ? '#e8f5e9' : '#f5f5ff',
                                            color: studentDocument ? '#2e7d32' : '#1a237e',
                                            cursor: studentDocument ? 'default' : 'pointer',
                                            fontWeight: '500',
                                            transition: 'all 0.2s ease',
                                            opacity: studentDocument ? 0.9 : 1
                                        }}
                                    >
                                        {studentDocument
                                            ? '📄 ' + studentDocument.name
                                            : (locale === 'th' ? '📁 เลือกไฟล์' : '📁 Choose File')
                                        }
                                    </button>
                                    {studentDocument && (
                                        <button
                                            type="button"
                                            onClick={() => setStudentDocument(null)}
                                            style={{
                                                padding: '12px 16px',
                                                fontSize: '15px',
                                                border: '2px solid #e53935',
                                                borderRadius: '8px',
                                                background: '#ffebee',
                                                color: '#c62828',
                                                cursor: 'pointer',
                                                fontWeight: '500',
                                                transition: 'all 0.2s ease'
                                            }}
                                            title={locale === 'th' ? 'ลบไฟล์' : 'Remove file'}
                                        >
                                            🗑️
                                        </button>
                                    )}
                                </div>
                                <p style={{ fontSize: '12px', color: studentDocument ? '#4caf50' : '#888', marginTop: '4px' }}>
                                    {studentDocument
                                        ? (locale === 'th' ? 'เลือกไฟล์แล้ว - จะอัปโหลดเมื่อกดสร้างบัญชี' : 'File selected - will upload when you create account')
                                        : (locale === 'th' ? 'เลือกใบรับรองนักศึกษา หรือเอกสารที่เกี่ยวข้อง (PDF, JPG, PNG)' : 'Select student certificate or related document (PDF, JPG, PNG)')
                                    }
                                </p>
                            </div>
                        )}

                        {/* Terms */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                                <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)}
                                    required style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                                <span style={{ fontSize: '13px', color: '#666', lineHeight: '1.5' }}>
                                    {t('agreeTerms')} <Link href="/terms" style={{ color: '#1a237e' }}>{t('terms')}</Link> {t('and')} <Link href="/privacy" style={{ color: '#1a237e' }}>{t('privacy')}</Link>
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '14px',
                                background: '#1a237e',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#fff',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                opacity: isLoading ? 0.7 : 1
                            }}>
                            {isLoading ? (locale === 'th' ? 'กำลังสร้างบัญชี...' : 'Creating...') : t('createAccount')}
                        </button>
                        {/* Login Link for Step 2 */}
                        <div style={{ textAlign: 'center', marginTop: '24px' }}>
                            <p style={{ fontSize: '14px', color: '#666' }}>
                                {t('haveAccount')}{' '}
                                <Link href={`/${locale}/login`} style={{ color: '#1a237e', fontWeight: '600', textDecoration: 'none' }}>
                                    {t('signIn')}
                                </Link>
                            </p>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}
