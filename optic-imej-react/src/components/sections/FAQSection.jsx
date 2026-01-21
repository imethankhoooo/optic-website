import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FAQSection = () => {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        { q: t('faq.q1'), a: t('faq.a1') },
        { q: t('faq.q2'), a: t('faq.a2') },
        { q: t('faq.q3'), a: t('faq.a3') },
        { q: t('faq.q4'), a: t('faq.a4') }
    ];

    return (
        <section className="py-20 relative z-10" style={{ backgroundColor: 'white' }}>
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-xs uppercase tracking-widest mb-4 inline-block"
                            style={{ color: 'var(--color-gold)' }}>
                            {t('faq.label')}
                        </span>
                        <h2 className="text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
                            {t('faq.title')}
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((item, i) => (
                            <div key={i}
                                className="rounded-xl overflow-hidden transition-all duration-300"
                                style={{
                                    backgroundColor: 'var(--color-light)',
                                    border: '1px solid rgba(0,0,0,0.05)'
                                }}>
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                                    className="w-full p-6 text-left flex justify-between items-center"
                                >
                                    <span className="font-medium pr-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                        {item.q}
                                    </span>
                                    <span className="text-xl transition-transform duration-300"
                                        style={{
                                            color: 'var(--color-gold)',
                                            transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)'
                                        }}>
                                        +
                                    </span>
                                </button>
                                <div className={`px-6 overflow-hidden transition-all duration-300 ${openIndex === i ? 'pb-6 max-h-40' : 'max-h-0'}`}>
                                    <p className="text-sm leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-body)' }}>
                                        {item.a}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
