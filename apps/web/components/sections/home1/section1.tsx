'use client'
import Countdown from '@/components/elements/Countdown'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Section1() {
    const [language, setLanguage] = useState<'th' | 'en'>('en')

    useEffect(() => {
        const savedLang = localStorage.getItem('accp-language') as 'th' | 'en'
        if (savedLang) {
            setLanguage(savedLang)
        }
    }, [])

    const t = (thText: string, enText: string) => language === 'th' ? thText : enText

    return (
        <>
            <div className="hero1-section-area">
                <div className="bg1">
                    <img src="/assets/img/bg/header-bg2.png" alt="" className="header-bg1" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="hero1-header heading1">
                                <h5 data-aos="fade-left" data-aos-duration={800}>
                                    {t('การประชุมเภสัชกรรมคลินิกแห่งเอเชีย ครั้งที่ 25', 'The 25th Asian Conference on Clinical Pharmacy')}
                                </h5>
                                <div className="space16" />
                                <h1 className="text-anime-style-3">
                                    ACCP 2026
                                </h1>
                                <div className="space16" />
                                <p data-aos="fade-left" data-aos-duration={900}>
                                    {t(
                                        'เภสัชกรรมปฏิบัติไร้พรมแดน: ความร่วมมือเพื่อความยั่งยืนและการบูรณาการทางวัฒนธรรม',
                                        'Borderless Pharmacy Practice: The Collaboration for sustainability and Cultural Integration'
                                    )}
                                </p>
                                <div className="space32" />
                                <div className="btn-area1" data-aos="fade-left" data-aos-duration={1100}>
                                    <Link href="/registration" className="vl-btn1">{t('ลงทะเบียนเลย', 'Register Now')}</Link>
                                    <Link href="/call-for-abstracts" className="vl-btn2">{t('ส่งบทคัดย่อ', 'Submit Abstract')}</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="header-images">
                                <div className="img1" data-aos="zoom-in" data-aos-duration={1000}>
                                    <img src="/assets/img/all-images/hero/hero-img1.png" alt="ACCP 2026 Conference" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-1">
                            <Countdown />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
