import { useEffect, useRef, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeader } from './UI';
import s from './SocialProof.module.scss';

type GalleryImage = { src: string; alt: string };

const IMAGES: GalleryImage[] = [
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
    const [lightbox, setLightbox] = useState<number | null>(null);

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

    const openLightbox = (index: number) => {
        setLightbox(index);
        isPausedRef.current = true;
    };

    const closeLightbox = useCallback(() => {
        setLightbox(null);
        isPausedRef.current = false;
    }, []);

    const prev = useCallback(() => {
        setLightbox((i) => (i === null ? null : (i - 1 + IMAGES.length) % IMAGES.length));
    }, []);

    const next = useCallback(() => {
        setLightbox((i) => (i === null ? null : (i + 1) % IMAGES.length));
    }, []);

    useEffect(() => {
        if (lightbox === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [lightbox, closeLightbox, prev, next]);

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
                            const idx = i % IMAGES.length;
                            const img = IMAGES[idx];
                            const isDupe = i >= IMAGES.length;
                            return (
                                <div
                                    key={i}
                                    className={s.tile}
                                    aria-hidden={isDupe}
                                    onClick={isDupe ? undefined : () => openLightbox(idx)}
                                    role={isDupe ? undefined : 'button'}
                                    tabIndex={isDupe ? -1 : 0}
                                    aria-label={isDupe ? undefined : `View ${img.alt}`}
                                    onKeyDown={isDupe ? undefined : (e) => e.key === 'Enter' && openLightbox(idx)}
                                >
                                    <img
                                        src={img.src}
                                        alt={isDupe ? '' : img.alt}
                                        className={s.tileImg}
                                        draggable={false}
                                        loading="lazy"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {lightbox !== null && (
                <div
                    className={s.lightboxBackdrop}
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image lightbox"
                >
                    <button
                        className={s.lightboxClose}
                        onClick={closeLightbox}
                        aria-label="Close lightbox"
                    >
                        <X size={22} />
                    </button>

                    <button
                        className={`${s.lightboxNav} ${s.lightboxPrev}`}
                        onClick={(e) => { e.stopPropagation(); prev(); }}
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={28} />
                    </button>

                    <div className={s.lightboxImgWrap} onClick={(e) => e.stopPropagation()}>
                        <img
                            src={IMAGES[lightbox].src}
                            alt={IMAGES[lightbox].alt}
                            className={s.lightboxImg}
                        />
                        <p className={s.lightboxCaption}>{IMAGES[lightbox].alt}</p>
                    </div>

                    <button
                        className={`${s.lightboxNav} ${s.lightboxNext}`}
                        onClick={(e) => { e.stopPropagation(); next(); }}
                        aria-label="Next image"
                    >
                        <ChevronRight size={28} />
                    </button>
                </div>
            )}
        </section>
    );
}
