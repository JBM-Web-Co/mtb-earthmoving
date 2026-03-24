import { motion, useReducedMotion } from 'framer-motion';
import { Phone, ArrowRight, MapPin } from 'lucide-react';
import s from './Hero.module.scss';

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
            <div className={s.noiseOverlay} aria-hidden="true" />
            <div className={s.diagonalLines} aria-hidden="true" />
            <div className={s.blueGlow} aria-hidden="true" />

            <div className={s.inner}>
                <motion.div className={s.locationBadge} {...anim(0)}>
                    <MapPin size={13} />
                    Gunnedah NSW &amp; Surrounds
                </motion.div>

                <motion.h1 className={s.headline} {...anim(0.1)}>
                    This Land Is
                    <br />
                    <span className={s.accentLine}>Our Office.</span>
                </motion.h1>

                <motion.p className={s.sub} {...anim(0.2)}>
                    Professional earthmoving, road construction, and civil works
                    across Gunnedah and North West NSW.
                    <br className={s.breakDesktop} />
                    Owner-operated. Built for the bush.
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

                <motion.div className={s.trustLine} {...anim(0.4)}>
                    <span className={s.trustDot} aria-hidden="true" />
                    Owner-operated
                    <span className={s.sep} aria-hidden="true">
                        ·
                    </span>
                    Rural specialists
                    <span className={s.sep} aria-hidden="true">
                        ·
                    </span>
                    Locally based
                </motion.div>
            </div>

            <div className={s.bottomEdge} aria-hidden="true" />
        </section>
    );
}
