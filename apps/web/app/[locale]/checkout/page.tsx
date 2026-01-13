"use client";
import { useState, useEffect, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import StepIndicator from "@/components/checkout/StepIndicator";
import PackageCard from "@/components/checkout/PackageCard";
import OrderSummary from "@/components/checkout/OrderSummary";
import PaymentMethodCard from "@/components/checkout/PaymentMethodCard";
import { useCheckoutWizard } from "@/hooks/checkout/useCheckoutWizard";
import FormInput from "@/components/common/FormInput";
import Button from "@/components/common/Button";
import { formatCurrency } from "@/utils/currency";

import {
  registrationPackages,
  addOns,
  workshopOptions,
  type RegistrationPackage,
  type AddOn
} from "@/data/checkout";

export default function Registration() {
  const t = useTranslations("checkout");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    currentStep,
    checkoutData,
    updateCheckoutData,
    nextStep,
    previousStep,
    getSteps,
    isFirstStep,
    isLastStep
  } = useCheckoutWizard();

  const isThai = user?.country?.toLowerCase() === "thailand";
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/login`);
    } else {
      // Pre-fill user data
      updateCheckoutData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        country: user?.country || "",
        selectedPackage: user?.delegateType?.includes('student') ? 'student' : 'professional'
      });
      setIsLoading(false);
    }
  }, [isAuthenticated, user, locale, router, updateCheckoutData]);

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!checkoutData.firstName.trim()) newErrors.firstName = t("validation.firstNameRequired");
      if (!checkoutData.lastName.trim()) newErrors.lastName = t("validation.lastNameRequired");
      if (!checkoutData.email.trim()) newErrors.email = t("validation.emailRequired");
      if (!checkoutData.phone.trim()) newErrors.phone = t("validation.phoneRequired");
      if (!checkoutData.country.trim()) newErrors.country = t("validation.countryRequired");

      // Workshop validation
      if (checkoutData.selectedAddOns.includes('workshop') && !checkoutData.selectedWorkshopTopic) {
        newErrors.workshop = t("validation.workshopRequired");
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (isLastStep) {
        handleCheckout();
      } else {
        nextStep();
      }
    }
  };

  const handleCheckout = () => {
    const pkg = registrationPackages.find(p => p.id === checkoutData.selectedPackage);
    const packagePrice = isThai ? pkg?.priceTHB || 0 : pkg?.priceUSD || 0;
    const addOnsPrice = addOns
      .filter(a => checkoutData.selectedAddOns.includes(a.id))
      .reduce((sum, a) => (isThai ? sum + a.priceTHB : sum + a.priceUSD), 0);
    const total = packagePrice + addOnsPrice;

    router.push(`/${locale}/checkout/payment?amount=${total}&package=${checkoutData.selectedPackage}&method=${checkoutData.paymentMethod}`);
  };

  const currentPackage = registrationPackages.find(p => p.id === checkoutData.selectedPackage);

  const orderSummary = useMemo(() => {
    return {
      packageItem: {
        id: checkoutData.selectedPackage,
        name: t(`packages.${checkoutData.selectedPackage}`),
        price: isThai ? currentPackage?.priceTHB || 0 : currentPackage?.priceUSD || 0
      },
      addOns: checkoutData.selectedAddOns.map(id => {
        const addon = addOns.find(a => a.id === id);
        let details = '';

        if (id === 'workshop' && checkoutData.selectedWorkshopTopic) {
          const option = workshopOptions.find(o => o.value === checkoutData.selectedWorkshopTopic);
          if (option) details = option.label;
        }

        if (id === 'gala' && checkoutData.dietaryRequirement) {
          if (checkoutData.dietaryRequirement === 'other' && checkoutData.dietaryOtherText) {
            details = checkoutData.dietaryOtherText;
          } else {
            details = t(`dietaryOptions.${checkoutData.dietaryRequirement}`);
          }
        }

        return {
          id,
          name: t(`addOns.${id}`),
          price: isThai ? addon?.priceTHB || 0 : addon?.priceUSD || 0,
          details
        };
      })
    };
  }, [checkoutData.selectedPackage, checkoutData.selectedAddOns, checkoutData.selectedWorkshopTopic, checkoutData.dietaryRequirement, checkoutData.dietaryOtherText, isThai, currentPackage, t]);

  if (!isAuthenticated || isLoading) {
    return null;
  }



  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        {/* Header */}
        <div className="inner-page-header" style={{ backgroundImage: "url(/assets/img/bg/header-bg16.png)" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-9 m-auto">
                <div className="heading1 text-center">
                  <h1>{t("pageTitle")}</h1>
                  <div className="space20" />
                  <Link href={`/${locale}`}>
                    {tCommon("home")} <i className="fa-solid fa-angle-right" /> <span>{t("breadcrumb")}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Single Page Registration */}
        <div className="sp1" style={{ backgroundColor: "#f8f9fa" }}>
          <div className="container">
            <div className="row">
              {/* Main Content */}
              <div className="col-lg-8">
                {/* Section 1: Personal Information */}
                <div className="checkout-card">


                  <div className="row">
                    <div className="col-md-6">
                      <FormInput
                        label={t("firstName")}
                        type="text"
                        name="firstName"
                        value={checkoutData.firstName}
                        onChange={(e) => updateCheckoutData({ firstName: e.target.value })}
                        error={errors.firstName}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <FormInput
                        label={t("lastName")}
                        type="text"
                        name="lastName"
                        value={checkoutData.lastName}
                        onChange={(e) => updateCheckoutData({ lastName: e.target.value })}
                        error={errors.lastName}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormInput
                        label={t("email")}
                        type="email"
                        name="email"
                        value={checkoutData.email}
                        onChange={(e) => updateCheckoutData({ email: e.target.value })}
                        error={errors.email}
                        icon="fa-solid fa-envelope"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <FormInput
                        label={t("phone")}
                        type="tel"
                        name="phone"
                        value={checkoutData.phone}
                        onChange={(e) => updateCheckoutData({ phone: e.target.value })}
                        error={errors.phone}
                        icon="fa-solid fa-phone"
                        required
                      />
                    </div>
                  </div>

                  <FormInput
                    label={t("country")}
                    type="text"
                    name="country"
                    value={checkoutData.country}
                    onChange={(e) => updateCheckoutData({ country: e.target.value })}
                    error={errors.country}
                    icon="fa-solid fa-globe"
                    required
                  />
                </div>

                {/* Section 2: Package (Locked) */}
                <div className="checkout-card">


                  {/* Locked Package Display */}
                  <div className="checkout-package-locked">
                    <div className="checkout-package-info">
                      <i className="fa-solid fa-lock checkout-package-icon" />
                      <div className="checkout-package-text">
                        <h3>
                          {t(`packages.${checkoutData.selectedPackage}`)}
                        </h3>
                        <p>
                          Package locked based on your registration type
                        </p>
                      </div>
                    </div>
                    <div className="checkout-package-price-box">
                      {currentPackage?.originalPriceUSD && (
                        <div className="checkout-package-original-price">
                          {formatCurrency(isThai ? (currentPackage.originalPriceTHB || 0) : (currentPackage.originalPriceUSD || 0), locale)}
                        </div>
                      )}
                      <div className="checkout-package-current-price">
                        {formatCurrency(isThai ? (currentPackage?.priceTHB || 0) : (currentPackage?.priceUSD || 0), locale)}
                      </div>
                    </div>
                  </div>

                  {/* Add-ons */}
                  <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px" }}>
                    {t("addOnsTitle")} <span style={{ fontSize: "14px", fontWeight: "400", color: "#666" }}>(Optional)</span>
                  </h3>
                  {addOns.map((addon) => (
                    <label
                      key={addon.id}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "12px",
                        marginBottom: "10px",
                        border: checkoutData.selectedAddOns.includes(addon.id) ? "2px solid #00C853" : "2px solid #e0e0e0",
                        borderRadius: "8px",
                        cursor: "pointer",
                        backgroundColor: checkoutData.selectedAddOns.includes(addon.id) ? "#f0f9f6" : "#fff",
                        transition: "all 0.3s ease"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                        <input
                          type="checkbox"
                          checked={checkoutData.selectedAddOns.includes(addon.id)}
                          onChange={(e) => {
                            const newAddOns = e.target.checked
                              ? [...checkoutData.selectedAddOns, addon.id]
                              : checkoutData.selectedAddOns.filter(id => id !== addon.id);

                            // Clear workshop topic if unchecked
                            const updates: Partial<typeof checkoutData> = { selectedAddOns: newAddOns };
                            if (addon.id === 'workshop' && !e.target.checked) {
                              updates.selectedWorkshopTopic = '';
                            }
                            if (addon.id === 'gala' && !e.target.checked) {
                              updates.dietaryRequirement = 'none';
                            }
                            updateCheckoutData(updates);
                          }}
                          style={{ marginRight: "12px", width: "18px", height: "18px" }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: "600", fontSize: "15px" }}>{t(`addOns.${addon.id}`)}</div>
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: "700", color: "#00C853" }}>
                          {formatCurrency(isThai ? addon.priceTHB : addon.priceUSD, locale)}
                        </div>
                      </div>

                      {/* Workshop Sub-options */}
                      {addon.id === 'workshop' && checkoutData.selectedAddOns.includes('workshop') && (
                        <div style={{
                          marginLeft: '30px',
                          marginTop: '8px',
                          borderLeft: '2px solid #e0e0e0',
                          paddingLeft: '16px',
                          display: 'grid',
                          gap: '10px'
                        }} className="checkout-grid-2">
                          {workshopOptions.map(option => (
                            <label key={option.value} style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '12px',
                              cursor: option.isFull ? 'not-allowed' : 'pointer',
                              backgroundColor: option.isFull ? '#fcfcfc' : (checkoutData.selectedWorkshopTopic === option.value ? '#e8f5e9' : '#fff'),
                              border: checkoutData.selectedWorkshopTopic === option.value ? '2px solid #00C853' : '1px solid #e0e0e0',
                              borderRadius: '8px',
                              transition: 'all 0.2s ease',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                              opacity: option.isFull ? 0.8 : 1,
                              width: "100%"
                            }} className="checkout-option-label">
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                  type="radio"
                                  name="workshopTopic"
                                  value={option.value}
                                  checked={checkoutData.selectedWorkshopTopic === option.value}
                                  onChange={(e) => updateCheckoutData({ selectedWorkshopTopic: e.target.value })}
                                  style={{ display: 'none' }}
                                  disabled={option.isFull}
                                />
                                <div style={{ marginRight: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px' }}>
                                  {checkoutData.selectedWorkshopTopic === option.value ? (
                                    <i className="fa-solid fa-circle-check" style={{ color: '#00C853', fontSize: '20px' }} />
                                  ) : (
                                    <div style={{
                                      width: '18px',
                                      height: '18px',
                                      borderRadius: '50%',
                                      border: '2px solid #ddd',
                                      backgroundColor: option.isFull ? '#e0e0e0' : 'transparent'
                                    }} />
                                  )}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <span style={{ fontSize: '13px', color: '#333', fontWeight: checkoutData.selectedWorkshopTopic === option.value ? '600' : '500' }}>
                                    {option.label}
                                  </span>
                                  {/* Participant Count */}
                                  <span style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>
                                    <i className="fa-solid fa-user-group" style={{ fontSize: '10px', marginRight: '4px' }} />
                                    {option.count ? `${option.count}/50` : '0/50'}
                                  </span>
                                </div>
                              </div>

                              {/* Full Label (Right Side) */}
                              {option.isFull && (
                                <span style={{
                                  fontSize: '11px',
                                  color: '#d32f2f',
                                  fontWeight: '700',
                                  background: '#ffebee',
                                  padding: '2px 8px',
                                  borderRadius: '12px',
                                  whiteSpace: 'nowrap'
                                }}>
                                  Full / เต็มแล้ว
                                </span>
                              )}
                            </label>
                          ))}
                          {errors.workshop && (
                            <div style={{
                              color: '#d32f2f',
                              fontSize: '13px',
                              marginTop: '8px',
                              marginLeft: '30px',
                              fontWeight: '600'
                            }}>
                              {errors.workshop}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Gala Dinner Sub-options */}
                      {addon.id === 'gala' && checkoutData.selectedAddOns.includes('gala') && (
                        <div style={{
                          marginLeft: '30px',
                          marginTop: '8px',
                          borderLeft: '2px solid #e0e0e0',
                          paddingLeft: '16px'
                        }}>
                          <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
                            Optional
                          </div>
                          <div style={{
                            display: 'grid',
                            gap: '10px'
                          }} className="checkout-grid-2">
                            {[
                              { value: 'vegetarian', label: t("dietaryOptions.vegetarian") },
                              { value: 'vegan', label: t("dietaryOptions.vegan") },
                              { value: 'halal', label: t("dietaryOptions.halal") },
                              { value: 'other', label: t("dietaryOptions.other") }
                            ].map(option => (
                              <label key={option.value} style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '12px',
                                cursor: 'pointer',
                                backgroundColor: checkoutData.dietaryRequirement === option.value ? '#e8f5e9' : '#fff',
                                border: checkoutData.dietaryRequirement === option.value ? '2px solid #00C853' : '1px solid #e0e0e0',
                                borderRadius: '8px',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                              }} className="checkout-option-label">
                                <input
                                  type="radio"
                                  name="dietaryRequirement"
                                  value={option.value}
                                  checked={checkoutData.dietaryRequirement === option.value}
                                  onChange={(e) => {
                                    updateCheckoutData({
                                      dietaryRequirement: e.target.value,
                                      dietaryOtherText: e.target.value !== 'other' ? '' : checkoutData.dietaryOtherText
                                    });
                                  }}
                                  style={{ display: 'none' }}
                                />
                                <div style={{ marginRight: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px' }}>
                                  {checkoutData.dietaryRequirement === option.value ? (
                                    <i className="fa-solid fa-circle-check" style={{ color: '#00C853', fontSize: '20px' }} />
                                  ) : (
                                    <div style={{
                                      width: '18px',
                                      height: '18px',
                                      borderRadius: '50%',
                                      border: '2px solid #ddd',
                                      backgroundColor: 'transparent'
                                    }} />
                                  )}
                                </div>
                                <span style={{ fontSize: '13px', color: '#333', fontWeight: checkoutData.dietaryRequirement === option.value ? '600' : '500' }}>
                                  {option.label}
                                </span>
                              </label>
                            ))}
                          </div>

                          {/* Other text input */}
                          {checkoutData.dietaryRequirement === 'other' && (
                            <div style={{ marginTop: '12px' }}>
                              <input
                                type="text"
                                placeholder="Special requirements"
                                value={checkoutData.dietaryOtherText}
                                onChange={(e) => updateCheckoutData({ dietaryOtherText: e.target.value })}
                                style={{
                                  width: '100%',
                                  padding: '12px',
                                  border: '1px solid #e0e0e0',
                                  borderRadius: '8px',
                                  fontSize: '14px',
                                  boxSizing: 'border-box',
                                  backgroundColor: '#fff'
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </label>
                  ))}
                </div>



              </div>

              {/* Order Summary Sidebar */}
              <div className="col-lg-4">
                <div style={{ position: 'sticky', top: '20px' }}>
                  <OrderSummary
                    packageItem={orderSummary.packageItem}
                    addOns={orderSummary.addOns}
                    isThai={isThai}
                    onRemoveAddOn={(id) => {
                      const newAddOns = checkoutData.selectedAddOns.filter(addon => addon !== id);
                      updateCheckoutData({ selectedAddOns: newAddOns });
                    }}
                  />

                  {/* Payment Method Section */}
                  <div className="checkout-card" style={{ marginTop: "20px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px", color: "#1a1a2e" }}>
                      {t("paymentMethod")}
                    </h3>
                    <div className="checkout-grid-2">
                      <PaymentMethodCard
                        id="qr"
                        title="QR Payment"
                        description="Scan to pay with mobile banking"
                        icon="📱"
                        isSelected={checkoutData.paymentMethod === "qr"}
                        onSelect={(id) => updateCheckoutData({ paymentMethod: id as 'qr' | 'card' })}
                        processingTime="Instant"
                      />
                      <PaymentMethodCard
                        id="card"
                        title="Credit Card"
                        description="Pay securely with your card"
                        icon="💳"
                        isSelected={checkoutData.paymentMethod === "card"}
                        onSelect={(id) => updateCheckoutData({ paymentMethod: id as 'qr' | 'card' })}
                        processingTime="2-3 minutes"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div style={{ marginTop: "20px" }}>
                    <Button
                      variant="primary"
                      onClick={handleCheckout}
                      icon="fa-solid fa-lock"
                      fullWidth={true}
                      style={{ padding: "16px 24px", fontSize: "16px" }}
                    >
                      {t("proceedToPayment")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
