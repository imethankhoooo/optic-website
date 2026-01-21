import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 关闭菜单当点击链接
    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    // 切换菜单
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const navItems = ['about', 'collection', 'services', 'contact'];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const LanguageSwitcher = ({ mobile = false }) => (
        <div className={`flex items-center gap-4 ${mobile ? 'mt-8 justify-center' : 'ml-8'}`}>
            {[
                { code: 'en', label: 'EN' },
                { code: 'ms', label: 'BM' },
                { code: 'zh', label: '中' }
            ].map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`text-xs font-medium transition-colors duration-300 ${i18n.language === lang.code
                        ? 'text-yellow-600'
                        : (scrolled || mobile ? 'text-gray-500 hover:text-gray-900' : 'text-white/70 hover:text-white')
                        }`}
                    style={{
                        fontFamily: 'var(--font-heading)',
                        letterSpacing: '0.1em'
                    }}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 shadow-sm' : 'py-8'}`}
                style={{
                    backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(12px)' : 'none'
                }}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <a href="#" className="text-2xl font-semibold tracking-tight"
                        style={{ fontFamily: 'var(--font-heading)', color: scrolled ? 'var(--color-dark)' : 'white' }}>
                        OPTIK IMEJ
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a key={item} href={`#${item}`}
                                className="text-sm font-medium uppercase relative group py-2"
                                style={{
                                    letterSpacing: '0.1em',
                                    color: scrolled ? 'var(--color-dark)' : 'white',
                                    transition: 'color 0.3s'
                                }}>
                                {t(`nav.${item}`)}
                                <span className="absolute bottom-0 left-0 w-full h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                                    style={{ backgroundColor: 'var(--color-gold)' }} />
                            </a>
                        ))}
                        <LanguageSwitcher />
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative z-60"
                        style={{ color: (scrolled || menuOpen) ? 'var(--color-dark)' : 'white' }}
                        onClick={toggleMenu}
                        aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
                        aria-expanded={menuOpen}
                    >
                        <span
                            className="w-6 h-0.5 rounded-full transition-all duration-300 origin-center"
                            style={{
                                backgroundColor: 'currentColor',
                                transform: menuOpen ? 'rotate(45deg) translateY(4px)' : 'none'
                            }}
                        />
                        <span
                            className="w-6 h-0.5 rounded-full transition-all duration-300"
                            style={{
                                backgroundColor: 'currentColor',
                                opacity: menuOpen ? 0 : 1,
                                transform: menuOpen ? 'scaleX(0)' : 'scaleX(1)'
                            }}
                        />
                        <span
                            className="w-6 h-0.5 rounded-full transition-all duration-300 origin-center"
                            style={{
                                backgroundColor: 'currentColor',
                                transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none'
                            }}
                        />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                onClick={() => setMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 transition-transform duration-500 ease-out md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)'
                }}
            >
                <div className="flex flex-col h-full pt-28 px-8">
                    {/* Menu Items */}
                    <div className="flex flex-col gap-2">
                        {navItems.map((item, index) => (
                            <a
                                key={item}
                                href={`#${item}`}
                                onClick={handleLinkClick}
                                className="text-2xl font-light py-4 border-b transition-all duration-300 hover:pl-4"
                                style={{
                                    fontFamily: 'var(--font-heading)',
                                    color: 'var(--color-dark)',
                                    borderColor: 'rgba(0, 0, 0, 0.08)',
                                    transitionDelay: menuOpen ? `${index * 50}ms` : '0ms',
                                    opacity: menuOpen ? 1 : 0,
                                    transform: menuOpen ? 'translateX(0)' : 'translateX(20px)'
                                }}
                            >
                                {t(`nav.${item}`)}
                            </a>
                        ))}
                    </div>

                    <LanguageSwitcher mobile={true} />

                    {/* Contact Info */}
                    <div
                        className="mt-auto pb-10 transition-all duration-500"
                        style={{
                            opacity: menuOpen ? 1 : 0,
                            transitionDelay: menuOpen ? '300ms' : '0ms'
                        }}
                    >
                        <p className="text-sm mb-2" style={{ color: '#6b7280' }}>
                            {t('nav.contact')}
                        </p>
                        <p className="text-lg font-medium" style={{ color: 'var(--color-gold)' }}>
                            {t('nav.phone')}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
