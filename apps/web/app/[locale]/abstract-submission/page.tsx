'use client'
import { useState, useEffect } from 'react'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations } from 'next-intl'

export default function AbstractSubmission() {
    const t = useTranslations('abstractSubmission')
    const tCommon = useTranslations('common')

    // Categories for abstract submission
    const categories = [
        t('categories.clinicalPharmacy'),
        t('categories.socialAdministrative'),
        t('categories.pharmaceuticalSciences'),
        t('categories.pharmacology'),
        t('categories.education'),
        t('categories.digitalPharmacy')
    ]

    const presentationTypes = [
        { value: "oral", label: t('presentationTypes.oral') },
        { value: "poster", label: t('presentationTypes.poster') },
        { value: "either", label: t('presentationTypes.either') }
    ]
    const [formData, setFormData] = useState({
        // Author Information
        firstName: '',
        lastName: '',
        email: '',
        affiliation: '',
        country: '',
        phone: '',

        // Abstract Details
        title: '',
        category: '',
        presentationType: '',
        keywords: '',

        // Abstract Content
        background: '',
        methods: '',
        results: '',
        conclusions: '',

        // File Upload
        abstractFile: null as File | null,

        // Declaration
        coi: 'no',
        coiDetails: '',
        agreeTerms: false,
        confirmOriginal: false
    })

    // Co-Authors state - separate for easier management
    const [coAuthors, setCoAuthors] = useState<Array<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        institution: string;
        country: string;
    }>>([])

    const addCoAuthor = () => {
        setCoAuthors([...coAuthors, {
            id: `coauthor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            firstName: '',
            lastName: '',
            email: '',
            institution: '',
            country: ''
        }])
    }

    const removeCoAuthor = (id: string) => {
        setCoAuthors(coAuthors.filter((author) => author.id !== id))
    }

    const handleCoAuthorChange = (id: string, field: string, value: string) => {
        setCoAuthors(coAuthors.map(author =>
            author.id === id ? { ...author, [field]: value } : author
        ))
    }

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [wordCount, setWordCount] = useState(0)

    const [trackingId, setTrackingId] = useState('')

    // Scroll to top when form is submitted successfully
    useEffect(() => {
        if (submitStatus === 'success') {
            setTrackingId(`ACCP2026-${Date.now().toString().slice(-6)}`)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [submitStatus])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target

        if (name === 'phone') {
            const numericValue = value.replace(/[^0-9]/g, '')
            setFormData(prev => ({ ...prev, [name]: numericValue }))
            return
        }

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked
            setFormData(prev => ({ ...prev, [name]: checked }))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }

        // Calculate word count for abstract sections
        if (['background', 'methods', 'results', 'conclusions'].includes(name)) {
            // Create updated form data with the new value
            const updatedData = {
                background: name === 'background' ? value : formData.background,
                methods: name === 'methods' ? value : formData.methods,
                results: name === 'results' ? value : formData.results,
                conclusions: name === 'conclusions' ? value : formData.conclusions
            }

            // Calculate total words from all sections
            const totalText = [
                updatedData.background,
                updatedData.methods,
                updatedData.results,
                updatedData.conclusions
            ].join(' ')

            const words = totalText.trim().split(/\s+/).filter(word => word.length > 0)
            setWordCount(words.length)
        }
    }

    // Multiple files state
    const [uploadedFiles, setUploadedFiles] = useState<Array<{
        id: string;
        file: File;
    }>>([])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        if (file) {
            const validTypes = ['.pdf']
            const fileExtension = file.name.substring(file.name.lastIndexOf('.'))
            if (!validTypes.includes(fileExtension.toLowerCase())) {
                alert('Please upload only PDF files')
                return
            }
            // Check for duplicate filename
            const isDuplicate = uploadedFiles.some(f => f.file.name === file.name)
            if (isDuplicate) {
                alert('This file has already been uploaded!')
                return
            }
            setUploadedFiles(prev => [...prev, {
                id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                file: file
            }])
            // Reset input value to allow re-selecting the same file
            e.target.value = ''
        }
    }

    const removeFile = (id: string) => {
        setUploadedFiles(prev => prev.filter(f => f.id !== id))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Validate word count
        if (wordCount < 250 || wordCount > 300) {
            alert(`Abstract word count must be between 250-300 words. Current: ${wordCount} words`)
            setIsSubmitting(false)
            return
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Here you would send to your backend API
            console.log('Form Data:', formData)

            setSubmitStatus('success')
        } catch (error) {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (submitStatus === 'success') {
        return (
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg16.png)' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 m-auto">
                                    <div className="heading1 text-center">
                                        <h1>{t('pageTitle')}</h1>
                                        <div className="space20" />
                                        <Link href="/">{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{t('breadcrumb')}</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sp1" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 m-auto">
                                    <div style={{
                                        backgroundColor: '#fff',
                                        padding: '60px',
                                        borderRadius: '16px',
                                        textAlign: 'center',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                                    }}>
                                        <div style={{
                                            width: '100px',
                                            height: '100px',
                                            backgroundColor: '#e8f5e9',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 24px'
                                        }}>
                                            <i className="fa-solid fa-check" style={{ fontSize: '48px', color: '#4caf50' }} />
                                        </div>
                                        <h2 style={{ color: '#1a1a2e', marginBottom: '16px' }}>{t('successTitle')}</h2>
                                        <p style={{ color: '#666', fontSize: '16px', marginBottom: '24px' }}>
                                            {t('successMessage')}
                                        </p>
                                        <p style={{ color: '#999', fontSize: '14px', marginBottom: '32px' }}>
                                            {t('trackingId')} <strong style={{ color: '#FFBA00' }}>{trackingId}</strong>
                                        </p>
                                    </div>

                                    {/* Submission Summary */}
                                    <div style={{ textAlign: 'left', marginTop: '30px' }}>
                                        {/* Author Information */}
                                        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
                                            <h4 style={{ color: '#1a1a2e', marginBottom: '16px', borderBottom: '2px solid #FFBA00', paddingBottom: '8px' }}>
                                                <i className="fa-solid fa-user" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                                Author Information
                                            </h4>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px' }}>
                                                <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                                                <p><strong>Email:</strong> {formData.email}</p>
                                                <p><strong>Phone:</strong> {formData.phone}</p>
                                                <p><strong>Institution:</strong> {formData.affiliation}</p>
                                                <p><strong>Country:</strong> {formData.country}</p>
                                            </div>
                                        </div>

                                        {/* Co-Authors */}
                                        {coAuthors.length > 0 && (
                                            <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
                                                <h4 style={{ color: '#1a1a2e', marginBottom: '16px', borderBottom: '2px solid #FFBA00', paddingBottom: '8px' }}>
                                                    <i className="fa-solid fa-users" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                                    Co-Authors ({coAuthors.length})
                                                </h4>
                                                {coAuthors.map((author, index) => (
                                                    <div key={author.id} style={{ padding: '10px', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '8px', fontSize: '14px' }}>
                                                        <strong>{index + 1}. {author.firstName} {author.lastName}</strong>
                                                        <span style={{ color: '#666', marginLeft: '12px' }}>{author.email}</span>
                                                        <span style={{ color: '#999', marginLeft: '12px' }}>({author.institution}, {author.country})</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Abstract Details */}
                                        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
                                            <h4 style={{ color: '#1a1a2e', marginBottom: '16px', borderBottom: '2px solid #FFBA00', paddingBottom: '8px' }}>
                                                <i className="fa-solid fa-file-alt" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                                Abstract Details
                                            </h4>
                                            <div style={{ fontSize: '14px' }}>
                                                <p><strong>Title:</strong> {formData.title}</p>
                                                <p><strong>Category:</strong> {formData.category}</p>
                                                <p><strong>Presentation Type:</strong> {formData.presentationType}</p>
                                            </div>
                                        </div>

                                        {/* Abstract Content */}
                                        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
                                            <h4 style={{ color: '#1a1a2e', marginBottom: '16px', borderBottom: '2px solid #FFBA00', paddingBottom: '8px' }}>
                                                <i className="fa-solid fa-align-left" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                                Abstract Content
                                            </h4>
                                            <div style={{ fontSize: '14px' }}>
                                                {formData.background && <p><strong>Background:</strong> {formData.background.substring(0, 200)}...</p>}
                                                {formData.methods && <p><strong>Methods:</strong> {formData.methods.substring(0, 200)}...</p>}
                                                {formData.results && <p><strong>Results:</strong> {formData.results.substring(0, 200)}...</p>}
                                                {formData.conclusions && <p><strong>Conclusions:</strong> {formData.conclusions.substring(0, 200)}...</p>}
                                            </div>
                                        </div>

                                        {/* Uploaded Files */}
                                        {uploadedFiles.length > 0 && (
                                            <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
                                                <h4 style={{ color: '#1a1a2e', marginBottom: '16px', borderBottom: '2px solid #FFBA00', paddingBottom: '8px' }}>
                                                    <i className="fa-solid fa-file-pdf" style={{ marginRight: '10px', color: '#FFBA00' }} />
                                                    Uploaded Files ({uploadedFiles.length})
                                                </h4>
                                                {uploadedFiles.map((f, index) => (
                                                    <p key={f.id} style={{ fontSize: '14px', color: '#2e7d32' }}>
                                                        <i className="fa-solid fa-check-circle" style={{ marginRight: '8px' }} />
                                                        {index + 1}. {f.file.name}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="btn-area" style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '16px',
                                        marginTop: '30px',
                                        flexWrap: 'wrap'
                                    }}>
                                        <a href="/abstract-submission" className="vl-btn1" style={{ width: 'auto', minWidth: '180px' }}>{tCommon('submitAbstract')}</a>
                                        <Link href="/" className="vl-btn2" style={{ width: 'auto', minWidth: '180px', marginLeft: 0 }}>{t('returnHome')}</Link>
                                        <Link href="/call-for-abstracts" className="vl-btn2" style={{ width: 'auto', minWidth: '180px', marginLeft: 0 }}>{t('viewGuidelines')}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout headerStyle={1} footerStyle={1}>
            <div>
                {/* Header */}
                <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg16.png)' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 m-auto">
                                <div className="heading1 text-center">
                                    <h1>{t('pageTitle')}</h1>
                                    <div className="space20" />
                                    <Link href="/">{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{t('breadcrumb')}</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="sp1" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                {/* Guidelines Link */}
                                <div className="guidelines-box">
                                    <p style={{ margin: 0, color: '#1565c0' }}>
                                        <i className="fa-solid fa-info-circle" style={{ marginRight: '8px' }} />
                                        {t('guidelineNote')} <Link href="/call-for-abstracts" style={{ color: '#1565c0', fontWeight: '600' }}>{t('guidelineLink')}</Link> {t('guidelineNote2')}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    {/* Section 1: Author Information */}
                                    <div className="submission-section">
                                        <h3 className="submission-section-title">
                                            <i className="fa-solid fa-user" style={{ marginRight: '12px', color: '#FFBA00' }} />
                                            {t('section1Title')}
                                        </h3>

                                        <div className="row">
                                            <div className="col-12 col-md-6">
                                                <div className="submission-input-group">
                                                    <label className="submission-label">{t('firstName')} *</label>
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                        className="submission-input"
                                                        required
                                                        placeholder={t('firstNamePlaceholder')}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="submission-input-group">
                                                    <label className="submission-label">{t('lastName')} *</label>
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                        className="submission-input"
                                                        required
                                                        placeholder={t('lastNamePlaceholder')}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12 col-md-6">
                                                <div className="submission-input-group">
                                                    <label className="submission-label">{t('email')} *</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="submission-input"
                                                        required
                                                        placeholder={t('emailPlaceholder')}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="submission-input-group">
                                                    <label className="submission-label">{t('phone')}</label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        className="submission-input"
                                                        placeholder={t('phonePlaceholder')}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12 col-md-8">
                                                <div className="submission-input-group">
                                                    <label className="submission-label">{t('affiliation')} *</label>
                                                    <input
                                                        type="text"
                                                        name="affiliation"
                                                        value={formData.affiliation}
                                                        onChange={handleInputChange}
                                                        className="submission-input"
                                                        required
                                                        placeholder={t('affiliationPlaceholder')}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-4">
                                                <div className="submission-input-group">
                                                    <label className="submission-label">{t('country')} *</label>
                                                    <input
                                                        type="text"
                                                        name="country"
                                                        value={formData.country}
                                                        onChange={handleInputChange}
                                                        className="submission-input"
                                                        required
                                                        placeholder={t('countryPlaceholder')}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 2: Co-Authors */}
                                    <div className="submission-section">
                                        <h3 className="submission-section-title">
                                            <i className="fa-solid fa-users" style={{ marginRight: '12px', color: '#FFBA00' }} />
                                            {t('section2Title')}
                                        </h3>

                                        {coAuthors.length === 0 ? (
                                            <p style={{ color: '#666', marginBottom: '16px', fontSize: '14px' }}>
                                                <i className="fa-solid fa-info-circle" style={{ marginRight: '8px' }} />
                                                คลิกปุ่มด้านล่างเพื่อเพิ่มผู้เขียนร่วม (ถ้ามี)
                                            </p>
                                        ) : (
                                            coAuthors.map((coAuthor, index) => (
                                                <div key={coAuthor.id} className="co-author-card">
                                                    <div className="co-author-header">
                                                        <h5 style={{ margin: 0, color: '#1a1a2e', fontSize: '16px' }}>
                                                            <i className="fa-solid fa-user" style={{ marginRight: '8px', color: '#FFBA00' }} />
                                                            Co-Author {index + 1}
                                                        </h5>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeCoAuthor(coAuthor.id)}
                                                            style={{
                                                                background: 'none',
                                                                border: 'none',
                                                                color: '#f44336',
                                                                cursor: 'pointer',
                                                                fontSize: '14px'
                                                            }}
                                                        >
                                                            <i className="fa-solid fa-trash" style={{ marginRight: '4px' }} />
                                                            Remove
                                                        </button>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-12 col-md-4">
                                                            <div className="submission-input-group">
                                                                <label className="submission-label">First Name *</label>
                                                                <input
                                                                    type="text"
                                                                    value={coAuthor.firstName}
                                                                    onChange={(e) => handleCoAuthorChange(coAuthor.id, 'firstName', e.target.value)}
                                                                    className="submission-input"
                                                                    placeholder="Enter first name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-4">
                                                            <div className="submission-input-group">
                                                                <label className="submission-label">Last Name *</label>
                                                                <input
                                                                    type="text"
                                                                    value={coAuthor.lastName}
                                                                    onChange={(e) => handleCoAuthorChange(coAuthor.id, 'lastName', e.target.value)}
                                                                    className="submission-input"
                                                                    placeholder="Enter last name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-4">
                                                            <div className="submission-input-group">
                                                                <label className="submission-label">Email *</label>
                                                                <input
                                                                    type="email"
                                                                    value={coAuthor.email}
                                                                    onChange={(e) => handleCoAuthorChange(coAuthor.id, 'email', e.target.value)}
                                                                    className="submission-input"
                                                                    placeholder="email@example.com"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-12 col-md-8">
                                                            <div className="submission-input-group">
                                                                <label className="submission-label">Institution *</label>
                                                                <input
                                                                    type="text"
                                                                    value={coAuthor.institution}
                                                                    onChange={(e) => handleCoAuthorChange(coAuthor.id, 'institution', e.target.value)}
                                                                    className="submission-input"
                                                                    placeholder="University / Hospital / Organization"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-4">
                                                            <div className="submission-input-group">
                                                                <label className="submission-label">Country *</label>
                                                                <input
                                                                    type="text"
                                                                    value={coAuthor.country}
                                                                    onChange={(e) => handleCoAuthorChange(coAuthor.id, 'country', e.target.value)}
                                                                    className="submission-input"
                                                                    placeholder="Country"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}

                                        <button
                                            type="button"
                                            onClick={addCoAuthor}
                                            className="btn-add-coauthor"
                                        >
                                            <i className="fa-solid fa-plus" />
                                            Add Co-Author
                                        </button>
                                    </div>

                                    {/* Section 3: Abstract Details */}
                                    <div className="submission-section">
                                        <h3 className="submission-section-title">
                                            <i className="fa-solid fa-file-alt" style={{ marginRight: '12px', color: '#FFBA00' }} />
                                            {t('section3Title')}
                                        </h3>

                                        <div className="submission-input-group">
                                            <label className="submission-label">{t('abstractTitle')} *</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                className="submission-input"
                                                required
                                                placeholder={t('abstractTitlePlaceholder')}
                                            />
                                        </div>

                                        <div className="row">
                                            <div className="col-12 col-md-6">
                                                <div className="submission-input-group">
                                                    <label className="submission-label">{t('category')} *</label>
                                                    <select
                                                        name="category"
                                                        value={formData.category}
                                                        onChange={handleInputChange}
                                                        className="submission-select"
                                                        required
                                                    >
                                                        <option value="">{t('selectCategory')}</option>
                                                        {categories.map((cat, index) => (
                                                            <option key={index} value={cat}>{cat}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="submission-input-group">
                                                    <label className="submission-label">{t('presentationType')} *</label>
                                                    <select
                                                        name="presentationType"
                                                        value={formData.presentationType}
                                                        onChange={handleInputChange}
                                                        className="submission-select"
                                                        required
                                                    >
                                                        <option value="">{t('selectPresentationType')}</option>
                                                        {presentationTypes.map((type, index) => (
                                                            <option key={index} value={type.value}>{type.label}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="submission-input-group">
                                            <label className="submission-label">{t('keywordsLabel')}</label>
                                            <input
                                                type="text"
                                                name="keywords"
                                                value={formData.keywords}
                                                onChange={handleInputChange}
                                                className="submission-input"
                                                required
                                                placeholder={t('keywordsPlaceholder')}
                                            />
                                        </div>
                                    </div>

                                    {/* Section 4: Abstract Content */}
                                    <div className="submission-section">
                                        <h3 className="submission-section-title">
                                            <i className="fa-solid fa-edit" style={{ marginRight: '12px', color: '#FFBA00' }} />
                                            {t('section4Title')}
                                        </h3>
                                        <p style={{ marginBottom: '24px', color: '#666', fontSize: '14px' }}>
                                            {t('wordCount')} <strong style={{ color: wordCount >= 250 && wordCount <= 300 ? '#4caf50' : '#f44336' }}>{wordCount}</strong> {t('wordCountRange')}
                                        </p>

                                        <div className="submission-input-group">
                                            <label className="submission-label">{t('background')} *</label>
                                            <textarea
                                                name="background"
                                                value={formData.background}
                                                onChange={handleInputChange}
                                                className="submission-input"
                                                style={{ minHeight: '100px', resize: 'vertical' }}
                                                required
                                                placeholder={t('backgroundPlaceholder')}
                                            />
                                        </div>

                                        <div className="submission-input-group">
                                            <label className="submission-label">{t('methods')} *</label>
                                            <textarea
                                                name="methods"
                                                value={formData.methods}
                                                onChange={handleInputChange}
                                                className="submission-input"
                                                style={{ minHeight: '100px', resize: 'vertical' }}
                                                required
                                                placeholder={t('methodsPlaceholder')}
                                            />
                                        </div>

                                        <div className="submission-input-group">
                                            <label className="submission-label">{t('results')} *</label>
                                            <textarea
                                                name="results"
                                                value={formData.results}
                                                onChange={handleInputChange}
                                                className="submission-input"
                                                style={{ minHeight: '100px', resize: 'vertical' }}
                                                required
                                                placeholder={t('resultsPlaceholder')}
                                            />
                                        </div>

                                        <div className="submission-input-group">
                                            <label className="submission-label">{t('conclusions')} *</label>
                                            <textarea
                                                name="conclusions"
                                                value={formData.conclusions}
                                                onChange={handleInputChange}
                                                className="submission-input"
                                                style={{ minHeight: '80px', resize: 'vertical' }}
                                                required
                                                placeholder={t('conclusionsPlaceholder')}
                                            />
                                        </div>
                                    </div>

                                    {/* Section 5: File Upload */}
                                    <div className="submission-section">
                                        <h3 className="submission-section-title">
                                            <i className="fa-solid fa-upload" style={{ marginRight: '12px', color: '#FFBA00' }} />
                                            {t('section5Title')}
                                        </h3>

                                        <div style={{
                                            border: '2px dashed #e0e0e0',
                                            borderRadius: '12px',
                                            padding: '40px',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            transition: 'border-color 0.3s ease',
                                            backgroundColor: '#f8f9fa'
                                        }}
                                            onClick={() => document.getElementById('abstract-file')?.click()}
                                        >
                                            <input
                                                type="file"
                                                id="abstract-file"
                                                onChange={handleFileChange}
                                                accept=".pdf"
                                                style={{ display: 'none' }}
                                            />
                                            <div style={{
                                                width: '64px',
                                                height: '64px',
                                                backgroundColor: '#fff',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: '0 auto 16px',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                                            }}>
                                                <i className="fa-solid fa-cloud-upload-alt" style={{ fontSize: '24px', color: '#FFBA00' }} />
                                            </div>
                                            <h4 style={{ fontSize: '18px', marginBottom: '8px', color: '#1a1a2e' }}>{t('chooseFile')}</h4>
                                            <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                                                {t('uploadNote')}
                                            </p>
                                        </div>

                                        {uploadedFiles.length > 0 && (
                                            <div style={{ marginTop: '24px' }}>
                                                <h5 style={{ fontSize: '16px', marginBottom: '12px', color: '#1a1a2e' }}>Uploaded Files:</h5>
                                                {uploadedFiles.map((f) => (
                                                    <div key={f.id} style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        padding: '12px 16px',
                                                        backgroundColor: '#f1f8e9',
                                                        borderRadius: '8px',
                                                        marginBottom: '8px',
                                                        border: '1px solid #c5e1a5'
                                                    }}>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <i className="fa-solid fa-file-pdf" style={{ color: '#e53935', marginRight: '12px', fontSize: '20px' }} />
                                                            <span style={{ fontSize: '14px', color: '#33691e', fontWeight: '500' }}>{f.file.name}</span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                removeFile(f.id);
                                                            }}
                                                            style={{
                                                                background: 'none',
                                                                border: 'none',
                                                                color: '#d32f2f',
                                                                cursor: 'pointer',
                                                                padding: '4px'
                                                            }}
                                                        >
                                                            <i className="fa-solid fa-times" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Declaration */}
                                    <div className="submission-section">
                                        <h3 className="submission-section-title">
                                            <i className="fa-solid fa-check-circle" style={{ marginRight: '12px', color: '#FFBA00' }} />
                                            {t('section6Title')}
                                        </h3>

                                        <div className="submission-input-group">
                                            <label className="submission-label">{t('coi')} *</label>
                                            <div style={{ display: 'flex', gap: '24px', marginTop: '8px' }}>
                                                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '15px' }}>
                                                    <input
                                                        type="radio"
                                                        name="coi"
                                                        value="no"
                                                        checked={formData.coi === 'no'}
                                                        onChange={handleInputChange}
                                                        style={{ width: '18px', height: '18px', marginRight: '8px', accentColor: '#FFBA00' }}
                                                    />
                                                    {t('noCoi')}
                                                </label>
                                                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '15px' }}>
                                                    <input
                                                        type="radio"
                                                        name="coi"
                                                        value="yes"
                                                        checked={formData.coi === 'yes'}
                                                        onChange={handleInputChange}
                                                        style={{ width: '18px', height: '18px', marginRight: '8px', accentColor: '#FFBA00' }}
                                                    />
                                                    {t('yesCoi')}
                                                </label>
                                            </div>
                                        </div>

                                        {formData.coi === 'yes' && (
                                            <div className="submission-input-group">
                                                <label className="submission-label">{t('coiDetails')} *</label>
                                                <textarea
                                                    name="coiDetails"
                                                    value={formData.coiDetails}
                                                    onChange={handleInputChange}
                                                    className="submission-input"
                                                    style={{ minHeight: '80px', resize: 'vertical' }}
                                                    required
                                                />
                                            </div>
                                        )}

                                        <div style={{ marginTop: '24px', borderTop: '1px solid #e0e0e0', paddingTop: '24px' }}>
                                            <label style={{ display: 'flex', gap: '12px', cursor: 'pointer', marginBottom: '16px' }}>
                                                <input
                                                    type="checkbox"
                                                    name="confirmOriginal"
                                                    checked={formData.confirmOriginal}
                                                    onChange={handleInputChange}
                                                    style={{ width: '20px', height: '20px', marginTop: '2px', accentColor: '#FFBA00' }}
                                                    required
                                                />
                                                <span style={{ fontSize: '15px', color: '#333', lineHeight: '1.5' }}>
                                                    I confirm that this abstract is my original work and has not been published or presented elsewhere.
                                                </span>
                                            </label>

                                            <label style={{ display: 'flex', gap: '12px', cursor: 'pointer' }}>
                                                <input
                                                    type="checkbox"
                                                    name="agreeTerms"
                                                    checked={formData.agreeTerms}
                                                    onChange={handleInputChange}
                                                    style={{ width: '20px', height: '20px', marginTop: '2px', accentColor: '#FFBA00' }}
                                                    required
                                                />
                                                <span style={{ fontSize: '15px', color: '#333', lineHeight: '1.5' }}>
                                                    I agree to the <Link href="/conditions-policies" style={{ color: '#FFBA00', textDecoration: 'underline' }}>terms and conditions</Link> of abstract submission.
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                                        <button
                                            type="submit"
                                            className="vl-btn1"
                                            disabled={isSubmitting}
                                            style={{
                                                padding: '16px 48px',
                                                fontSize: '16px',
                                                opacity: isSubmitting ? 0.7 : 1,
                                                cursor: isSubmitting ? 'not-allowed' : 'pointer'
                                            }}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }} />
                                                    Submitting...
                                                </>
                                            ) : (
                                                tCommon('submitAbstract')
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
