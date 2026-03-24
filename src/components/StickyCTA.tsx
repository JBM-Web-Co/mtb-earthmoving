import { Phone } from 'lucide-react';
import { businessData } from '../data';
import s from './StickyCTA.module.scss';

export default function StickyCTA() {
    return (
        <div className={s.stickyCta}>
            <a
                href={`tel:${businessData.phone.replace(/\s/g, '')}`}
                className={s.btn}
            >
                <Phone size={18} /> Call {businessData.phone}
            </a>
        </div>
    );
}
