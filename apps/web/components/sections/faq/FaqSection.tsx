'use client'
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function FaqSection() {
    const t = useTranslations('faq');
    const [isTab, setIsTab] = useState(1);
    const [isAccordion, setIsAccordion] = useState<number | null>(1);

    const handleTab = (i: number) => setIsTab(i);
    const handleAccordion = (key: number) => setIsAccordion(prevState => prevState === key ? null : key);

    // Data Structure for FAQs
    // Categories: 1=All, 2=EventInfo, 3=Registration, 4=Experience, 5=Speakers
    // We map the questions to categories. 
    // Since original code repeated q1-q5 for tab 2, q6-q10 for tab 3, etc.
    // I will group them logically based on the keys available.

    // Logic: 
    // Tab 1 (All): Show q1-q10
    // Tab 2 (Event Info): Show q1-q5
    // Tab 3 (Registration): Show q6-q10
    // Tab 4 (Experience): Show q1-q5 (Reusing logic from original template placeholder)
    // Tab 5 (Speakers): Show q6-q10 (Reusing logic)

    const tabs = [
        { id: 1, label: t('tabs.all'), target: 'pills-home' },
        { id: 2, label: t('tabs.eventInfo'), target: 'pills-profile' },
        { id: 3, label: t('tabs.registration'), target: 'pills-contact' },
        { id: 4, label: t('tabs.experience'), target: 'pills-contact1' },
        { id: 5, label: t('tabs.speakers'), target: 'pills-contact2' },
    ];

    const allQuestions = [
        { id: 1, q: t('q1') },
        { id: 2, q: t('q2') },
        { id: 3, q: t('q3') },
        { id: 4, q: t('q4') },
        { id: 5, q: t('q5') },
        { id: 6, q: t('q6') },
        { id: 7, q: t('q7') },
        { id: 8, q: t('q8') },
        { id: 9, q: t('q9') },
        { id: 10, q: t('q10') },
    ];

    // Filter questions based on active tab
    const getTabQuestions = (tabId: number) => {
        if (tabId === 1) return allQuestions;
        if (tabId === 2 || tabId === 4) return allQuestions.slice(0, 5); // q1-q5
        if (tabId === 3 || tabId === 5) return allQuestions.slice(5, 10); // q6-q10
        return [];
    };

    const currentQuestions = getTabQuestions(isTab);
    const midPoint = Math.ceil(currentQuestions.length / 2);
    const col1 = currentQuestions.slice(0, midPoint);
    const col2 = currentQuestions.slice(midPoint);

    // Helper to render accordion item
    const renderAccordionItem = (item: any, globalIndex: number) => {
        // Note: globalIndex is used for accordion ID to be unique in the DOM if needed, 
        // but here we use item.id for state tracking which matches the question number logic
        const isOpen = isAccordion === item.id;

        return (
            <div className="accordion-item" key={item.id}>
                <h2 className="accordion-header" onClick={() => handleAccordion(item.id)}>
                    <button className={`accordion-button ${isOpen ? '' : 'collapsed'}`} type="button">
                        {item.q}
                    </button>
                </h2>
                <div className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}>
                    <div className="accordion-body">
                        <p>{t('a1')}</p> {/* Using generic answer a1 for all as per template placeholder */}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="faq-inner-section-area sp1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 m-auto">
                        <div className="heading2 text-center space-margin60">
                            <h2>{t('pageTitle')}</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-11">
                        <div className="faq-widget-area">
                            <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                {tabs.map(tab => (
                                    <li className="nav-item" key={tab.id} onClick={() => handleTab(tab.id)}>
                                        <button
                                            className={`nav-link ${isTab === tab.id ? 'active' : ''}`}
                                            type="button"
                                        >
                                            {tab.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className="space48" />
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active">
                                    <div className="faq-section-area">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="accordian-area">
                                                    <div className="accordion">
                                                        {col1.map((item, index) => (
                                                            <div key={item.id}>
                                                                {renderAccordionItem(item, index)}
                                                                <div className="space20" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="accordian-area">
                                                    <div className="accordion">
                                                        {col2.map((item, index) => (
                                                            <div key={item.id}>
                                                                {renderAccordionItem(item, index)}
                                                                <div className="space20" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
