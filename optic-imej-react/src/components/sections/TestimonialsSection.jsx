import React from 'react';
import { useTranslation } from 'react-i18next';

const TestimonialsSection = () => {
    const { t } = useTranslation();

    const testimonials = [
        {
            name: t('testimonials.person1_name'),
            role: t('testimonials.person1_role'),
            quote: t('testimonials.person1_quote'),
            avatar: '👤'
        },
        {
            name: t('testimonials.person2_name'),
            role: t('testimonials.person2_role'),
            quote: t('testimonials.person2_quote'),
            avatar: '👩'
        },
        {
            name: t('testimonials.person3_name'),
            role: t('testimonials.person3_role'),
            quote: t('testimonials.person3_quote'),
            avatar: '👨'
        }
    ];

    return (
        <section className="py-20 relative z-10" style={{ backgroundColor: 'var(--color-light)' }}>
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-xs uppercase tracking-widest mb-4 inline-block"
                        style={{ color: 'var(--color-gold)' }}>
                        {t('testimonials.label')}
                    </span>
                    <h2 className="text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
                        {t('testimonials.title')}
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((item, i) => (
                        <div key={i}
                            className="p-8 rounded-2xl"
                            style={{
                                backgroundColor: 'white',
                                border: '1px solid rgba(0,0,0,0.05)'
                            }}>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                                    style={{ backgroundColor: 'rgba(201,169,110,0.1)' }}>
                                    {item.avatar}
                                </div>
                                <div>
                                    <div className="font-medium" style={{ fontFamily: 'var(--font-heading)' }}>
                                        {item.name}
                                    </div>
                                    <div className="text-xs" style={{ color: '#9ca3af' }}>
                                        {item.role}
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-body)' }}>
                                "{item.quote}"
                            </p>
                            {/* Star rating */}
                            <div className="mt-4 flex gap-1">
                                {[...Array(5)].map((_, j) => (
                                    <span key={j} style={{ color: 'var(--color-gold)' }}>★</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
