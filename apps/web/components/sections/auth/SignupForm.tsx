'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

type TabType = 'thaiStudent' | 'internationalStudent' | 'thaiProfessional' | 'internationalProfessional';

const internationalCountries = [
    "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Bangladesh",
    "Belgium", "Brazil", "Cambodia", "Canada", "China", "Colombia", "Denmark", "Egypt",
    "Finland", "France", "Germany", "Greece", "Hong Kong", "India", "Indonesia", "Iran",
    "Iraq", "Ireland", "Israel", "Italy", "Japan", "Jordan", "Kenya", "Korea (South)",
    "Kuwait", "Laos", "Lebanon", "Malaysia", "Mexico", "Myanmar", "Nepal", "Netherlands",
    "New Zealand", "Nigeria", "Norway", "Pakistan", "Philippines", "Poland", "Portugal",
    "Qatar", "Romania", "Russia", "Saudi Arabia", "Singapore", "South Africa", "Spain",
    "Sri Lanka", "Sweden", "Switzerland", "Taiwan", "Turkey", "UAE", "UK", "USA",
    "Vietnam", "Other"
];

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
    const [uploadedDocUrl, setUploadedDocUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isPending, setIsPending] = useState(false);

    // Handle file upload to Google Drive
    const handleFileUpload = async (file: File) => {
        setStudentDocument(file);
        setIsUploading(true);
        setUploadedDocUrl(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('http://localhost:3002/upload/verify-doc', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || (locale === 'th' ? 'อัปโหลดไฟล์ไม่สำเร็จ' : 'Failed to upload file'));
                setStudentDocument(null);
                return;
            }

            setUploadedDocUrl(data.url);
        } catch (error) {
            console.error('Upload error:', error);
            alert(locale === 'th' ? 'เกิดข้อผิดพลาดในการอัปโหลด' : 'Upload error occurred');
            setStudentDocument(null);
        } finally {
            setIsUploading(false);
        }
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
                alert(locale === 'th' ? 'กรุณาเลือกประเทศ' : 'Please select country');
                setIsLoading(false);
                return;
            }

            // Validate student document for students
            const isStudent = activeTab === 'thaiStudent' || activeTab === 'internationalStudent';
            if (isStudent && !uploadedDocUrl) {
                alert(locale === 'th' ? 'กรุณาอัปโหลดเอกสารยืนยันความเป็นนักศึกษา' : 'Please upload student verification document');
                setIsLoading(false);
                return;
            }

            // API Call
            const response = await fetch('http://localhost:3002/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phone: phone || undefined,
                    password,
                    accountType: activeTab,
                    // Optional based on logic
                    organization: organization || undefined,
                    idCard: (activeTab === 'thaiStudent' || activeTab === 'thaiProfessional') ? idCard : undefined,
                    pharmacyLicenseId: (activeTab === 'thaiProfessional' && pharmacyLicenseId) ? pharmacyLicenseId : undefined,
                    passportId: (activeTab === 'internationalStudent' || activeTab === 'internationalProfessional') ? passportId : undefined,
                    country: (activeTab === 'internationalStudent' || activeTab === 'internationalProfessional') ? country : undefined,
                    // Student verification document URL from Google Drive
                    verificationDocUrl: uploadedDocUrl || undefined 
                }),
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

    const tabs: { id: TabType; label: string; labelTh: string }[] = [
        { id: 'thaiStudent', label: 'Thai Student', labelTh: 'นักศึกษาไทย' },
        { id: 'internationalStudent', label: 'International Student', labelTh: 'นักศึกษาต่างชาติ' },
        { id: 'thaiProfessional', label: 'Thai Medical Professional', labelTh: 'บุคลากรทางการแพทย์ไทย' },
        { id: 'internationalProfessional', label: 'International Medical Professional', labelTh: 'บุคลากรทางการแพทย์ต่างชาติ' }
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
    `;

    const PhoneInputAny = PhoneInput as any;

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
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', textAlign: 'center', marginBottom: '8px' }}>
                {locale === 'th' ? 'สร้างบัญชี' : 'Create Account'}
            </h2>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '24px' }}>
                {locale === 'th' ? 'เลือกประเภทผู้ใช้งาน' : 'Select your account type'}
            </p>

            {/* Tab Selector */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '12px 8px',
                            border: activeTab === tab.id ? '2px solid #1a237e' : '1px solid #e0e0e0',
                            borderRadius: '8px',
                            background: activeTab === tab.id ? '#f5f5ff' : '#fff',
                            color: activeTab === tab.id ? '#1a237e' : '#666',
                            fontSize: '12px',
                            fontWeight: activeTab === tab.id ? '600' : '400',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {locale === 'th' ? tab.labelTh : tab.label}
                    </button>
                ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
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
                                required style={inputStyle} />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                {locale === 'th' ? 'ประเทศ' : 'Country'} <span style={{ color: '#e53935' }}>*</span>
                            </label>
                            <select value={country} onChange={(e) => setCountry(e.target.value)} required
                                style={{ ...inputStyle, appearance: 'none', background: '#fff url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e") no-repeat right 12px center', backgroundSize: '16px' }}>
                                <option value="">{locale === 'th' ? 'เลือกประเทศ' : 'Select country'}</option>
                                {internationalCountries.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
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
                                if (file) handleFileUpload(file);
                            }}
                            disabled={isUploading}
                            style={{ display: 'none' }} 
                        />
                        <button
                            type="button"
                            onClick={() => document.getElementById('student-doc-input')?.click()}
                            disabled={isUploading}
                            style={{
                                width: '100%',
                                padding: '12px 14px',
                                fontSize: '15px',
                                border: uploadedDocUrl ? '2px solid #4caf50' : '2px solid #1a237e',
                                borderRadius: '8px',
                                background: uploadedDocUrl ? '#e8f5e9' : '#f5f5ff',
                                color: uploadedDocUrl ? '#2e7d32' : '#1a237e',
                                cursor: isUploading ? 'not-allowed' : 'pointer',
                                fontWeight: '500',
                                transition: 'all 0.2s ease',
                                opacity: isUploading ? 0.7 : 1
                            }}
                        >
                            {isUploading 
                                ? (locale === 'th' ? '⏳ กำลังอัปโหลด...' : '⏳ Uploading...')
                                : uploadedDocUrl 
                                    ? (locale === 'th' ? '✅ อัปโหลดสำเร็จ: ' : '✅ Uploaded: ') + (studentDocument?.name || 'Document')
                                    : (locale === 'th' ? '📁 เลือกไฟล์' : '📁 Choose File')
                            }
                        </button>
                        <p style={{ fontSize: '12px', color: uploadedDocUrl ? '#4caf50' : '#888', marginTop: '4px' }}>
                            {uploadedDocUrl 
                                ? (locale === 'th' ? 'ไฟล์ถูกอัปโหลดเรียบร้อยแล้ว' : 'File uploaded successfully')
                                : (locale === 'th' ? 'อัพโหลดใบรับรองนักศึกษา หรือเอกสารที่เกี่ยวข้อง (PDF, JPG, PNG)' : 'Upload student certificate or related document (PDF, JPG, PNG)')
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
            </form>

            {/* Login Link */}
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <p style={{ fontSize: '14px', color: '#666' }}>
                    {t('haveAccount')}{' '}
                    <Link href={`/${locale}/login`} style={{ color: '#1a237e', fontWeight: '600', textDecoration: 'none' }}>
                        {t('signIn')}
                    </Link>
                </p>
            </div>
        </div>
        </>
    );
}
