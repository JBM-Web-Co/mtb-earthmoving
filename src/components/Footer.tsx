import { Phone, Mail, Clock } from 'lucide-react';
import { businessData } from '../data';
import s from './Footer.module.scss';

export default function Footer() {
    return (
        <footer className={s.footer}>
            <div className={s.inner}>
                <div className={s.grid}>
                    <div className={s.brand}>
                        <a href="#" aria-label="MTB Earthmoving — home">
                            <img
                                src="/logo-white.png"
                                alt="MTB Earthmoving"
                                className={s.logoImg}
                            />
                        </a>
                        <p className={s.tagline}>
                            Serving Gunnedah NSW &amp; Surrounds
                        </p>
                        <p className={s.desc}>{businessData.description}</p>
                        <a
                            href="https://www.facebook.com/profile.php?id=61563674456496"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={s.social}
                            aria-label="MTB Earthmoving on Facebook"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                            <span>MTB Earthmoving</span>
                        </a>
                    </div>

                    <div>
                        <div className={s.colTitle}>Quick Links</div>
                        <div className={s.links}>
                            {businessData.navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className={s.link}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className={s.colTitle}>Contact</div>
                        <div className={s.contactItems}>
                            <a
                                href="tel:+61461522409"
                                className={s.contactItem}
                            >
                                <Phone size={16} className={s.contactIcon} />
                                {businessData.phone}
                            </a>
                            <a
                                href={`mailto:${businessData.email}`}
                                className={s.contactItem}
                            >
                                <Mail size={16} className={s.contactIcon} />
                                {businessData.email}
                            </a>
                            <div className={s.contactItem}>
                                <Clock size={16} className={s.contactIcon} />
                                <span>{businessData.hours}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={s.bottom}>
                    <span>
                        &copy; {new Date().getFullYear()} MTB Earthmoving. All
                        rights reserved.
                    </span>
                    <span className={s.attribution}>Website by JBM Web Co</span>
                </div>
            </div>
        </footer>
    );
}
