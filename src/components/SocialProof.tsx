import { motion, useReducedMotion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { SectionHeader } from './UI';
import { useScrollReveal } from '../hooks';
import s from './SocialProof.module.scss';

const PLACEHOLDER_COUNT = 6;

export default function Gallery() {
    const { ref, isVisible } = useScrollReveal();
    const reducedMotion = useReducedMotion();

    return (
        <section id="gallery" className={s.gallery}>
            <div className={s.inner}>
                <SectionHeader label="Our Work" title="Recent Projects" />
                <p className={s.intro}>
                    Photos coming soon — check back to see our latest projects
                    across Gunnedah and the North West.
                </p>
                <div ref={ref} className={s.grid}>
                    {Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => (
                        <motion.div
                            key={i}
                            className={s.tile}
                            initial={
                                reducedMotion
                                    ? false
                                    : { opacity: 0, scale: 0.97 }
                            }
                            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                            transition={{
                                duration: 0.4,
                                delay: i * 0.07,
                                ease: 'easeOut',
                            }}
                            aria-label="Photo coming soon"
                        >
                            <Camera size={32} className={s.tileIcon} />
                            <span className={s.tileText}>
                                Photo Coming Soon
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
