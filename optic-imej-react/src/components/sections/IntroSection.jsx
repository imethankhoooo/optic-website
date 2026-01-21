import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IntroSection = () => {
    const { t } = useTranslation();
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const lineRef = useRef(null);
    const decorRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                end: 'top 30%',
                toggleActions: 'play none none reverse'
            }
        });

        // 背景装饰圆动画
        tl.from(decorRef.current, {
            scale: 0,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        });

        // 装饰线条动画
        tl.from(lineRef.current, {
            scaleX: 0,
            duration: 0.8,
            ease: 'power3.inOut'
        }, '-=0.8');

        // 标题分步淡入
        tl.from(titleRef.current, {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5');

        // 文本淡入
        tl.from(textRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5');
    }, [t]); // Re-run animation if language changes (optional, but good practice)

    return (
        // P3 FIX: 渐变背景过渡
        <section ref={sectionRef} className="py-40 flex items-center justify-center relative z-10 overflow-hidden"
            style={{
                background: 'linear-gradient(to bottom, var(--color-light) 0%, white 30%, white 100%)'
            }}>
            {/* 背景装饰 */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* P2 FIX: 背景装饰圆增加层次 */}
            <div ref={decorRef} className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
                style={{ backgroundColor: 'var(--color-gold)' }} />

            <div className="container mx-auto px-6 text-center relative">
                {/* 装饰线条 */}
                <div ref={lineRef} className="w-20 h-[2px] mx-auto mb-10 origin-center"
                    style={{ backgroundColor: 'var(--color-gold)' }} />

                <h2 ref={titleRef} className="text-5xl md:text-7xl mb-10"
                    style={{ fontFamily: 'var(--font-heading)' }}>
                    {t('about.title')}
                </h2>

                <div ref={textRef} className="max-w-3xl mx-auto space-y-8">
                    <p className="text-xl md:text-2xl font-light leading-relaxed"
                        style={{ color: '#6b7280', fontFamily: 'var(--font-body)' }}>
                        {t('about.text')}
                    </p>
                    <p className="text-lg md:text-xl font-light leading-relaxed opacity-80"
                        style={{ color: '#6b7280', fontFamily: 'var(--font-body)' }}>
                        {t('about.subtext')}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default IntroSection;
