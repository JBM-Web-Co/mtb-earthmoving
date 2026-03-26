import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { businessData } from '../data';
import s from './StickyCTA.module.scss';

export default function StickyCTA() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () =>
            setVisible(window.scrollY > window.innerHeight * 0.7);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className={`${s.stickyCta} ${visible ? s.visible : ''}`}>
            <a
                href={`tel:${businessData.phone.replace(/\s/g, '')}`}
                className={s.btn}
            >
                <Phone size={18} /> Call {businessData.phone}
            </a>
        </div>
    );
}
