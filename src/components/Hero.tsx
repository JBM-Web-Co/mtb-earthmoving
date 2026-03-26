import { motion, useReducedMotion } from 'framer-motion';
import { Phone, ArrowRight, MapPin } from 'lucide-react';
import s from './Hero.module.scss';

const STATS = [
    { num: '10+', label: 'Years Experience' },
    { num: 'Free', label: 'Quotes & Advice' },
    { num: '8+', label: 'Service Areas' },
    { num: '100%', label: 'Owner-Operated' },
];

export default function Hero() {
    const reducedMotion = useReducedMotion();
    const anim = (delay: number) =>
        reducedMotion
            ? {}
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
                    <a href="tel:+61461522409" className={s.ctaPrimary}>
                        <Phone size={18} />
                        Call +61 461 522 409
                    </a>
                    <a href="#contact" className={s.ctaSecondary}>
                        Get a Quote
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
