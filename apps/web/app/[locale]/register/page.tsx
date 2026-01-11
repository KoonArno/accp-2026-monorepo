'use client'
import { useState, useEffect } from 'react'
import Layout from "@/components/layout/Layout"
import Link from "next/link"

// Delegate types
const delegateTypes = [
    { value: "student_undergraduate", label: "Student (Undergraduate)", priceUSD: 250, priceTHB: 4900, earlyBirdPriceUSD: 250, earlyBirdPriceTHB: 4900 },
    { value: "student_graduate", label: "Student (Graduate/Postgraduate)", priceUSD: 300, priceTHB: 5900, earlyBirdPriceUSD: 280, earlyBirdPriceTHB: 5500 },
    { value: "professional", label: "Professional / Academician", priceUSD: 400, priceTHB: 8900, earlyBirdPriceUSD: 385, earlyBirdPriceTHB: 7900 },
    { value: "presenter_oral", label: "Oral Presenter", priceUSD: 385, priceTHB: 7900, earlyBirdPriceUSD: 370, earlyBirdPriceTHB: 7500 },
    { value: "presenter_poster", label: "Poster Presenter", priceUSD: 385, priceTHB: 7900, earlyBirdPriceUSD: 370, earlyBirdPriceTHB: 7500 },
]

// Add-ons
const addOns = [
    { id: "workshop1", name: "Pre-conference Workshop 1", description: "Clinical Pharmacy Practice", priceUSD: 70, priceTHB: 2100 },
    { id: "workshop2", name: "Pre-conference Workshop 2", description: "Pharmacoeconomics", priceUSD: 70, priceTHB: 2100 },
    { id: "gala", name: "Gala Dinner", description: "July 10, 2026 Evening", priceUSD: 75, priceTHB: 2200 },
]

// Countries list (simplified)
const countries = [
    "Thailand", "Malaysia", "Indonesia", "Philippines", "Singapore", "Vietnam", "Myanmar", "Cambodia", "Laos",
    "Japan", "South Korea", "China", "Taiwan", "Hong Kong", "India", "Bangladesh", "Pakistan", "Sri Lanka",
    "Australia", "New Zealand", "United States", "United Kingdom", "Canada", "Germany", "France", "Netherlands",
    "Other"
]

// Payment methods
const paymentMethods = [
    { value: "credit_card", label: "Credit/Debit Card", icon: "fa-credit-card" },
    { value: "bank_transfer", label: "Bank Transfer", icon: "fa-building-columns" },
    { value: "promptpay", label: "PromptPay (Thai Only)", icon: "fa-qrcode" },
]

