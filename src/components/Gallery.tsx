import {
    useEffect,
    useRef,
    useState,
    useCallback,
    type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { useReducedMotion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeader } from './UI';
import s from './Gallery.module.scss';

const IMAGES = [
    { src: '/work1.webp', width: 1280, height: 960 },
    { src: '/work2.webp', width: 1280, height: 1707 },
    { src: '/work3.webp', width: 1280, height: 960 },
    { src: '/work4.webp', width: 1280, height: 960 },
    { src: '/work5.webp', width: 1170, height: 868 },
    { src: '/work6.webp', width: 1170, height: 868 },
];
const ALT = 'MTB Earthmoving — recent project';

export default function Gallery() {
    const track_ref = useRef<HTMLDivElement>(null);
    const is_paused = useRef(false);
    const resume_timer = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined
    );
    const opener_ref = useRef<HTMLElement | null>(null);
    const dialog_ref = useRef<HTMLDivElement>(null);
    const [lightbox, set_lightbox] = useState<number | null>(null);
    const reduced_motion = useReducedMotion();

    // Auto-scroll: increment scrollLeft each frame, loop back at end. Disabled
    // entirely when the user prefers reduced motion, and paused while the
    // gallery is off-screen to avoid wasting CPU/battery.
    useEffect(() => {
        if (reduced_motion) return;
        const el = track_ref.current;
        if (!el) return;

        const visibility = new IntersectionObserver(
            ([entry]) => {
                is_paused.current = !entry.isIntersecting;
            },
            { threshold: 0 }
        );
        visibility.observe(el);

        let anim_id: number;
        const step = () => {
            if (!is_paused.current) {
                el.scrollLeft += 1;
                // At the halfway point (end of first copy), jump back seamlessly
                if (el.scrollLeft >= el.scrollWidth / 2) {
                    el.scrollLeft -= el.scrollWidth / 2;
                }
            }
            anim_id = requestAnimationFrame(step);
        };
        anim_id = requestAnimationFrame(step);
        return () => {
            cancelAnimationFrame(anim_id);
            visibility.disconnect();
        };
    }, [reduced_motion]);

    const pause = () => {
        clearTimeout(resume_timer.current);
        is_paused.current = true;
    };

    // delay gives touch momentum time to finish before resuming
    const resume = (delay = 0) => {
        clearTimeout(resume_timer.current);
        resume_timer.current = setTimeout(() => {
            is_paused.current = false;
        }, delay);
    };

    const open_lightbox = (i: number, opener: HTMLElement) => {
        opener_ref.current = opener;
        set_lightbox(i);
        pause();
    };

    const close_lightbox = useCallback(() => {
        set_lightbox(null);
        resume();
        opener_ref.current?.focus();
    }, []);

    const prev = useCallback(() => {
        set_lightbox((i) =>
            i === null ? null : (i - 1 + IMAGES.length) % IMAGES.length
        );
    }, []);

    const next = useCallback(() => {
        set_lightbox((i) => (i === null ? null : (i + 1) % IMAGES.length));
    }, []);

    // Keyboard handling + focus trap while the lightbox is open
    useEffect(() => {
        if (lightbox === null) return;
        dialog_ref.current?.focus();

        const on_key = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close_lightbox();
            else if (e.key === 'ArrowLeft') prev();
            else if (e.key === 'ArrowRight') next();
            else if (e.key === 'Tab') {
                const focusables =
                    dialog_ref.current?.querySelectorAll<HTMLElement>('button');
                if (!focusables || focusables.length === 0) return;
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        window.addEventListener('keydown', on_key);
        return () => window.removeEventListener('keydown', on_key);
    }, [lightbox, close_lightbox, prev, next]);

    return (
        <section id="gallery" className={s.gallery}>
            <div className={s.inner}>
                <SectionHeader label="Our Work" title="Recent Projects" />
            </div>

            <div
                ref={track_ref}
                className={s.track}
                onMouseEnter={pause}
                onMouseLeave={() => resume()}
                onTouchStart={pause}
                onTouchEnd={() => resume(800)}
            >
                {/* Two copies — second is aria-hidden, used only for the seamless loop illusion */}
                {[false, true].flatMap((is_dupe) =>
                    IMAGES.map((img, i) => (
                        <div
                            key={`${is_dupe ? 'b' : 'a'}-${i}`}
                            className={s.tile}
                            aria-hidden={is_dupe || undefined}
                            role={is_dupe ? undefined : 'button'}
                            tabIndex={is_dupe ? -1 : 0}
                            aria-label={is_dupe ? undefined : `View ${ALT}`}
                            onClick={
                                is_dupe
                                    ? undefined
                                    : (e) => open_lightbox(i, e.currentTarget)
                            }
                            onKeyDown={
                                is_dupe
                                    ? undefined
                                    : (
                                          e: ReactKeyboardEvent<HTMLDivElement>
                                      ) => {
                                          if (
                                              e.key === 'Enter' ||
                                              e.key === ' '
                                          ) {
                                              e.preventDefault();
                                              open_lightbox(i, e.currentTarget);
                                          }
                                      }
                            }
                        >
                            <img
                                src={img.src}
                                alt={is_dupe ? '' : ALT}
                                className={s.tileImg}
                                width={img.width}
                                height={img.height}
                                draggable={false}
                                loading="lazy"
                            />
                        </div>
                    ))
                )}
            </div>

            {lightbox !== null && (
                <div
                    ref={dialog_ref}
                    className={s.lightboxBackdrop}
                    onClick={close_lightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Project image viewer"
                    tabIndex={-1}
                >
                    <button
                        className={s.lightboxClose}
                        onClick={close_lightbox}
                        aria-label="Close image viewer"
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
                            alt={ALT}
                            className={s.lightboxImg}
                            width={IMAGES[lightbox].width}
                            height={IMAGES[lightbox].height}
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
