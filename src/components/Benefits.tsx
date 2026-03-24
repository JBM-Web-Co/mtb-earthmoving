import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Award, Layers, ShieldCheck } from 'lucide-react';
import type { ReactNode } from 'react';
import { businessData } from '../data';
import { SectionHeader } from './UI';
import { useScrollReveal } from '../hooks';
import s from './Benefits.module.scss';

const iconMap: Record<string, ReactNode> = {
    'map-pin': <MapPin size={22} />,
    award: <Award size={22} />,
    layers: <Layers size={22} />,
    shield: <ShieldCheck size={22} />,
};

export default function Benefits() {
    const { ref, isVisible } = useScrollReveal();
    const reducedMotion = useReducedMotion();

    return (
        <section id="benefits" className={s.benefits}>
            <div className={s.inner}>
                <SectionHeader
                    label="Why Choose Us"
                    title="Why Choose MTB Earthmoving"
                    subtitle="Local knowledge, owner-operator attention, and a full service range — all in one crew."
                />
                <div ref={ref} className={s.grid}>
                    {businessData.benefits.map((b, i) => (
                        <motion.div
                            key={b.title}
                            className={s.card}
                            initial={
                                reducedMotion ? false : { opacity: 0, y: 20 }
                            }
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                            <div className={s.iconWrap}>
                                {iconMap[b.iconName]}
                            </div>
                            <div className={s.content}>
                                <h3 className={s.title}>{b.title}</h3>
                                <p className={s.desc}>{b.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
