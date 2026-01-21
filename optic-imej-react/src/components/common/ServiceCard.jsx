import React from 'react';
import { useTranslation } from 'react-i18next';

const ServiceCard = ({ icon, title, description }) => {
    const { t } = useTranslation();

    return (
        <div className="group relative p-8 rounded-2xl overflow-hidden cursor-pointer h-full flex flex-col"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)'
            }}>
            {/* 现代化边框光晕效果 */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: 'linear-gradient(135deg, rgba(201,169,110,0.15) 0%, transparent 50%, rgba(201,169,110,0.1) 100%)',
                    border: '1px solid rgba(201,169,110,0.3)'
                }} />

            {/* 顶部渐变光效 */}
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)'
                }} />

            <div className="relative z-10 flex-grow">
                {/* 图标容器 - 带悬浮效果 */}
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-6 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1"
                    style={{
                        backgroundColor: 'rgba(201,169,110,0.1)',
                        border: '1px solid rgba(201,169,110,0.2)'
                    }}>
                    {icon}
                </div>

                <h3 className="text-xl mb-3 transition-colors duration-300 group-hover:text-gold-dark"
                    style={{ fontFamily: 'var(--font-heading)' }}>
                    {title}
                </h3>
                <p className="text-sm leading-relaxed transition-colors duration-300"
                    style={{ color: '#6b7280', fontFamily: 'var(--font-body)' }}>
                    {description}
                </p>
            </div>

            {/* 了解更多箭头 */}
            <div className="relative z-10 mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-gold)' }}>
                    {t('services.learn_more')}
                </span>
                <span style={{ color: 'var(--color-gold)' }}>→</span>
            </div>

            <style>{`
                .group:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 25px 50px -12px rgba(201, 169, 110, 0.2), 0 10px 20px -5px rgba(0, 0, 0, 0.1);
                }
            `}</style>
        </div>
    );
};

export default ServiceCard;
