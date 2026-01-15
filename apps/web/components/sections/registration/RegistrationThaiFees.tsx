'use client'
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function RegistrationThaiFees() {
    const t = useTranslations('registration');
    const tCommon = useTranslations('common');
    const locale = useLocale();
    const { user, isAuthenticated } = useAuth();

    // Determine user type
    const isThaiStudent = user?.delegateType === 'thai_student';
    const isThaiPharmacist = user?.delegateType === 'thai_pharmacist';

    const pricingOptions = [
        {
            type: 'student',
            show: !isAuthenticated || isThaiStudent,
            title: locale === 'th' ? 'นักศึกษาไทย' : 'Thai Student',
            price: t('studentPriceTHB'),
            regularPrice: t('studentRegularTHB'),
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
            show: !isAuthenticated || isThaiPharmacist,
            title: locale === 'th' ? 'เภสัชกรไทย' : 'Thai Professional',
            price: t('professionalPriceTHB'),
            regularPrice: t('professionalRegularTHB'),
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
            price: t('workshopPriceTHB'),
            regularPrice: t('perWorkshop'),
            features: [
                t('preConferenceWorkshop'),
                `9 ${locale === 'th' ? 'ก.ค. 2569' : 'July 2026'}`,
                t('handsOnTraining')
            ],
            addons: [
                {
                    price: t('galaPriceTHB'),
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
        <div className="pricing-lan-section-area sp1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        <div className="heading2 text-center space-margin60">
                            <h5>{t('thaiDelegates')}</h5>
                            <div className="space18" />
                            <h2>{t('registrationFees')} (THB)</h2>
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
