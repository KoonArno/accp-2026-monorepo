'use client'
import { useTranslations } from 'next-intl';

export default function ContactForm() {
    const t = useTranslations('contact');
    const tCommon = useTranslations('common');

    return (
        <div className="contact4-boxarea">
            <h3 className="text-anime-style-3">{t('getInTouch')}</h3>
            <div className="space8" />
            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <div className="input-area">
                        <input type="text" placeholder={t('name')} />
                    </div>
                </div>
                <div className="col-lg-6 col-md-6">
                    <div className="input-area">
                        <input
                            type="tel"
                            placeholder={tCommon('phone')}
                            onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')
                            }}
                            inputMode="numeric"
                        />
                    </div>
                </div>
                <div className="col-lg-12 col-md-6">
                    <div className="input-area">
                        <input type="email" placeholder={t('emailAddress')} />
                    </div>
                </div>
                <div className="col-lg-12 col-md-6">
                    <div className="input-area">
                        <input type="text" placeholder={t('subject')} />
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="input-area">
                        <textarea placeholder={t('message')} />
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="space24" />
                    <div className="input-area text-end">
                        <button type="submit" className="vl-btn1">{t('send')}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
