import { useEffect, useRef } from 'react';
import { SectionHeader } from './UI';
import s from './SocialProof.module.scss';

const IMAGES = [
    { src: '/work1.png', alt: 'MTB Earthmoving project — site work' },
    { src: '/work2.png', alt: 'MTB Earthmoving project — earthworks' },
    { src: '/work3.png', alt: 'MTB Earthmoving project — land clearing' },
    { src: '/work4.png', alt: 'MTB Earthmoving project — road construction' },
    { src: '/work5.png', alt: 'MTB Earthmoving project — drainage' },
    { src: '/work6.png', alt: 'MTB Earthmoving project — dam work' },
];

// 2 copies for seamless infinite loop
const ALL_TILES = Array.from({ length: IMAGES.length * 2 }, (_, i) => i);

const SPEED_DESKTOP = 0.45;
const SPEED_MOBILE = 0.28;

export default function Gallery() {
    const innerRef = useRef<HTMLDivElement>(null);
    const posRef = useRef(0);
    const isPausedRef = useRef(false);

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
            }
            animId = requestAnimationFrame(step);
        };

        animId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animId);
    }, []);

    const pause = () => { isPausedRef.current = true; };
    const resume = () => { isPausedRef.current = false; };

    return (
        <section id="gallery" className={s.gallery}>
            <div className={s.inner}>
                <SectionHeader label="Our Work" title="Recent Projects" />
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
                        {ALL_TILES.map((_, i) => {
                            const img = IMAGES[i % IMAGES.length];
                            const isDupe = i >= IMAGES.length;
                            return (
                                <div
                                    key={i}
                                    className={s.tile}
                                    aria-hidden={isDupe}
                                >
                                    <img
                                        src={img.src}
                                        alt={isDupe ? '' : img.alt}
                                        className={s.tileImg}
                                        draggable={false}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
