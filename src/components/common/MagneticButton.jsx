import React, { useRef, useState } from 'react';

const MagneticButton = ({ children, className = '', ...props }) => {
    const buttonRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const button = buttonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = (e.clientX - centerX) * 0.3;
        const distanceY = (e.clientY - centerY) * 0.3;

        setPosition({ x: distanceX, y: distanceY });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <button
            ref={buttonRef}
            className={`relative inline-block overflow-hidden group ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: 'transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)'
            }}
            {...props}
        >
            <span className="relative z-10 block px-8 py-3 border rounded-full font-medium text-sm uppercase tracking-widest"
                style={{
                    borderColor: 'var(--color-dark)',
                    color: 'var(--color-dark)',
                    transition: 'color 0.5s, background-color 0.5s'
                }}>
                {children}
            </span>
            <span className="absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"
                style={{ backgroundColor: 'var(--color-dark)' }} />
            <style>{`
                button:hover span:first-child {
                    color: white !important;
                }
            `}</style>
        </button>
    );
};

export default MagneticButton;
