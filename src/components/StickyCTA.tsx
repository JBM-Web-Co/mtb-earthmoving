import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { businessData } from '../data';
import s from './StickyCTA.module.scss';

export default function StickyCTA() {
    const [visible, set_visible] = useState(false);

    useEffect(() => {
        const on_scroll = () =>
            set_visible(window.scrollY > window.innerHeight * 0.7);
        window.addEventListener('scroll', on_scroll, { passive: true });
        return () => window.removeEventListener('scroll', on_scroll);
    }, []);

    return (
        <div className={`${s.stickyCta} ${visible ? s.visible : ''}`}>
            <a href={`tel:${businessData.phoneTel}`} className={s.btn}>
                <Phone size={18} /> Call {businessData.phone}
            </a>
        </div>
    );
}
