import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { businessData } from '../data';
import s from './Header.module.scss';

export default function Header() {
    const [menu_open, set_menu_open] = useState(false);
    const [scrolled, set_scrolled] = useState(false);
    const [active_section, set_active_section] = useState('');
    const reduced_motion = useReducedMotion();

    useEffect(() => {
        const on_scroll = () => set_scrolled(window.scrollY > 20);
        window.addEventListener('scroll', on_scroll, { passive: true });
        return () => window.removeEventListener('scroll', on_scroll);
    }, []);

    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        set_active_section(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -60% 0px', threshold: 0 }
        );
        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    const close_menu = () => set_menu_open(false);

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
                        width={320}
                        height={205}
                    />
                </a>

                <nav className={s.nav} aria-label="Main navigation">
                    {businessData.navItems.map((item) => {
                        const section_id = item.href.replace('#', '');
                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                className={`${s.link} ${active_section === section_id ? s.linkActive : ''}`}
                            >
                                {item.label}
                            </a>
                        );
                    })}
                    <a href={`tel:${businessData.phoneTel}`} className={s.cta}>
                        <Phone size={16} />
                        Call Now
                    </a>
                </nav>

                <button
                    className={s.mobileMenuBtn}
                    onClick={() => set_menu_open(!menu_open)}
                    aria-label={menu_open ? 'Close menu' : 'Open menu'}
                    aria-expanded={menu_open}
                >
                    {menu_open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <AnimatePresence>
                {menu_open && (
                    <motion.div
                        className={s.mobileMenu}
                        initial={reduced_motion ? false : { opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                    >
                        {businessData.navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className={s.mobileNavLink}
                                onClick={close_menu}
                            >
                                {item.label}
                            </a>
                        ))}
                        <a
                            href={`tel:${businessData.phoneTel}`}
                            className={s.mobileNavCta}
                            onClick={close_menu}
                        >
                            <Phone size={18} />
                            Call {businessData.phone}
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
