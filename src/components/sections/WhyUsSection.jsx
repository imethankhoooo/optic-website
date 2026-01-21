import React from 'react';
import { useTranslation } from 'react-i18next';

const WhyUsSection = () => {
    const { t } = useTranslation();

    const features = [
        {
            number: '29+',
            label: t('whyus.years'),
            desc: t('whyus.years_desc')
        },
        {
            number: '3',
            label: t('whyus.generations'),
            desc: t('whyus.generations_desc')
        },
        {
            number: '100%',
            label: t('whyus.satisfaction'),
            desc: t('whyus.satisfaction_desc')
        }
    ];

    return (
        <section className="py-20 relative z-10" style={{ backgroundColor: 'white' }}>
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                    {/* Left: Text Content */}
                    <div>
                        <span className="text-xs uppercase tracking-widest mb-4 inline-block"
                            style={{ color: 'var(--color-gold)' }}>
                            {t('whyus.label')}
                        </span>
                        <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                            {t('whyus.title')}
                        </h2>
                        <p className="text-base leading-relaxed mb-8" style={{ color: '#6b7280', fontFamily: 'var(--font-body)' }}>
                            {t('whyus.text')}
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-6">
                            {features.map((item, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-heading)' }}>
                                        {item.number}
                                    </div>
                                    <div className="text-sm font-medium mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                                        {item.label}
                                    </div>
                                    <div className="text-xs" style={{ color: '#9ca3af' }}>
                                        {item.desc}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Image/Visual */}
                    <div className="relative">
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden"
                            style={{
                                backgroundColor: 'var(--color-light)',
                                border: '1px solid rgba(0,0,0,0.05)'
                            }}>
                            <img
                                src="/images/whyus_glasses.png"
                                alt={t('whyus.image_caption')}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl -z-10"
                            style={{ backgroundColor: 'rgba(201,169,110,0.1)' }} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyUsSection;
