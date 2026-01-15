'use client'
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function RegistrationInternationalFees() {
    const t = useTranslations('registration');
    const tCommon = useTranslations('common');
    const locale = useLocale();
    const { user, isAuthenticated } = useAuth();

    // Determine user type
    const isIntlStudent = user?.delegateType === 'international_student';
    const isIntlPharmacist = user?.delegateType === 'international_pharmacist';

    const pricingOptions = [
        {
            type: 'student',
            show: !isAuthenticated || isIntlStudent,
            title: locale === 'th' ? 'นักศึกษาต่างชาติ' : "Int'l Student",
            price: '$250',
            regularPrice: `$270 ${t('regular')}`,
            features: [
                t('fullConferenceAccess'),
                t('conferenceMaterials'),
                t('coffeeBreaksLunch'),
                t('certificateAttendance'),
                t('validStudentID')
            ]
        },
        {
            type: 'professional',
            show: !isAuthenticated || isIntlPharmacist,
            title: locale === 'th' ? 'เภสัชกรต่างชาติ' : "Int'l Professional",
            price: '$385',
            regularPrice: `$400 ${t('regular')}`,
            features: [
                t('fullConferenceAccess'),
                t('conferenceMaterials'),
                t('coffeeBreaksLunch'),
                t('certificateAttendance'),
                t('networkingEvents')
            ],
            highlighted: true
        },
        {
            type: 'addons',
            show: true,
            title: t('addons'),
            price: t('workshopPriceUSD'),
            regularPrice: t('perWorkshop'),
            features: [
                t('preConferenceWorkshop'),
                `9 ${locale === 'th' ? 'ก.ค. 2569' : 'July 2026'}`,
                t('handsOnTraining')
            ],
            addons: [
                {
                    price: t('galaPriceUSD'),
                    features: [
                        t('networkingDinner'),
                        t('entertainment')
                    ]
                }
            ]
        }
    ];

    const filteredOptions = pricingOptions.filter(option => option.show);

    return (
        <div className="pricing-lan-section-area sp1" style={{ backgroundColor: '#f5f5f5' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        <div className="heading2 text-center space-margin60">
                            <h5>{t('internationalDelegates')}</h5>
                            <div className="space18" />
                            <h2>{t('registrationFees')} (USD)</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {filteredOptions.map((option) => (
                        <div key={option.type} className={`col-lg-${filteredOptions.length === 1 ? '12' : filteredOptions.length === 2 ? '6' : '4'} col-md-6`}>
                            <div className="pricing-boxarea" style={option.highlighted ? { border: '2px solid #FFBA00' } : {}}>
                                <h5>{option.title}</h5>
                                <div className="space20" />
                                <h2>{option.price}</h2>
                                <div className="space8" />
                                <ul>
                                    {option.features.map((feature, idx) => (
                                        <li key={idx}><img src="/assets/img/icons/check2.svg" alt="" />{feature}</li>
                                    ))}
                                </ul>
                                {option.addons && (
                                    <>
                                        <div className="space20" />
                                        <h2>{option.addons[0].price}</h2>
                                        <ul>
                                            {option.addons[0].features.map((feature, idx) => (
                                                <li key={idx}><img src="/assets/img/icons/check2.svg" alt="" />{feature}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {option.type !== 'addons' && (
                                    <>
                                        <div className="space28" />
                                        <div className="btn-area1">
                                            <Link href={`/${locale}/checkout`} className="vl-btn1">{tCommon('registerNow')}</Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
