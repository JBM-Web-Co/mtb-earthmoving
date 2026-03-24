import { Phone, Mail } from 'lucide-react';
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
