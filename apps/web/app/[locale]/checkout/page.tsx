"use client";
import { useState, useEffect } from "react";
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

interface RegistrationPackage {
  id: string;
  priceUSD: number;
  priceTHB: number;
  originalPriceUSD?: number;
  originalPriceTHB?: number;
  features: string[];
}

interface AddOn {
  id: string;
  priceUSD: number;
  priceTHB: number;
}

const registrationPackages: RegistrationPackage[] = [
  {
    id: "student",
    priceUSD: 250,
    priceTHB: 4900,
    originalPriceUSD: 270,
    originalPriceTHB: 4900,
    features: [
      "Full conference access",
      "Conference materials",
      "Certificate of attendance",
      "Networking sessions"
    ]
  },
  {
    id: "professional",
    priceUSD: 385,
    priceTHB: 7900,
    originalPriceUSD: 400,
    originalPriceTHB: 8900,
    features: [
      "Full conference access",
      "Conference materials",
      "Certificate of attendance",
      "Networking sessions",
      "Workshop access",
      "Premium seating"
    ]
  },
];

const addOns: AddOn[] = [
  {
    id: "workshop",
    priceUSD: 70,
    priceTHB: 2100,
  },
  {
    id: "gala",
    priceUSD: 75,
    priceTHB: 2200,
  },
];

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
  }, [isAuthenticated, user]);

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!checkoutData.firstName.trim()) newErrors.firstName = t("validation.firstNameRequired");
      if (!checkoutData.lastName.trim()) newErrors.lastName = t("validation.lastNameRequired");
      if (!checkoutData.email.trim()) newErrors.email = t("validation.emailRequired");
      if (!checkoutData.phone.trim()) newErrors.phone = t("validation.phoneRequired");
      if (!checkoutData.country.trim()) newErrors.country = t("validation.countryRequired");
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

  if (!isAuthenticated || isLoading) {
    return null;
  }

  const currentPackage = registrationPackages.find(p => p.id === checkoutData.selectedPackage);
  const packagePrice = isThai ? currentPackage?.priceUSD || 0 : currentPackage?.priceUSD || 0;
  
  const orderSummary = {
    packageItem: {
      id: checkoutData.selectedPackage,
      name: t(`packages.${checkoutData.selectedPackage}`),
      price: isThai ? currentPackage?.priceTHB || 0 : currentPackage?.priceUSD || 0
    },
    addOns: checkoutData.selectedAddOns.map(id => {
      const addon = addOns.find(a => a.id === id);
      return {
        id,
        name: t(`addOns.${id}`),
        price: isThai ? addon?.priceTHB || 0 : addon?.priceUSD || 0
      };
    })
  };

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
                <div style={{
                  backgroundColor: "#fff",
                  padding: "30px",
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  marginBottom: "24px"
                }}>

                  
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
                <div style={{
                  backgroundColor: "#fff",
                  padding: "30px",
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  marginBottom: "24px"
                }}>


                  {/* Locked Package Display */}
                  <div style={{
                    padding: "20px",
                    backgroundColor: "#f0f9f6",
                    border: "2px solid #00C853",
                    borderRadius: "12px",
                    marginBottom: "20px"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <i className="fa-solid fa-lock" style={{ fontSize: "24px", color: "#00C853" }} />
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a2e", margin: 0 }}>
                          {t(`packages.${checkoutData.selectedPackage}`)}
                        </h3>
                        <p style={{ fontSize: "12px", color: "#666", margin: "4px 0 0 0" }}>
                          Package locked based on your registration type
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        {currentPackage?.originalPriceUSD && (
                          <div style={{ fontSize: "14px", color: "#999", textDecoration: "line-through" }}>
                            {isThai ? `฿${currentPackage.originalPriceTHB}` : `$${currentPackage.originalPriceUSD}`}
                          </div>
                        )}
                        <div style={{ fontSize: "28px", fontWeight: "700", color: "#00C853" }}>
                          {isThai ? `฿${currentPackage?.priceTHB}` : `$${currentPackage?.priceUSD}`}
                        </div>
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
                        alignItems: "center",
                        padding: "12px",
                        marginBottom: "10px",
                        border: checkoutData.selectedAddOns.includes(addon.id) ? "2px solid #00C853" : "2px solid #e0e0e0",
                        borderRadius: "8px",
                        cursor: "pointer",
                        backgroundColor: checkoutData.selectedAddOns.includes(addon.id) ? "#f0f9f6" : "#fff",
                        transition: "all 0.3s ease"
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checkoutData.selectedAddOns.includes(addon.id)}
                        onChange={(e) => {
                          const newAddOns = e.target.checked
                            ? [...checkoutData.selectedAddOns, addon.id]
                            : checkoutData.selectedAddOns.filter(id => id !== addon.id);
                          updateCheckoutData({ selectedAddOns: newAddOns });
                        }}
                        style={{ marginRight: "12px", width: "18px", height: "18px" }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: "600", fontSize: "15px" }}>{t(`addOns.${addon.id}`)}</div>
                      </div>
                      <div style={{ fontSize: "16px", fontWeight: "700", color: "#00C853" }}>
                        {isThai ? `฿${addon.priceTHB}` : `$${addon.priceUSD}`}
                      </div>
                    </label>
                  ))}
                </div>

                {/* Section 3: Special Requirements */}
                <div style={{
                  backgroundColor: "#fff",
                  padding: "30px",
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  marginBottom: "24px"
                }}>


                  <FormInput
                    label={t("institution")}
                    type="text"
                    name="institution"
                    value={checkoutData.institution}
                    onChange={(e) => updateCheckoutData({ institution: e.target.value })}
                    icon="fa-solid fa-building"
                  />

                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px" }}>
                      {t("dietaryRequirement")}
                    </label>
                    <select
                      value={checkoutData.dietaryRequirement}
                      onChange={(e) => updateCheckoutData({ dietaryRequirement: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        fontSize: "15px"
                      }}
                    >
                      <option value="none">{t("dietaryOptions.none")}</option>
                      <option value="vegetarian">{t("dietaryOptions.vegetarian")}</option>
                      <option value="vegan">{t("dietaryOptions.vegan")}</option>
                      <option value="halal">{t("dietaryOptions.halal")}</option>
                      <option value="other">{t("dietaryOptions.other")}</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px" }}>
                      {t("specialNeeds")}
                    </label>
                    <textarea
                      value={checkoutData.specialNeeds}
                      onChange={(e) => updateCheckoutData({ specialNeeds: e.target.value })}
                      placeholder={t("specialNeedsPlaceholder")}
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        fontSize: "15px",
                        minHeight: "80px",
                        resize: "vertical"
                      }}
                    />
                  </div>
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
                  <div style={{
                    backgroundColor: "#fff",
                    padding: "24px",
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    marginTop: "20px"
                  }}>
                    <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px", color: "#1a1a2e" }}>
                      {t("paymentMethod")}
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
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
