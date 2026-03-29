import { useEffect, useRef, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeader } from './UI';
import s from './SocialProof.module.scss';

const IMAGES = [
    { src: '/work1.png', alt: 'MTB Earthmoving — Recent Project' },
    { src: '/work2.png', alt: 'MTB Earthmoving — Recent Project' },
    { src: '/work3.png', alt: 'MTB Earthmoving — Recent Project' },
    { src: '/work4.png', alt: 'MTB Earthmoving — Recent Project' },
    { src: '/work5.png', alt: 'MTB Earthmoving — Recent Project' },
    { src: '/work6.png', alt: 'MTB Earthmoving — Recent Project' },
];

export default function Gallery() {
    const trackRef = useRef<HTMLDivElement>(null);
    const isPaused = useRef(false);
    const resumeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined
    );
    const [lightbox, setLightbox] = useState<number | null>(null);

    // Auto-scroll: increment scrollLeft each frame, loop back at end
    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;

        let animId: number;
        const step = () => {
            if (!isPaused.current) {
                el.scrollLeft += 1;
                // When we reach the halfway point (end of first copy), jump back seamlessly
                if (el.scrollLeft >= el.scrollWidth / 2) {
                    el.scrollLeft -= el.scrollWidth / 2;
                }
            }
            animId = requestAnimationFrame(step);
        };
        animId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animId);
    }, []);

    const pause = () => {
        clearTimeout(resumeTimer.current);
        isPaused.current = true;
    };

    // delay gives touch momentum time to finish before resuming
    const resume = (delay = 0) => {
        clearTimeout(resumeTimer.current);
        resumeTimer.current = setTimeout(() => {
            isPaused.current = false;
        }, delay);
    };

    const closeLightbox = useCallback(() => {
        setLightbox(null);
        resume();
    }, []);

    const prev = useCallback(() => {
        setLightbox((i) =>
            i === null ? null : (i - 1 + IMAGES.length) % IMAGES.length
        );
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

            <div
                ref={trackRef}
                className={s.track}
                onMouseEnter={pause}
                onMouseLeave={() => resume()}
                onTouchStart={pause}
                onTouchEnd={() => resume(800)}
            >
                {/* Two copies — second is aria-hidden, used only for the seamless loop illusion */}
                {[false, true].flatMap((isDupe) =>
                    IMAGES.map((img, i) => (
                        <div
                            key={`${isDupe ? 'b' : 'a'}-${i}`}
                            className={s.tile}
                            aria-hidden={isDupe || undefined}
                            role={isDupe ? undefined : 'button'}
                            tabIndex={isDupe ? -1 : 0}
                            aria-label={isDupe ? undefined : `View ${img.alt}`}
                            onClick={
                                isDupe
                                    ? undefined
                                    : () => {
                                          setLightbox(i);
                                          pause();
                                      }
                            }
                            onKeyDown={
                                isDupe
                                    ? undefined
                                    : (e) => e.key === 'Enter' && setLightbox(i)
                            }
                        >
                            <img
                                src={img.src}
                                alt={isDupe ? '' : img.alt}
                                className={s.tileImg}
                                draggable={false}
                                loading="lazy"
                            />
                        </div>
                    ))
                )}
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
                        onClick={(e) => {
                            e.stopPropagation();
                            prev();
                        }}
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={28} />
                    </button>

                    <div
                        className={s.lightboxImgWrap}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={IMAGES[lightbox].src}
                            alt={IMAGES[lightbox].alt}
                            className={s.lightboxImg}
                        />
                    </div>

                    <button
                        className={`${s.lightboxNav} ${s.lightboxNext}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            next();
                        }}
                        aria-label="Next image"
                    >
                        <ChevronRight size={28} />
                    </button>
                </div>
            )}
        </section>
    );
}
