import { motion, useReducedMotion } from 'framer-motion';
import {
    Mountain,
    Home,
    Route,
    Droplets,
    Waves,
    Wrench,
    Hammer,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { businessData } from '../data';
import { SectionHeader } from './UI';
import { useScrollReveal } from '../hooks';
import s from './Services.module.scss';

const icon_map: Record<string, ReactNode> = {
    mountain: <Mountain size={26} />,
    home: <Home size={26} />,
    route: <Route size={26} />,
    droplets: <Droplets size={26} />,
    waves: <Waves size={26} />,
    wrench: <Wrench size={26} />,
    hammer: <Hammer size={26} />,
};

export default function Services() {
    const { ref, isVisible } = useScrollReveal();
    const reduced_motion = useReducedMotion();
    const last_idx = businessData.services.length - 1;

    return (
        <section id="services" className={s.services}>
            <div className={s.bgGlow} aria-hidden="true" />
            <div className={s.bgTexture} aria-hidden="true" />

            <div className={s.inner}>
                <SectionHeader
                    label="What We Do"
                    title="Our Services"
                    subtitle="From land clearing to dam construction, we handle the full scope of rural earthmoving and civil works."
                    dark
                />

                <div ref={ref} className={s.grid}>
                    {businessData.services.map((svc, i) => (
                        <motion.article
                            key={svc.title}
                            className={`${s.card}${i === last_idx ? ` ${s.cardLast}` : ''}`}
                            initial={
                                reduced_motion ? false : { opacity: 0, y: 28 }
                            }
                            animate={
                                reduced_motion || isVisible
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 28 }
                            }
                            transition={{
                                duration: 0.5,
                                delay: i * 0.07,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                        >
                            <span className={s.cardNumber} aria-hidden="true">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <div className={s.cardBody}>
                                <div className={s.iconWrap}>
                                    {icon_map[svc.iconName]}
                                </div>
                                <div className={s.cardContent}>
                                    <h3 className={s.cardTitle}>{svc.title}</h3>
                                    <p className={s.cardDesc}>
                                        {svc.description}
                                    </p>
                                </div>
                            </div>
                            <div className={s.cardAccent} aria-hidden="true" />
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
