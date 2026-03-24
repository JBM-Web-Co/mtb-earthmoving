import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { businessData } from '../data';
import s from './Header.module.scss';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={`${s.header} ${scrolled ? s.scrolled : ''}`}>
            <div className={s.inner}>
                <a
                    href="#"
                    className={s.logo}
                    aria-label="MTB Earthmoving — home"
                >
                    <img
                        src={scrolled ? '/logo.png' : '/logo-white.png'}
                        alt="MTB Earthmoving"
                        className={s.logoImg}
                    />
                </a>

                <nav className={s.nav} aria-label="Main navigation">
                    {businessData.navItems.map((item) => (
                        <a key={item.href} href={item.href} className={s.link}>
                            {item.label}
                        </a>
                    ))}
                    <a href="tel:+61461522409" className={s.cta}>
                        <Phone size={16} />
                        Call Now
                    </a>
                </nav>

                <button
                    className={s.mobileMenuBtn}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className={s.mobileMenu}
                        initial={reducedMotion ? false : { opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                    >
                        {businessData.navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className={s.mobileNavLink}
                                onClick={closeMenu}
                            >
                                {item.label}
                            </a>
                        ))}
                        <a
                            href="tel:+61461522409"
                            className={s.mobileNavCta}
                            onClick={closeMenu}
                        >
                            <Phone size={18} />
                            Call +61 461 522 409
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
