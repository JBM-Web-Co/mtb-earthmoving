import { useEffect, useRef } from 'react';
import { Camera } from 'lucide-react';
import { SectionHeader } from './UI';
import s from './SocialProof.module.scss';

const PLACEHOLDER_COUNT = 8;
// 2 copies — we loop from 0 to -50% of total width seamlessly
const ALL_TILES = Array.from({ length: PLACEHOLDER_COUNT * 2 }, (_, i) => i);

const SPEED_DESKTOP = 0.45;
const SPEED_MOBILE = 0.28;

export default function Gallery() {
    const innerRef = useRef<HTMLDivElement>(null);
    const posRef = useRef(0);
    const isPausedRef = useRef(false);
    const currentIdxRef = useRef(0);

    useEffect(() => {
        const inner = innerRef.current;
        if (!inner) return;

        let animId: number;

        const step = () => {
            if (!isPausedRef.current) {
                const speed =
                    window.innerWidth >= 768 ? SPEED_DESKTOP : SPEED_MOBILE;
                posRef.current -= speed;

                const halfWidth = inner.scrollWidth / 2;

                if (posRef.current <= -halfWidth) posRef.current += halfWidth;
                if (posRef.current > 0) posRef.current -= halfWidth;

                inner.style.transform = `translateX(${posRef.current}px)`;

                const newIdx =
                    Math.floor(
                        (Math.abs(posRef.current) / halfWidth) *
                            PLACEHOLDER_COUNT
                    ) % PLACEHOLDER_COUNT;
                if (newIdx !== currentIdxRef.current) {
                    currentIdxRef.current = newIdx;
                }
            }
            animId = requestAnimationFrame(step);
        };

        animId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animId);
    }, []);

    const pause = () => {
        isPausedRef.current = true;
    };
    const resume = () => {
        isPausedRef.current = false;
    };

    return (
        <section id="gallery" className={s.gallery}>
            <div className={s.inner}>
                <SectionHeader label="Our Work" title="Recent Projects" />
                <p className={s.intro}>
                    Photos coming soon — check back to see our latest projects
                    across Gunnedah and the North West.
                </p>
            </div>

            <div className={s.trackWrapper}>
                <div
                    className={s.trackOuter}
                    onMouseEnter={pause}
                    onMouseLeave={resume}
                    onTouchStart={pause}
                    onTouchEnd={resume}
                >
                    <div ref={innerRef} className={s.scrollTrack}>
                        {ALL_TILES.map((_, i) => (
                            <div
                                key={i}
                                className={s.tile}
                                aria-label={
                                    i < PLACEHOLDER_COUNT
                                        ? 'Photo coming soon'
                                        : undefined
                                }
                                aria-hidden={i >= PLACEHOLDER_COUNT}
                            >
                                <Camera size={36} className={s.tileIcon} />
                                <span className={s.tileText}>
                                    Photo Coming Soon
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
