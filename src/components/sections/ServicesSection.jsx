import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceCard from '../common/ServiceCard';
import MagneticButton from '../common/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
    const { t } = useTranslation();
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const cardsRef = useRef(null);
    const buttonRef = useRef(null);

    const services = [
        {
            icon: '👁️',
            title: t('services.exam_title'),
            description: t('services.exam_desc')
        },
        {
            icon: '🕶️',
            title: t('services.lenses_title'),
            description: t('services.lenses_desc')
        },
        {
            icon: '👶',
            title: t('services.myopia_title'),
            description: t('services.myopia_desc')
        },
        {
            icon: '📦',
            title: t('services.brands_title'),
            description: t('services.brands_desc')
        },
        {
            icon: '🛡️',
            title: t('services.warranty_title'),
            description: t('services.warranty_desc')
        },
        {
            icon: '⚡',
            title: t('services.fast_title'),
            description: t('services.fast_desc')
        }
    ];

    useGSAP(() => {
        // Ensure elements are visible first
        gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], { opacity: 1, y: 0 });
        if (cardsRef.current) {
            gsap.set(cardsRef.current.children, { opacity: 1, y: 0 });
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 90%',
                end: 'top 40%',
                toggleActions: 'play none none none', // Only play once, don't reverse
                once: true
            }
        });

        tl.from(titleRef.current, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });

        tl.from(subtitleRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.5');

        if (cardsRef.current && cardsRef.current.children.length > 0) {
            tl.from(cardsRef.current.children, {
                y: 50,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out'
            }, '-=0.3');
        }

        tl.from(buttonRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.out'
        }, '-=0.2');
    }, [t]); // Add t as dependency to re-run if language changes

    return (
        <section ref={sectionRef} className="py-24 relative z-10" style={{ backgroundColor: 'var(--color-light)' }}>
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 ref={titleRef} className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                        {t('services.title')}
                    </h2>
                    <p ref={subtitleRef} className="text-lg max-w-xl mx-auto" style={{ color: '#6b7280', fontFamily: 'var(--font-body)' }}>
                        {t('services.subtitle')}
                    </p>
                </div>

                {/* Adjust grid to fit 5 items nicely - centered last row if needed or just 3 cols */}
                <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto justify-center">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>

                <div ref={buttonRef} className="text-center mt-12">
                    <a
                        href="https://wa.me/60142770968"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <MagneticButton>
                            WhatsApp {t('nav.contact')}
                        </MagneticButton>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
