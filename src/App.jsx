import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactLenis } from 'lenis/react';
import Hero3D from './components/sections/Hero3D';
import IntroSection from './components/sections/IntroSection';
import ServicesSection from './components/sections/ServicesSection';
import WhyUsSection from './components/sections/WhyUsSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import FAQSection from './components/sections/FAQSection';
import CTASection from './components/sections/CTASection';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  const { t } = useTranslation();
  return (
    <ReactLenis root>
      <div className="antialiased min-h-screen" style={{ backgroundColor: 'var(--color-light)', color: 'var(--color-dark)' }}>
        <Navbar />

        <main>
          <Hero3D />

          {/* About */}
          <section id="about">
            <IntroSection />
          </section>

          {/* Services */}
          <section id="services">
            <ServicesSection />
          </section>

          {/* Collection */}
          <section id="collection" className="py-20 relative z-10" style={{ backgroundColor: 'white' }}>
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest mb-4 inline-block"
                  style={{ color: 'var(--color-gold)' }}>
                  {t('collection.label')}
                </span>
                <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  {t('collection.title')}
                </h2>
                <p className="text-sm md:text-base opacity-60 max-w-lg mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
                  {t('collection.subtitle')}
                </p>
              </div>

              {/* Collection Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {[
                  { key: 'classic', emoji: '👓' },
                  { key: 'sport', emoji: '🏃' },
                  { key: 'business', emoji: '💼' },
                  { key: 'fashion', emoji: '✨' }
                ].map((item, i) => (
                  <div key={i}
                    className="group p-8 rounded-2xl text-center cursor-pointer transition-all duration-500 hover:-translate-y-2"
                    style={{
                      backgroundColor: 'var(--color-light)',
                      border: '1px solid rgba(0,0,0,0.05)'
                    }}>
                    <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                      {item.emoji}
                    </div>
                    <h3 className="text-lg mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                      {t(`collection.${item.key}`)}
                    </h3>
                    <p className="text-sm" style={{ color: '#9ca3af' }}>{t(`collection.${item.key}_desc`)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <WhyUsSection />

          {/* Testimonials */}
          <TestimonialsSection />

          {/* FAQ */}
          <FAQSection />

          {/* Contact / CTA */}
          <section id="contact">
            <CTASection />
          </section>
        </main>

        <Footer />
      </div>
    </ReactLenis>
  );
}

export default App;

