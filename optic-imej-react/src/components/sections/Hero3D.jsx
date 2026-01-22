import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 叙事覆盖层组件
const NarrativeOverlay = ({ currentFrame, totalFrames, keyframes }) => {
    const [activeKeyframe, setActiveKeyframe] = useState(null);
    const [visibleTexts, setVisibleTexts] = useState([]);

    useEffect(() => {
        // 找到当前激活的关键帧
        const active = keyframes.find(
            kf => currentFrame >= kf.frameStart && currentFrame <= kf.frameEnd
        );

        // 如果关键帧ID改变了
        if (active?.id !== activeKeyframe?.id) {
            setActiveKeyframe(active);
            if (active) {
                // 清除所有现有文字
                setVisibleTexts([]);
                // 依次显示新文字
                active.texts.forEach((text, index) => {
                    setTimeout(() => {
                        setVisibleTexts(prev => {
                            // 避免重复添加
                            if (prev.find(t => t.content === text.content)) return prev;
                            return [...prev, { ...text, index }];
                        });
                    }, (text.delay || 0) * 1000);
                });
            } else {
                setVisibleTexts([]);
            }
        } else if (active && activeKeyframe && active.id === activeKeyframe.id) {
            // 检查内容是否发生变化（例如语言切换）
            const hasContentChanged = active.texts.some((text, idx) => {
                const current = visibleTexts[idx];
                return current && current.content !== text.content;
            });

            if (hasContentChanged) {
                setVisibleTexts(active.texts.map((text, index) => ({ ...text, index })));
            }
        }
    }, [currentFrame, activeKeyframe?.id, keyframes]);

    // 计算进度用于渐隐效果
    const getOpacity = (kf) => {
        if (!kf) return 0;
        const progress = (currentFrame - kf.frameStart) / (kf.frameEnd - kf.frameStart);
        // 在开始和结束时淡入淡出
        if (progress < 0.15) return progress / 0.15;
        if (progress > 0.85) return (1 - progress) / 0.15;
        return 1;
    };

    const getPositionClasses = (position) => {
        switch (position) {
            case 'left':
                return 'items-start text-left pl-12 md:pl-24';
            case 'right':
                return 'items-end text-right pr-12 md:pr-24';
            default:
                return 'items-center text-center';
        }
    };

    const getSizeClasses = (size) => {
        switch (size) {
            case 'hero':
                return 'text-5xl md:text-8xl';
            case 'large':
                return 'text-3xl md:text-6xl';
            case 'medium':
                return 'text-xl md:text-3xl';
            case 'small':
                return 'text-sm md:text-lg tracking-[0.4em]';
            default:
                return 'text-xl md:text-3xl';
        }
    };

    if (!activeKeyframe) return null;

    const opacity = getOpacity(activeKeyframe);

    return (
        <div
            className={`absolute inset-0 z-30 flex flex-col justify-center pointer-events-none transition-opacity duration-500 ${getPositionClasses(activeKeyframe.texts[0]?.position)}`}
            style={{ opacity }}
        >
            {visibleTexts.map((text, i) => (
                <div
                    key={`${activeKeyframe.id}-${i}-${text.content}`}
                    className={`narrative-text overflow-hidden ${getSizeClasses(text.size)}`}
                    style={{
                        fontFamily: 'var(--font-heading)',
                        color: 'white',
                        textShadow: '0 4px 30px rgba(0,0,0,0.4)',
                        animation: 'textReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    }}
                >
                    {text.content}
                </div>
            ))}
        </div>
    );
};

const Hero3D = () => {
    const { t } = useTranslation();
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [images, setImages] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const [currentFrame, setCurrentFrame] = useState(0);

    // 关键帧叙事配置
    const narrativeKeyframes = useMemo(() => [
        {
            id: 'intro',
            frameStart: 0,
            frameEnd: 25,
            texts: [
                { content: t('hero.intro'), size: 'large', position: 'center' }
            ]
        },
        {
            id: 'precision',
            frameStart: 35,
            frameEnd: 65,
            texts: [
                { content: t('hero.precision_1'), size: 'medium', position: 'left', delay: 0 },
                { content: t('hero.precision_2'), size: 'small', position: 'left', delay: 0.2 }
            ]
        },
        {
            id: 'material',
            frameStart: 70,
            frameEnd: 95,
            texts: [
                { content: t('hero.material'), size: 'medium', position: 'right' }
            ]
        },
        {
            id: 'transition',
            frameStart: 155,
            frameEnd: 185,
            texts: [
                { content: t('hero.transition'), size: 'large', position: 'right' }
            ]
        },
        {
            id: 'brand',
            frameStart: 235,
            frameEnd: 271,
            texts: [
                { content: t('hero.brand_1'), size: 'hero', position: 'center', delay: 0 },
                { content: t('hero.brand_2'), size: 'medium', position: 'center', delay: 0.3 }
            ]
        }
    ], [t]);

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages = [];

            try {
                const response = await fetch('/frames/frames.json');
                if (!response.ok) throw new Error("Manifest not found");
                const fileList = await response.json();
                const totalImages = fileList.length;

                let loadedCount = 0;
                fileList.forEach((filename, i) => {
                    const img = new Image();
                    img.src = `/frames/${filename}`;
                    img.onload = () => {
                        loadedCount++;
                        setLoadProgress(Math.round((loadedCount / totalImages) * 100));
                        if (loadedCount === totalImages) {
                            setTimeout(() => setIsLoaded(true), 300);
                        }
                    };
                    loadedImages[i] = img;
                });
                setImages(loadedImages);
            } catch (e) {
                console.error("Failed to load frames manifest", e);
            }
        };

        loadImages();
    }, []);

    // Animation Logic
    useGSAP(() => {
        if (!isLoaded || images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const frame = { index: 0 };

        const render = () => {
            const img = images[Math.round(frame.index)];
            if (!img) return;

            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            context.scale(dpr, dpr);

            const cw = window.innerWidth;
            const ch = window.innerHeight;
            const iw = img.naturalWidth;
            const ih = img.naturalHeight;

            // Intelligent Scaling Logic
            const isMobile = cw < 768; // Mobile breakpoint
            const widthRatio = cw / iw;
            const heightRatio = ch / ih;

            let scale;

            if (isMobile && heightRatio > widthRatio) {
                // Mobile Portrait case: Height ratio is usually much larger than width ratio (zoomed in)
                // We relax the cover constraint to show more of the image (less cropping)
                // The factor 0.75 ensures it's not "too small" but significantly reduces side cropping
                scale = Math.max(widthRatio, heightRatio * 0.75);
            } else {
                // Desktop or Landscape: Standard cover
                scale = Math.max(widthRatio, heightRatio);
            }

            const nw = iw * scale;
            const nh = ih * scale;
            const cx = (cw - nw) / 2;
            const cy = (ch - nh) / 2;

            context.clearRect(0, 0, cw, ch);
            context.drawImage(img, cx, cy, nw, nh);
        };

        render();
        window.addEventListener('resize', render);

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "+=350%",
            pin: true,
            scrub: 0.3,
            onUpdate: (self) => {
                frame.index = self.progress * (images.length - 1);
                setCurrentFrame(Math.round(frame.index));
                render();
            }
        });

        return () => {
            window.removeEventListener('resize', render);
            ScrollTrigger.getAll().forEach(t => t.kill());
        }

    }, [isLoaded, images]);

    // Loading State
    if (!isLoaded) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center gap-8"
                style={{ backgroundColor: 'var(--color-light)' }}>
                {/* Logo */}
                <h1 className="text-4xl md:text-5xl"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-dark)' }}>
                    OPTIK IMEJ
                </h1>

                {/* Progress Bar */}
                <div className="w-48 h-[2px] bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-300 ease-out"
                        style={{
                            backgroundColor: 'var(--color-gold)',
                            width: `${loadProgress}%`
                        }}
                    />
                </div>

                {/* Progress Text */}
                <p className="text-sm tracking-widest"
                    style={{ color: '#9ca3af', fontFamily: 'var(--font-body)' }}>
                    {t('hero.loading')} {loadProgress}%
                </p>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden" style={{ backgroundColor: 'var(--color-light)' }}>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

            {/* 微妙暗角效果 */}
            <div className="absolute inset-0 pointer-events-none z-10 vignette" />

            {/* 底部渐变 */}
            <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-10"
                style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 100%)'
                }} />

            {/* 叙事文字覆盖层 */}
            <NarrativeOverlay currentFrame={currentFrame} totalFrames={images.length} keyframes={narrativeKeyframes} />

            {/* 滚动提示 */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
                style={{
                    opacity: currentFrame < 10 ? 1 : 0,
                    transition: 'opacity 0.5s ease'
                }}>
                <span className="text-xs uppercase text-white/70" style={{ letterSpacing: '0.2em' }}>{t('hero.scroll')}</span>
                <div className="w-[1px] h-16" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.7), transparent)' }} />
            </div>
        </div>
    );
};

export default Hero3D;
