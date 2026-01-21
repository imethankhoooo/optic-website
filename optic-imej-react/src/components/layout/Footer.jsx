import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="py-20 relative z-10" style={{ backgroundColor: 'var(--color-dark)', color: 'white' }}>
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div>
                        <h3 className="text-3xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>OPTIK IMEJ</h3>
                        <p className="text-sm opacity-60 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                            {t('footer.desc')}
                        </p>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h4 className="text-xs uppercase tracking-widest mb-6 opacity-60">{t('footer.hours_title')}</h4>
                        <ul className="space-y-2 text-sm opacity-80" style={{ fontFamily: 'var(--font-body)' }}>
                            <li className="flex justify-between"><span>{t('footer.hours.mon')}</span></li>
                            <li className="flex justify-between"><span>{t('footer.hours.tue')}</span></li>
                            <li className="flex justify-between"><span>{t('footer.hours.wed')}</span></li>
                            <li className="flex justify-between"><span>{t('footer.hours.thu')}</span></li>
                            <li className="flex justify-between text-yellow-500 font-medium"><span>{t('footer.hours.fri')}</span></li>
                            <li className="flex justify-between"><span>{t('footer.hours.sat')}</span></li>
                            <li className="flex justify-between"><span>{t('footer.hours.sun')}</span></li>
                        </ul>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-xs uppercase tracking-widest mb-6 opacity-60">{t('footer.nav_title')}</h4>
                        <ul className="space-y-3 text-sm">
                            {['about', 'collection', 'services', 'contact'].map((item) => (
                                <li key={item}>
                                    <a href={`#${item}`} className="opacity-80 hover:opacity-100 transition-opacity">
                                        {t(`nav.${item}`)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-xs uppercase tracking-widest mb-6 opacity-60">{t('footer.contact_title')}</h4>
                        <ul className="space-y-3 text-sm opacity-80">
                            <li>
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=Jalan+Kedidi+3,+Kampung+Baharu,+83500+Parit+Sulong,+Johor"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    📍 {t('footer.address')}
                                </a>
                            </li>
                            <li>
                                <a href={`tel:${t('nav.phone').replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                                    📞 {t('nav.phone')}
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${t('footer.email')}`} className="hover:text-white transition-colors">
                                    ✉️ {t('footer.email')}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/60142770968"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    💬 WhatsApp
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs opacity-40">{t('footer.rights')}</p>
                    <a
                        href="https://wa.me/60142770968"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2"
                    >
                        💬 WhatsApp
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
