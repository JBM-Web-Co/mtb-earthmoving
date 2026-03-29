import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { SectionHeader } from './UI';
import { useScrollReveal } from '../hooks';
import s from './Benefits.module.scss';

const POINTS = [
    'Licensed & insured',
    'Servicing New England NSW & surrounds',
    'Free quotes — no obligation',
    'Available for residential, rural & commercial jobs',
];

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
                <div ref={ref} className={s.layout}>
                    <motion.div
                        className={s.textCol}
                        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <p className={s.body}>
                            <span className={s.brandName}>MTB Earthmoving</span>{' '}
                            is a local, family-run business serving New England
                            NSW and surrounds. We've been working this land for
                            over a decade, so we understand the conditions, the
                            terrain, and what it takes to get the job done right
                            the first time.
                        </p>
                        <p className={s.body}>
                            Every quote is free, every job gets the owner
                            on-site, and our service range covers everything
                            from earthmoving and drainage to dam construction
                            and welding.
                        </p>
                        <ul className={s.points}>
                            {POINTS.map((point) => (
                                <li key={point} className={s.point}>
                                    <CheckCircle2
                                        size={17}
                                        className={s.pointIcon}
                                        aria-hidden="true"
                                    />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        className={s.imageCol}
                        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.15 }}
                    >
                        <img
                            src="/about-us.png"
                            alt="MTB Earthmoving on the job"
                            className={s.image}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
