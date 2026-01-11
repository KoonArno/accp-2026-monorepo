'use client'
import { useState, useEffect } from 'react'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations, useLocale } from 'next-intl';
import { useAuth } from '@/context/AuthContext'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'

export default function Payment() {
	const t = useTranslations('payment');
	const tCheckout = useTranslations('checkout');
	const tCommon = useTranslations('common');
	const locale = useLocale();
	const { isAuthenticated, user } = useAuth();
	const router = useRouter();
	const searchParams = useSearchParams();

    // Determine currency based on user type or locale
    // Logic matches checkout page: text is Thai or user is Thai delegate -> THB
    const isThai = user?.delegateType?.includes('thai') || locale === 'th';
    const currencySymbol = isThai ? '฿' : '$';

	// Get payment method from URL, default to 'qr' if not specified
	const methodParam = searchParams.get('method') as 'qr' | 'card' | null;
	const [paymentMethod, setPaymentMethod] = useState<'qr' | 'card'>(methodParam || 'qr');
	const [isProcessing, setIsProcessing] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [qrTimer, setQrTimer] = useState(300); // 5 minutes

	// Card form states
	const [cardData, setCardData] = useState({
		cardNumber: '',
		cardholderName: '',
		expiryDate: '',
		cvv: ''
	});
	const [cardErrors, setCardErrors] = useState<Record<string, string>>({});

	// Get payment data from URL params
	const amount = searchParams.get('amount') || '0';
	const packageType = searchParams.get('package') || 'professional';
	const orderNumber = `ACCP2026-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

	// QR Timer countdown
	useEffect(() => {
		if (paymentMethod === 'qr' && qrTimer > 0 && !showSuccess) {
			const timer = setInterval(() => {
				setQrTimer(prev => prev - 1);
			}, 1000);
			return () => clearInterval(timer);
		}
	}, [paymentMethod, qrTimer, showSuccess]);

	// Check authentication
	useEffect(() => {
		if (!isAuthenticated) {
			router.push(`/${locale}/login`);
		}
	}, [isAuthenticated, router, locale]);

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	};

	const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		let formattedValue = value;

		// Format card number with spaces
		if (name === 'cardNumber') {
			formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
			if (formattedValue.length > 19) return;
		}

		// Format expiry date
		if (name === 'expiryDate') {
			formattedValue = value.replace(/\D/g, '');
			if (formattedValue.length >= 2) {
				formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
			}
			if (formattedValue.length > 5) return;
		}

		// Limit CVV to 4 digits
		if (name === 'cvv' && value.length > 4) return;

		setCardData(prev => ({ ...prev, [name]: formattedValue }));
		if (cardErrors[name]) {
			setCardErrors(prev => ({ ...prev, [name]: '' }));
		}
	};

	const validateCard = (): boolean => {
		const errors: Record<string, string> = {};

		if (!cardData.cardNumber) errors.cardNumber = t('validation.cardNumberRequired');
		else if (cardData.cardNumber.replace(/\s/g, '').length < 15) errors.cardNumber = t('validation.cardNumberInvalid');

		if (!cardData.cardholderName) errors.cardholderName = t('validation.cardholderNameRequired');
		if (!cardData.expiryDate) errors.expiryDate = t('validation.expiryDateRequired');
		else if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) errors.expiryDate = t('validation.expiryDateInvalid');

		if (!cardData.cvv) errors.cvv = t('validation.cvvRequired');
		else if (cardData.cvv.length < 3) errors.cvv = t('validation.cvvInvalid');

		setCardErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handlePayment = () => {
		if (paymentMethod === 'card' && !validateCard()) {
			return;
		}

		setIsProcessing(true);
		
		// Simulate payment processing
		setTimeout(() => {
			setIsProcessing(false);
			setShowSuccess(true);
		}, 2000);
	};

	const handleGenerateNewQR = () => {
		setQrTimer(300);
	};

	if (!isAuthenticated) {
		return null;
	}

	if (showSuccess) {
		return (
			<Layout headerStyle={1} footerStyle={1}>
				<div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg16.png)' }}>
					<div className="container">
						<div className="row">
							<div className="col-lg-9 m-auto">
								<div className="heading1 text-center">
									<h1>{t('paymentSuccess')}</h1>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="sp1">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-lg-6">
								<div style={{
									padding: '40px',
									border: '2px solid #00C853',
									borderRadius: '15px',
									backgroundColor: '#f0f9f6',
									textAlign: 'center'
								}}>
									<div style={{ fontSize: '80px', marginBottom: '20px' }}>✅</div>
									<h2 style={{ color: '#00C853', marginBottom: '20px' }}>{t('paymentSuccess')}</h2>
									<p style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>
										{t('paymentSuccessMessage')}
									</p>

									<div style={{
										backgroundColor: '#fff',
										padding: '20px',
										borderRadius: '10px',
										marginBottom: '30px',
										textAlign: 'left'
									}}>
										<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
											<span style={{ fontWeight: '600' }}>{t('orderNumber')}:</span>
											<span style={{ color: '#00C853', fontFamily: 'monospace' }}>{orderNumber}</span>
										</div>
										<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
											<span style={{ fontWeight: '600' }}>{t('paymentDate')}:</span>
											<span>{new Date().toLocaleDateString(locale)}</span>
										</div>
										<div style={{ display: 'flex', justifyContent: 'space-between' }}>
											<span style={{ fontWeight: '600' }}>{t('totalAmount')}:</span>
											<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#00C853' }}>{currencySymbol}{amount}</span>
										</div>
									</div>

									<div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
										<Link 
											href={`/${locale}/my-tickets`}
											style={{
												padding: '12px 30px',
												background: 'linear-gradient(135deg, #00C853 0%, #69F0AE 100%)',
												color: '#fff',
												borderRadius: '8px',
												textDecoration: 'none',
												fontWeight: '600'
											}}
										>
											{t('viewTicket')}
										</Link>
										<Link 
											href={`/${locale}`}
											style={{
												padding: '12px 30px',
												border: '2px solid #00C853',
												color: '#00C853',
												borderRadius: '8px',
												textDecoration: 'none',
												fontWeight: '600',
												backgroundColor: '#fff'
											}}
										>
											{t('backToHome')}
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}

	return (
		<Layout headerStyle={1} footerStyle={1}>
			<div>
				{/* Header */}
				<div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg16.png)' }}>
					<div className="container">
						<div className="row">
							<div className="col-lg-9 m-auto">
								<div className="heading1 text-center">
									<h1>{t('pageTitle')}</h1>
									<div className="space20" />
									<Link href={`/${locale}`}>{tCommon('home')} <i className="fa-solid fa-angle-right" /> 
										<Link href={`/${locale}/checkout`}>{tCheckout('breadcrumb')}</Link> <i className="fa-solid fa-angle-right" /> 
										<span>{t('breadcrumb')}</span>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Payment Section */}
				<div className="sp1">
					<div className="container">
						<div className="row">
							{/* Left Column - Payment Methods */}
							<div className="col-lg-8">
								{/* Payment Method Selection */}
								<div style={{ marginBottom: '30px' }}>
									<h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600' }}>
										{t('selectPaymentMethod')}
									</h3>
									<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
										<div
											onClick={() => setPaymentMethod('qr')}
											style={{
												padding: '25px',
												border: paymentMethod === 'qr' ? '3px solid #00C853' : '2px solid #ddd',
												borderRadius: '12px',
												cursor: 'pointer',
												backgroundColor: paymentMethod === 'qr' ? '#f0f9f6' : '#fff',
												textAlign: 'center',
												transition: 'all 0.3s ease'
											}}
										>
											<div style={{ fontSize: '50px', marginBottom: '15px' }}>📱</div>
											<h4 style={{ margin: '0 0 8px 0', fontWeight: '600' }}>{t('qrPayment')}</h4>
											<p style={{ color: '#666', fontSize: '14px', margin: 0 }}>{t('qrPaymentDesc')}</p>
										</div>

										<div
											onClick={() => setPaymentMethod('card')}
											style={{
												padding: '25px',
												border: paymentMethod === 'card' ? '3px solid #00C853' : '2px solid #ddd',
												borderRadius: '12px',
												cursor: 'pointer',
												backgroundColor: paymentMethod === 'card' ? '#f0f9f6' : '#fff',
												textAlign: 'center',
												transition: 'all 0.3s ease'
											}}
										>
											<div style={{ fontSize: '50px', marginBottom: '15px' }}>💳</div>
											<h4 style={{ margin: '0 0 8px 0', fontWeight: '600' }}>{t('cardPayment')}</h4>
											<p style={{ color: '#666', fontSize: '14px', margin: 0 }}>{t('cardPaymentDesc')}</p>
										</div>
									</div>
								</div>

								{/* QR Payment */}
								{paymentMethod === 'qr' && (
									<div style={{
										padding: '30px',
										border: '2px solid #00C853',
										borderRadius: '12px',
										backgroundColor: '#fff'
									}}>
										<h4 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600', textAlign: 'center' }}>
											{t('qrInstructions')}
										</h4>
										
										<div style={{ textAlign: 'center', marginBottom: '20px' }}>
											{qrTimer > 0 ? (
												<>
													{/* Mock QR Code */}
													<div style={{
														width: '250px',
														height: '250px',
														margin: '0 auto',
														backgroundColor: '#f5f5f5',
														border: '3px solid #00C853',
														borderRadius: '12px',
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'center',
														fontSize: '100px',
														marginBottom: '20px'
													}}>
														<div style={{ transform: 'rotate(45deg)' }}>◼</div>
													</div>
													
													<p style={{ 
														fontSize: '14px', 
														color: '#666',
														marginBottom: '15px',
														padding: '0 20px'
													}}>
														{t('scanToPayInstructions')}
													</p>

													<div style={{
														display: 'inline-block',
														padding: '10px 20px',
														backgroundColor: '#fff3cd',
														border: '2px solid #ffc107',
														borderRadius: '8px',
														color: '#856404'
													}}>
														<i className="fa-solid fa-clock" style={{ marginRight: '8px' }}></i>
														{t('qrExpiry')}: <strong>{formatTime(qrTimer)}</strong>
													</div>
												</>
											) : (
												<div>
													<p style={{ color: '#ff6b6b', fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
														{t('qrExpired')}
													</p>
													<button
														onClick={handleGenerateNewQR}
														style={{
															padding:  '12px 30px',
															backgroundColor: '#00C853',
															color: '#fff',
															border: 'none',
															borderRadius: '8px',
															fontSize: '16px',
															fontWeight: '600',
															cursor: 'pointer'
														}}
													>
														{t('generateNewQR')}
													</button>
												</div>
											)}
										</div>
									</div>
								)}

								{/* Card Payment */}
								{paymentMethod === 'card' && (
									<div style={{
										padding: '30px',
										border: '2px solid #00C853',
										borderRadius: '12px',
										backgroundColor: '#fff'
									}}>
										<h4 style={{ marginBottom: '25px', fontSize: '18px', fontWeight: '600' }}>
											{t('cardPayment')}
										</h4>

										<div style={{ marginBottom: '20px' }}>
											<label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
												{t('cardNumber')} <span style={{ color: '#ff6b6b' }}>*</span>
											</label>
											<input
												type="text"
												name="cardNumber"
												value={cardData.cardNumber}
												onChange={handleCardChange}
												placeholder={t('cardNumberPlaceholder')}
												style={{
													width: '100%',
													padding: '12px',
													border: cardErrors.cardNumber ? '2px solid #ff6b6b' : '1px solid #ddd',
													borderRadius: '8px',
													fontSize: '16px',
													fontFamily: 'monospace',
													boxSizing: 'border-box'
												}}
											/>
											{cardErrors.cardNumber && <p style={{ color: '#ff6b6b', fontSize: '12px', margin: '6px 0 0 0' }}>{cardErrors.cardNumber}</p>}
										</div>

										<div style={{ marginBottom: '20px' }}>
											<label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
												{t('cardholderName')} <span style={{ color: '#ff6b6b' }}>*</span>
											</label>
											<input
												type="text"
												name="cardholderName"
												value={cardData.cardholderName}
												onChange={handleCardChange}
												placeholder={t('cardholderNamePlaceholder')}
												style={{
													width: '100%',
													padding: '12px',
													border: cardErrors.cardholderName ? '2px solid #ff6b6b' : '1px solid #ddd',
													borderRadius: '8px',
													fontSize: '16px',
													textTransform: 'uppercase',
													boxSizing: 'border-box'
												}}
											/>
											{cardErrors.cardholderName && <p style={{ color: '#ff6b6b', fontSize: '12px', margin: '6px 0 0 0' }}>{cardErrors.cardholderName}</p>}
										</div>

										<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
											<div>
												<label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
													{t('expiryDate')} <span style={{ color: '#ff6b6b' }}>*</span>
												</label>
												<input
													type="text"
													name="expiryDate"
													value={cardData.expiryDate}
													onChange={handleCardChange}
													placeholder={t('expiryDatePlaceholder')}
													style={{
														width: '100%',
														padding: '12px',
														border: cardErrors.expiryDate ? '2px solid #ff6b6b' : '1px solid #ddd',
														borderRadius: '8px',
														fontSize: '16px',
														fontFamily: 'monospace',
														boxSizing: 'border-box'
													}}
												/>
												{cardErrors.expiryDate && <p style={{ color: '#ff6b6b', fontSize: '12px', margin: '6px 0 0 0' }}>{cardErrors.expiryDate}</p>}
											</div>

											<div>
												<label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
													{t('cvv')} <span style={{ color: '#ff6b6b' }}>*</span>
												</label>
												<input
													type="text"
													name="cvv"
													value={cardData.cvv}
													onChange={handleCardChange}
													placeholder={t('cvvPlaceholder')}
													maxLength={4}
													style={{
														width: '100%',
														padding: '12px',
														border: cardErrors.cvv ? '2px solid #ff6b6b' : '1px solid #ddd',
														borderRadius: '8px',
														fontSize: '16px',
														fontFamily: 'monospace',
														boxSizing: 'border-box'
													}}
												/>
												{cardErrors.cvv && <p style={{ color: '#ff6b6b', fontSize: '12px', margin: '6px 0 0 0' }}>{cardErrors.cvv}</p>}
											</div>
										</div>

										<div style={{
											marginTop: '20px',
											padding: '15px',
											backgroundColor: '#f0f9f6',
											borderRadius: '8px',
											fontSize: '13px',
											color: '#666'
										}}>
											<i className="fa-solid fa-shield-halved" style={{ color: '#00C853', marginRight: '8px' }}></i>
											{t('cardSecurity')}
										</div>
									</div>
								)}

								{/* Payment Button */}
								<button
									onClick={handlePayment}
									disabled={isProcessing || (paymentMethod === 'qr' && qrTimer === 0)}
									style={{
										width: '100%',
										padding: '18px',
										background: isProcessing ? '#ccc' : 'linear-gradient(135deg, #00C853 0%, #69F0AE 100%)',
										color: '#fff',
										border: 'none',
										borderRadius: '10px',
										fontSize: '18px',
										fontWeight: '600',
										cursor: isProcessing ? 'not-allowed' : 'pointer',
										marginTop: '25px',
										transition: 'opacity 0.3s ease'
									}}
									onMouseEnter={(e) => !isProcessing && (e.currentTarget.style.opacity = '0.9')}
									onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
								>
									{isProcessing ? (
										<>
											<i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '10px' }}></i>
											{t('processingPayment')}
										</>
									) : (
										<>
											<i className="fa-solid fa-lock" style={{ marginRight: '10px' }}></i>
											{t('completePayment')}
										</>
									)}
								</button>

								<div style={{
									marginTop: '15px',
									textAlign: 'center',
									fontSize: '13px',
									color: '#666'
								}}>
									<i className="fa-solid fa-shield" style={{ color: '#00C853', marginRight: '5px' }}></i>
									{t('securePayment')}
								</div>
							</div>

							{/* Right Column - Order Summary */}
							<div className="col-lg-4">
								<div style={{
									position: 'sticky',
									top: '20px',
									padding: '25px',
									border: '2px solid #00C853',
									borderRadius: '12px',
									backgroundColor: '#fff'
								}}>
									<h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>
										<i className="fa-solid fa-receipt" style={{ marginRight: '10px' }}></i>
										{t('orderSummary')}
									</h3>

									<div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
										<p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
											{tCheckout(`packages.${packageType}`)}
										</p>
									</div>

									<div style={{
										padding: '20px',
										backgroundColor: '#f0f9f6',
										borderRadius: '10px',
										textAlign: 'center',
										border: '2px solid #00C853'
									}}>
										<p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#666', textTransform: 'uppercase' }}>
											{t('totalAmount')}
										</p>
										<p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#00C853' }}>
											{currencySymbol}{amount}
										</p>
									</div>

									{isProcessing && (
										<div style={{
											marginTop: '20px',
											padding: '15px',
											backgroundColor: '#fff3cd',
											borderRadius: '8px',
											fontSize: '13px',
											color: '#856404',
											textAlign: 'center'
										}}>
											<i className="fa-solid fa-info-circle" style={{ marginRight: '8px' }}></i>
											{t('processingTime')}
										</div>
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
