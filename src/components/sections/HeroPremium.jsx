import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroPremium = () => {
    const { t } = useTranslation();
    const heroRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Image Parallax
            gsap.to(imageRef.current, {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            // Text Reveal Animation
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo(
                '.hero-line',
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, delay: 0.5 }
            );

            tl.fromTo(
                '.hero-sub',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: -0.5 }
            );

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#0F172A]"
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
                <img
                    ref={imageRef}
                    src="/images/hero-premium.png"
                    alt="Premium Eyewear Craftsmanship"
                    className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
            </div>

            {/* Content Container - Glassmorphism */}
            <div
                ref={textRef}
                className="relative z-10 container mx-auto px-6 text-center"
            >
                <div className="inline-block p-8 md:p-12 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl">
                    <div className="overflow-hidden mb-2">
                        <h2 className="hero-line text-xs md:text-sm font-bold tracking-[0.3em] text-[#D4AF37] uppercase">
                            {t('hero.intro')}
                        </h2>
                    </div>

                    <div className="overflow-hidden">
                        <h1 className="hero-line text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight">
                            {t('hero.brand_2')}
                        </h1>
                    </div>

                    <div className="overflow-hidden">
                        <p className="hero-sub text-gray-300 max-w-lg mx-auto text-lg font-light tracking-wide">
                            {t('hero.transition')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60 animate-bounce">
                <span className="text-[10px] tracking-widest text-white uppercase">{t('hero.scroll')}</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent" />
            </div>
        </section>
    );
};

export default HeroPremium;
