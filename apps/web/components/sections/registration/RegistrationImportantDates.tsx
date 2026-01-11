'use client'
import { useTranslations } from 'next-intl';

export default function RegistrationImportantDates() {
    const t = useTranslations('registration');

    return (
        <div className="sp1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        <div className="heading2 text-center space-margin60">
                            <h5>{t('importantDates')}</h5>
                            <div className="space18" />
                            <h2>{t('timeline')}</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="pricing-boxarea" style={{ backgroundColor: '#e8f5e9' }}>
                            <h5 style={{ color: '#2e7d32' }}>🟢 {t('earlyBird')}</h5>
                            <div className="space20" />
                            <h3>{t('dateRangeEarly')}</h3>
                            <div className="space8" />
                            <p>{t('saveUpTo')}</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="pricing-boxarea" style={{ backgroundColor: '#fff3e0' }}>
                            <h5 style={{ color: '#ef6c00' }}>🟠 {t('regular')}</h5>
                            <div className="space20" />
                            <h3>{t('dateRangeRegular')}</h3>
                            <div className="space8" />
                            <p>{t('standardRates')}</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="pricing-boxarea" style={{ backgroundColor: '#ffebee' }}>
                            <h5 style={{ color: '#c62828' }}>🔴 {t('registrationCloses')}</h5>
                            <div className="space20" />
                            <h3>{t('dateCloses')}</h3>
                            <div className="space8" />
                            <p>{t('lastDay')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
