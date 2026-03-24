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

const iconMap: Record<string, ReactNode> = {
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
    const reducedMotion = useReducedMotion();

    return (
        <section id="services" className={s.services}>
            <div className={s.inner}>
                <SectionHeader
                    label="What We Do"
                    title="Services"
                    subtitle="From land clearing to dam construction, we handle the full scope of rural earthmoving and civil works."
                />
                <div ref={ref} className={s.grid}>
                    {businessData.services.map((svc, i) => (
                        <motion.article
                            key={svc.title}
                            className={s.card}
                            initial={
                                reducedMotion ? false : { opacity: 0, y: 24 }
                            }
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.45, delay: i * 0.08 }}
                        >
                            <div className={s.iconWrap}>
                                {iconMap[svc.iconName]}
                            </div>
                            <h3 className={s.title}>{svc.title}</h3>
                            <p className={s.desc}>{svc.description}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
