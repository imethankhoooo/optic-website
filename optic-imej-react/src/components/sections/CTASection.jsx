import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
    const { t } = useTranslation();
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const buttonRef = useRef(null);
    const decorLeftRef = useRef(null);
    const decorRightRef = useRef(null);

    useGSAP(() => {
        gsap.from(decorLeftRef.current, {
            x: -100,
            opacity: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true
            }
        });

        gsap.from(decorRightRef.current, {
            x: 100,
            opacity: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true
            }
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
                end: 'top 25%',
                toggleActions: 'play none none none',
                once: true
            }
        });

        tl.from(contentRef.current.children, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });

        tl.to(buttonRef.current, {
            boxShadow: '0 15px 40px rgba(201, 169, 110, 0.5)',
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.2');
    }, []);

    return (
        <section ref={sectionRef} className="py-32 relative z-10 overflow-hidden"
            style={{ background: 'linear-gradient(to bottom, var(--color-light) 0%, white 50%, white 100%)' }}>
            {/* Decorative circles */}
            <div ref={decorRightRef} className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
                style={{ backgroundColor: 'var(--color-gold)' }} />
            <div ref={decorLeftRef} className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-5"
                style={{ backgroundColor: 'var(--color-gold)' }} />

            <div ref={contentRef} className="container mx-auto px-6 text-center relative">
                <span className="inline-block text-xs uppercase tracking-widest mb-6 px-4 py-2 rounded-full"
                    style={{ backgroundColor: 'rgba(201,169,110,0.1)', color: 'var(--color-gold)' }}>
                    {t('cta.label')}
                </span>

                <h2 className="text-4xl md:text-6xl mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                    {t('cta.title')}
                </h2>

                <p className="text-lg md:text-xl mb-12 max-w-xl mx-auto" style={{ color: '#6b7280', fontFamily: 'var(--font-body)' }}>
                    {t('cta.subtitle')}
                </p>

                <a ref={buttonRef}
                    href={`https://wa.me/60142770968?text=${encodeURIComponent(t('cta.title'))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-12 py-5 text-sm font-medium uppercase tracking-widest rounded-full transition-all duration-500 hover:scale-105"
                    style={{
                        backgroundColor: 'var(--color-gold)',
                        color: 'white',
                        boxShadow: '0 10px 30px rgba(201, 169, 110, 0.3)'
                    }}>
                    {t('cta.button')}
                </a>
            </div>
        </section>
    );
};

export default CTASection;