export default function Register() {
    const [step, setStep] = useState(1)
    const [isEarlyBird, setIsEarlyBird] = useState(true)
    const [formData, setFormData] = useState({
        // Personal Information
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        phone: '',
        affiliation: '',
        department: '',
        country: '',
        address: '',

        // Registration Details
        delegateType: '',
        selectedAddOns: [] as string[],
        dietaryRequirements: '',
        specialNeeds: '',

        // Payment
        paymentMethod: '',

        // Invoice
        needInvoice: false,
        invoiceName: '',
        invoiceAddress: '',
        invoiceTaxId: '',

        // Terms
        agreeTerms: false,
        agreePrivacy: false,
        subscribeNewsletter: false
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    // Check if early bird period
    useEffect(() => {
        const earlyBirdDeadline = new Date('2026-04-15')
        const now = new Date()
        setIsEarlyBird(now < earlyBirdDeadline)
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked
            setFormData(prev => ({ ...prev, [name]: checked }))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleAddOnChange = (addOnId: string) => {
        setFormData(prev => ({
            ...prev,
            selectedAddOns: prev.selectedAddOns.includes(addOnId)
                ? prev.selectedAddOns.filter(id => id !== addOnId)
                : [...prev.selectedAddOns, addOnId]
        }))
    }

    // Calculate total price
    const calculateTotal = () => {
        const isThai = formData.country === 'Thailand'
        let total = 0

        // Delegate type price
        const selectedDelegate = delegateTypes.find(d => d.value === formData.delegateType)
        if (selectedDelegate) {
            if (isThai) {
                total += isEarlyBird ? selectedDelegate.earlyBirdPriceTHB : selectedDelegate.priceTHB
            } else {
                total += isEarlyBird ? selectedDelegate.earlyBirdPriceUSD : selectedDelegate.priceUSD
            }
        }

        // Add-ons
        formData.selectedAddOns.forEach(addOnId => {
            const addOn = addOns.find(a => a.id === addOnId)
            if (addOn) {
                total += isThai ? addOn.priceTHB : addOn.priceUSD
            }
        })

        return {
            total,
            currency: isThai ? '฿' : '$',
            currencyCode: isThai ? 'THB' : 'USD'
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))
            console.log('Registration Data:', formData)
            setSubmitStatus('success')
        } catch (error) {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const nextStep = () => setStep(prev => Math.min(prev + 1, 4))
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

    const inputStyle = {
        width: '100%',
        padding: '14px 16px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '15px',
        transition: 'border-color 0.3s ease',
        outline: 'none'
    }

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '600' as const,
        color: '#1a1a2e',
        fontSize: '14px'
    }

    const sectionStyle = {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '16px',
        marginBottom: '24px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
    }

    const { total, currency, currencyCode } = calculateTotal()

    // Success Screen
    if (submitStatus === 'success') {
        return (
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg16.png)' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 m-auto">
                                    <div className="heading1 text-center">
                                        <h1>Registration</h1>
                                        <div className="space20" />
                                        <Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>Registration</span></Link>
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
                                        <h2 style={{ color: '#1a1a2e', marginBottom: '16px' }}>Registration Submitted!</h2>
                                        <p style={{ color: '#666', fontSize: '16px', marginBottom: '16px' }}>
                                            Thank you for registering for ACCP 2026 Bangkok.
                                        </p>
                                        <p style={{ color: '#999', fontSize: '14px', marginBottom: '24px' }}>
                                            Registration ID: <strong style={{ color: '#FFBA00' }}>REG-{Date.now().toString().slice(-8)}</strong>
                                        </p>

                                        <div style={{
                                            backgroundColor: '#fff3e0',
                                            padding: '20px',
                                            borderRadius: '12px',
                                            marginBottom: '24px',
                                            textAlign: 'left'
                                        }}>
                                            <h4 style={{ marginBottom: '12px', color: '#e65100' }}>
                                                <i className="fa-solid fa-info-circle" style={{ marginRight: '8px' }} />
                                                Next Steps
                                            </h4>
                                            <ul style={{ margin: 0, paddingLeft: '20px', color: '#666' }}>
                                                <li>Check your email for payment instructions</li>
                                                <li>Complete payment within 7 days to confirm your registration</li>
                                                <li>Invoice and confirmation will be sent after payment</li>
                                            </ul>
                                        </div>

                                        <div style={{
                                            backgroundColor: '#f5f5f5',
                                            padding: '20px',
                                            borderRadius: '12px',
                                            marginBottom: '32px'
                                        }}>
                                            <h4 style={{ marginBottom: '8px' }}>Total Amount Due</h4>
                                            <h2 style={{ color: '#FFBA00', margin: 0 }}>{currency}{total.toLocaleString()} {currencyCode}</h2>
                                        </div>

                                        <div className="btn-area1">
                                            <Link href="/" className="vl-btn1">Return to Home</Link>
                                        </div>
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
                                    <h1>Online Registration</h1>
                                    <div className="space20" />
                                    <Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>Register</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Steps */}
                <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e0e0e0', padding: '24px 0' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {[
                                        { num: 1, label: 'Personal Info' },
                                        { num: 2, label: 'Registration' },
                                        { num: 3, label: 'Payment' },
                                        { num: 4, label: 'Confirm' }
                                    ].map((s, index) => (
                                        <div key={s.num} style={{ display: 'flex', alignItems: 'center', flex: index < 3 ? 1 : 'none' }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                backgroundColor: step >= s.num ? '#FFBA00' : '#e0e0e0',
                                                color: step >= s.num ? '#1a1a2e' : '#999',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: '700',
                                                fontSize: '16px',
                                                transition: 'all 0.3s ease'
                                            }}>
                                                {step > s.num ? <i className="fa-solid fa-check" /> : s.num}
                                            </div>
                                            <span style={{
                                                marginLeft: '12px',
                                                fontWeight: step === s.num ? '600' : '400',
                                                color: step >= s.num ? '#1a1a2e' : '#999',
                                                fontSize: '14px'
                                            }}>
                                                {s.label}
                                            </span>
                                            {index < 3 && (
                                                <div style={{
                                                    flex: 1,
                                                    height: '2px',
                                                    backgroundColor: step > s.num ? '#FFBA00' : '#e0e0e0',
                                                    margin: '0 16px',
                                                    transition: 'all 0.3s ease'
                                                }} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="sp1" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <form onSubmit={handleSubmit}>
                                    {/* Step 1: Personal Information */}
                                    {step === 1 && (
                                        <div style={sectionStyle}>
                                            <h3 style={{ marginBottom: '24px', color: '#1a1a2e', borderBottom: '3px solid #FFBA00', paddingBottom: '12px', display: 'inline-block' }}>
                                                <i className="fa-solid fa-user" style={{ marginRight: '12px', color: '#FFBA00' }} />
                                                Personal Information
                                            </h3>

                                            <div className="row">
                                                <div className="col-md-2">
                                                    <div style={{ marginBottom: '20px' }}>
                                                        <label style={labelStyle}>Title *</label>
                                                        <select name="title" value={formData.title} onChange={handleInputChange} style={inputStyle} required>
                                                            <option value="">-</option>
                                                            <option value="Mr">Mr.</option>
                                                            <option value="Ms">Ms.</option>
                                                            <option value="Mrs">Mrs.</option>
                                                            <option value="Dr">Dr.</option>
                                                            <option value="Prof">Prof.</option>
                                                            <option value="Assoc Prof">Assoc. Prof.</option>
                                                            <option value="Asst Prof">Asst. Prof.</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div style={{ marginBottom: '20px' }}>
                                                        <label style={labelStyle}>First Name *</label>
                                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} style={inputStyle} required placeholder="First name" />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div style={{ marginBottom: '20px' }}>
                                                        <label style={labelStyle}>Last Name *</label>
                                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} style={inputStyle} required placeholder="Last name" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div style={{ marginBottom: '20px' }}>
                                                        <label style={labelStyle}>Email Address *</label>
                                                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} style={inputStyle} required placeholder="your.email@example.com" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div style={{ marginBottom: '20px' }}>
                                                        <label style={labelStyle}>Confirm Email *</label>
                                                        <input type="email" name="confirmEmail" value={formData.confirmEmail} onChange={handleInputChange} style={inputStyle} required placeholder="Confirm email address" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div style={{ marginBottom: '20px' }}>
                                                        <label style={labelStyle}>Phone Number *</label>
                                                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} style={inputStyle} required placeholder="+66 XX XXX XXXX" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div style={{ marginBottom: '20px' }}>
                                                        <label style={labelStyle}>Country *</label>
                                                        <select name="country" value={formData.country} onChange={handleInputChange} style={inputStyle} required>
                                                            <option value="">Select country</option>
                                                            {countries.map(country => (
                                                                <option key={country} value={country}>{country}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div style={{ marginBottom: '20px' }}>
                                                        <label style={labelStyle}>Affiliation / Institution *</label>
                                                        <input type="text" name="affiliation" value={formData.affiliation} onChange={handleInputChange} style={inputStyle} required placeholder="University / Hospital / Organization" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div style={{ marginBottom: '20px' }}>
                                                        <label style={labelStyle}>Department</label>
                                                        <input type="text" name="department" value={formData.department} onChange={handleInputChange} style={inputStyle} placeholder="Department / Faculty" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ marginBottom: '20px' }}>
                                                <label style={labelStyle}>Address</label>
                                                <textarea name="address" value={formData.address} onChange={handleInputChange} style={{ ...inputStyle, minHeight: '80px' }} placeholder="Full address for correspondence" />
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 2: Registration Details */}
                                    {step === 2 && (
                                        <>
                                            <div style={sectionStyle}>
                                                <h3 style={{ marginBottom: '24px', color: '#1a1a2e', borderBottom: '3px solid #FFBA00', paddingBottom: '12px', display: 'inline-block' }}>
                                                    <i className="fa-solid fa-ticket" style={{ marginRight: '12px', color: '#FFBA00' }} />
                                                    Delegate Type
                                                </h3>

                                                <div style={{ display: 'grid', gap: '12px' }}>
                                                    {delegateTypes.map(type => {
                                                        const isThai = formData.country === 'Thailand'
                                                        const price = isThai
                                                            ? (isEarlyBird ? type.earlyBirdPriceTHB : type.priceTHB)
                                                            : (isEarlyBird ? type.earlyBirdPriceUSD : type.priceUSD)
                                                        const currency = isThai ? '฿' : '$'

                                                        return (
                                                            <label key={type.value} style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                padding: '16px 20px',
                                                                border: formData.delegateType === type.value ? '2px solid #FFBA00' : '1px solid #e0e0e0',
                                                                borderRadius: '12px',
                                                                cursor: 'pointer',
                                                                backgroundColor: formData.delegateType === type.value ? '#fffbf0' : '#fff',
                                                                transition: 'all 0.3s ease'
                                                            }}>
                                                                <input
                                                                    type="radio"
                                                                    name="delegateType"
                                                                    value={type.value}
                                                                    checked={formData.delegateType === type.value}
                                                                    onChange={handleInputChange}
                                                                    style={{ marginRight: '16px' }}
                                                                />
                                                                <div style={{ flex: 1 }}>
                                                                    <strong style={{ color: '#1a1a2e' }}>{type.label}</strong>
                                                                </div>
                                                                <div style={{ textAlign: 'right' }}>
                                                                    <strong style={{ color: '#FFBA00', fontSize: '18px' }}>
                                                                        {currency}{price.toLocaleString()}
                                                                    </strong>
                                                                    {isEarlyBird && (
                                                                        <span style={{ display: 'block', fontSize: '12px', color: '#4caf50' }}>
                                                                            Early Bird
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </label>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                            <div style={sectionStyle}>
                                                <h3 style={{ marginBottom: '24px', color: '#1a1a2e', borderBottom: '3px solid #FFBA00', paddingBottom: '12px', display: 'inline-block' }}>
                                                    <i className="fa-solid fa-plus-circle" style={{ marginRight: '12px', color: '#FFBA00' }} />
                                                    Add-ons (Optional)
                                                </h3>

                                                <div style={{ display: 'grid', gap: '12px' }}>
                                                    {addOns.map(addOn => {
                                                        const isThai = formData.country === 'Thailand'
                                                        const price = isThai ? addOn.priceTHB : addOn.priceUSD
                                                        const currency = isThai ? '฿' : '$'
                                                        const isSelected = formData.selectedAddOns.includes(addOn.id)

                                                        return (
                                                            <label key={addOn.id} style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                padding: '16px 20px',
                                                                border: isSelected ? '2px solid #FFBA00' : '1px solid #e0e0e0',
                                                                borderRadius: '12px',
                                                                cursor: 'pointer',
                                                                backgroundColor: isSelected ? '#fffbf0' : '#fff',
                                                                transition: 'all 0.3s ease'
                                                            }}>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isSelected}
                                                                    onChange={() => handleAddOnChange(addOn.id)}
                                                                    style={{ marginRight: '16px' }}
                                                                />
                                                                <div style={{ flex: 1 }}>
                                                                    <strong style={{ color: '#1a1a2e' }}>{addOn.name}</strong>
                                                                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#666' }}>{addOn.description}</p>
                                                                </div>
                                                                <strong style={{ color: '#FFBA00', fontSize: '18px' }}>
                                                                    {currency}{price.toLocaleString()}
                                                                </strong>
                                                            </label>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                            <div style={sectionStyle}>
                                                <h3 style={{ marginBottom: '24px', color: '#1a1a2e', borderBottom: '3px solid #FFBA00', paddingBottom: '12px', display: 'inline-block' }}>
                                                    <i className="fa-solid fa-utensils" style={{ marginRight: '12px', color: '#FFBA00' }} />
                                                    Special Requirements
                                                </h3>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div style={{ marginBottom: '20px' }}>
                                                            <label style={labelStyle}>Dietary Requirements</label>
                                                            <select name="dietaryRequirements" value={formData.dietaryRequirements} onChange={handleInputChange} style={inputStyle}>
                                                                <option value="">No special requirements</option>
                                                                <option value="vegetarian">Vegetarian</option>
                                                                <option value="vegan">Vegan</option>
                                                                <option value="halal">Halal</option>
                                                                <option value="kosher">Kosher</option>
                                                                <option value="gluten_free">Gluten-free</option>
                                                                <option value="other">Other</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div style={{ marginBottom: '20px' }}>
                                                            <label style={labelStyle}>Special Needs / Accessibility</label>
                                                            <input type="text" name="specialNeeds" value={formData.specialNeeds} onChange={handleInputChange} style={inputStyle} placeholder="e.g., wheelchair access" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* Step 3: Payment */}
                                    {step === 3 && (
                                        <>
                                            <div style={sectionStyle}>
                                                <h3 style={{ marginBottom: '24px', color: '#1a1a2e', borderBottom: '3px solid #FFBA00', paddingBottom: '12px', display: 'inline-block' }}>
                                                    <i className="fa-solid fa-credit-card" style={{ marginRight: '12px', color: '#FFBA00' }} />
                                                    Payment Method
                                                </h3>

                                                <div style={{ display: 'grid', gap: '12px' }}>
                                                    {paymentMethods.map(method => (
                                                        <label key={method.value} style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            padding: '16px 20px',
                                                            border: formData.paymentMethod === method.value ? '2px solid #FFBA00' : '1px solid #e0e0e0',
                                                            borderRadius: '12px',
                                                            cursor: 'pointer',
                                                            backgroundColor: formData.paymentMethod === method.value ? '#fffbf0' : '#fff'
                                                        }}>
                                                            <input
                                                                type="radio"
                                                                name="paymentMethod"
                                                                value={method.value}
                                                                checked={formData.paymentMethod === method.value}
                                                                onChange={handleInputChange}
                                                                style={{ marginRight: '16px' }}
                                                            />
                                                            <i className={`fa-solid ${method.icon}`} style={{ marginRight: '12px', color: '#FFBA00', fontSize: '20px' }} />
                                                            <strong style={{ color: '#1a1a2e' }}>{method.label}</strong>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div style={sectionStyle}>
                                                <h3 style={{ marginBottom: '24px', color: '#1a1a2e', borderBottom: '3px solid #FFBA00', paddingBottom: '12px', display: 'inline-block' }}>
                                                    <i className="fa-solid fa-file-invoice" style={{ marginRight: '12px', color: '#FFBA00' }} />
                                                    Invoice Information
                                                </h3>

                                                <div style={{ marginBottom: '20px' }}>
                                                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                                        <input
                                                            type="checkbox"
                                                            name="needInvoice"
                                                            checked={formData.needInvoice}
                                                            onChange={handleInputChange}
                                                            style={{ marginRight: '12px' }}
                                                        />
                                                        <span>I need an invoice / tax receipt</span>
                                                    </label>
                                                </div>

                                                {formData.needInvoice && (
                                                    <>
                                                        <div style={{ marginBottom: '20px' }}>
                                                            <label style={labelStyle}>Invoice Name / Company Name *</label>
                                                            <input type="text" name="invoiceName" value={formData.invoiceName} onChange={handleInputChange} style={inputStyle} required={formData.needInvoice} placeholder="Name or company to appear on invoice" />
                                                        </div>
                                                        <div style={{ marginBottom: '20px' }}>
                                                            <label style={labelStyle}>Invoice Address *</label>
                                                            <textarea name="invoiceAddress" value={formData.invoiceAddress} onChange={handleInputChange} style={{ ...inputStyle, minHeight: '80px' }} required={formData.needInvoice} placeholder="Full address for invoice" />
                                                        </div>
                                                        <div style={{ marginBottom: '20px' }}>
                                                            <label style={labelStyle}>Tax ID / VAT Number</label>
                                                            <input type="text" name="invoiceTaxId" value={formData.invoiceTaxId} onChange={handleInputChange} style={inputStyle} placeholder="Tax identification number (if applicable)" />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </>
                                    )}

                                    {/* Step 4: Confirmation */}
                                    {step === 4 && (
                                        <>
                                            <div style={sectionStyle}>
                                                <h3 style={{ marginBottom: '24px', color: '#1a1a2e', borderBottom: '3px solid #FFBA00', paddingBottom: '12px', display: 'inline-block' }}>
                                                    <i className="fa-solid fa-clipboard-check" style={{ marginRight: '12px', color: '#FFBA00' }} />
                                                    Review Your Registration
                                                </h3>

                                                <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
                                                    <h5 style={{ marginBottom: '12px', color: '#1a1a2e' }}>Personal Information</h5>
                                                    <p style={{ margin: '4px 0', color: '#666' }}><strong>Name:</strong> {formData.title} {formData.firstName} {formData.lastName}</p>
                                                    <p style={{ margin: '4px 0', color: '#666' }}><strong>Email:</strong> {formData.email}</p>
                                                    <p style={{ margin: '4px 0', color: '#666' }}><strong>Affiliation:</strong> {formData.affiliation}</p>
                                                    <p style={{ margin: '4px 0', color: '#666' }}><strong>Country:</strong> {formData.country}</p>
                                                </div>

                                                <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
                                                    <h5 style={{ marginBottom: '12px', color: '#1a1a2e' }}>Registration Details</h5>
                                                    <p style={{ margin: '4px 0', color: '#666' }}>
                                                        <strong>Delegate Type:</strong> {delegateTypes.find(d => d.value === formData.delegateType)?.label}
                                                    </p>
                                                    {formData.selectedAddOns.length > 0 && (
                                                        <p style={{ margin: '4px 0', color: '#666' }}>
                                                            <strong>Add-ons:</strong> {formData.selectedAddOns.map(id => addOns.find(a => a.id === id)?.name).join(', ')}
                                                        </p>
                                                    )}
                                                    <p style={{ margin: '4px 0', color: '#666' }}>
                                                        <strong>Payment Method:</strong> {paymentMethods.find(p => p.value === formData.paymentMethod)?.label}
                                                    </p>
                                                </div>
                                            </div>

                                            <div style={sectionStyle}>
                                                <h3 style={{ marginBottom: '24px', color: '#1a1a2e', borderBottom: '3px solid #FFBA00', paddingBottom: '12px', display: 'inline-block' }}>
                                                    <i className="fa-solid fa-check-double" style={{ marginRight: '12px', color: '#FFBA00' }} />
                                                    Terms & Conditions
                                                </h3>

                                                <div style={{ marginBottom: '16px' }}>
                                                    <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                                                        <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleInputChange} style={{ marginRight: '12px', marginTop: '4px' }} required />
                                                        <span style={{ fontSize: '14px', color: '#333' }}>
                                                            I agree to the <Link href="/registration-policies" style={{ color: '#FFBA00' }}>registration policies and cancellation terms</Link> *
                                                        </span>
                                                    </label>
                                                </div>
                                                <div style={{ marginBottom: '16px' }}>
                                                    <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                                                        <input type="checkbox" name="agreePrivacy" checked={formData.agreePrivacy} onChange={handleInputChange} style={{ marginRight: '12px', marginTop: '4px' }} required />
                                                        <span style={{ fontSize: '14px', color: '#333' }}>
                                                            I agree to the privacy policy and consent to the collection of my personal data *
                                                        </span>
                                                    </label>
                                                </div>
                                                <div style={{ marginBottom: '16px' }}>
                                                    <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                                                        <input type="checkbox" name="subscribeNewsletter" checked={formData.subscribeNewsletter} onChange={handleInputChange} style={{ marginRight: '12px', marginTop: '4px' }} />
                                                        <span style={{ fontSize: '14px', color: '#333' }}>
                                                            Subscribe to ACCP 2026 newsletter for updates and announcements
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* Navigation Buttons */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
                                        {step > 1 ? (
                                            <button type="button" onClick={prevStep} className="vl-btn2">
                                                <i className="fa-solid fa-arrow-left" style={{ marginRight: '8px' }} />
                                                Previous
                                            </button>
                                        ) : <div />}

                                        {step < 4 ? (
                                            <button type="button" onClick={nextStep} className="vl-btn1">
                                                Next Step
                                                <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }} />
                                            </button>
                                        ) : (
                                            <button type="submit" className="vl-btn1" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
                                                {isSubmitting ? (
                                                    <>
                                                        <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }} />
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="fa-solid fa-check" style={{ marginRight: '8px' }} />
                                                        Complete Registration
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>

                            {/* Order Summary Sidebar */}
                            <div className="col-lg-4">
                                <div style={{
                                    backgroundColor: '#fff',
                                    padding: '24px',
                                    borderRadius: '16px',
                                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                    position: 'sticky',
                                    top: '100px'
                                }}>
                                    <h4 style={{ marginBottom: '20px', color: '#1a1a2e', borderBottom: '2px solid #FFBA00', paddingBottom: '12px' }}>
                                        Order Summary
                                    </h4>

                                    {formData.delegateType && (
                                        <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #eee' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                <span style={{ color: '#666' }}>{delegateTypes.find(d => d.value === formData.delegateType)?.label}</span>
                                                <strong style={{ color: '#1a1a2e' }}>
                                                    {currency}{(formData.country === 'Thailand'
                                                        ? (isEarlyBird ? delegateTypes.find(d => d.value === formData.delegateType)?.earlyBirdPriceTHB : delegateTypes.find(d => d.value === formData.delegateType)?.priceTHB)
                                                        : (isEarlyBird ? delegateTypes.find(d => d.value === formData.delegateType)?.earlyBirdPriceUSD : delegateTypes.find(d => d.value === formData.delegateType)?.priceUSD)
                                                    )?.toLocaleString()}
                                                </strong>
                                            </div>
                                            {isEarlyBird && (
                                                <span style={{ fontSize: '12px', color: '#4caf50', backgroundColor: '#e8f5e9', padding: '2px 8px', borderRadius: '4px' }}>
                                                    Early Bird Discount Applied
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {formData.selectedAddOns.length > 0 && (
                                        <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #eee' }}>
                                            <p style={{ fontSize: '13px', color: '#999', marginBottom: '8px' }}>ADD-ONS</p>
                                            {formData.selectedAddOns.map(addOnId => {
                                                const addOn = addOns.find(a => a.id === addOnId)
                                                const isThai = formData.country === 'Thailand'
                                                return addOn && (
                                                    <div key={addOnId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                        <span style={{ color: '#666', fontSize: '14px' }}>{addOn.name}</span>
                                                        <strong style={{ color: '#1a1a2e', fontSize: '14px' }}>
                                                            {currency}{(isThai ? addOn.priceTHB : addOn.priceUSD).toLocaleString()}
                                                        </strong>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <strong style={{ fontSize: '18px', color: '#1a1a2e' }}>Total</strong>
                                        <strong style={{ fontSize: '24px', color: '#FFBA00' }}>
                                            {currency}{total.toLocaleString()} {currencyCode}
                                        </strong>
                                    </div>

                                    {!formData.delegateType && (
                                        <p style={{ marginTop: '16px', fontSize: '13px', color: '#999', textAlign: 'center' }}>
                                            Select a delegate type to see pricing
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
