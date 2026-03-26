import { motion, useReducedMotion } from 'framer-motion';
import { Award, Layers, Users, MessageCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import { businessData } from '../data';
import { SectionHeader } from './UI';
import { useScrollReveal } from '../hooks';
import s from './Benefits.module.scss';

const iconMap: Record<string, ReactNode> = {
    award: <Award size={22} />,
    users: <Users size={22} />,
    'message-circle': <MessageCircle size={22} />,
    layers: <Layers size={22} />,
};

export default function Benefits() {
    const { ref, isVisible } = useScrollReveal();
    const reducedMotion = useReducedMotion();

    return (
        <section id="about" className={s.benefits}>
            <div className={s.inner}>
                <SectionHeader
                    label="About Us"
                    title="About MTB Earthmoving"
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
