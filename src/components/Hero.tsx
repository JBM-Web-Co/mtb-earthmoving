import { motion, useReducedMotion } from 'framer-motion';
import { Phone, ArrowRight, MapPin } from 'lucide-react';
import { businessData } from '../data';
import s from './Hero.module.scss';

const STATS = [
    { num: '10+', label: 'Years Experience' },
    { num: 'Free', label: 'Quotes & Advice' },
    { num: '8+', label: 'Service Areas' },
    { num: '100%', label: 'Owner-Operated' },
];

export default function Hero() {
    const reduced_motion = useReducedMotion();
    // When reduced motion is on, render directly in the visible state. The page
    // is prerendered with `opacity: 0` baked in, so we must explicitly animate to
    // `opacity: 1` (not return `{}`) or the content stays invisible.
    const anim = (delay: number) =>
        reduced_motion
            ? { initial: false, animate: { opacity: 1, y: 0 } }
            : {
                  initial: { opacity: 0, y: 28 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay },
              };

    return (
        <section className={s.hero}>
            <div className={s.blueGlow} aria-hidden="true" />

            <div className={s.inner}>
                <motion.div className={s.locationBadge} {...anim(0)}>
                    <MapPin size={13} />
                    Gunnedah NSW &amp; Surrounds
                </motion.div>

                <motion.h1 className={s.headline} {...anim(0.1)}>
                    The Land Is
                    <br />
                    <span className={s.accentLine}>Our Office.</span>
                </motion.h1>

                <motion.p className={s.sub} {...anim(0.2)}>
                    Professional earthmoving, road construction, and civil works
                    across Gunnedah and North West NSW.
                    <br className={s.breakDesktop} />
                </motion.p>

                <motion.div className={s.ctas} {...anim(0.3)}>
                    <a
                        href={`tel:${businessData.phoneTel}`}
                        className={s.ctaPrimary}
                    >
                        <Phone size={18} />
                        Call {businessData.phone}
                    </a>
                    <a href="#contact" className={s.ctaSecondary}>
                        Get a Free Quote
                        <ArrowRight size={18} />
                    </a>
                </motion.div>
            </div>

            <div className={s.statsStrip}>
                <div className={s.statsInner}>
                    {STATS.map((stat) => (
                        <div key={stat.label} className={s.stat}>
                            <span className={s.statNum}>{stat.num}</span>
                            <span className={s.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
