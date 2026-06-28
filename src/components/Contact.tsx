import { useState } from 'react';
import { Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';
import { businessData } from '../data';
import { Button, FormField, SectionHeader } from './UI';
import s from './Contact.module.scss';
import { track } from '@vercel/analytics';

type ContactFormData = {
    name: string;
    email: string;
    phone: string;
    serviceSelect: string;
    message: string;
};
type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const EMPTY_FORM: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    serviceSelect: '',
    message: '',
};

function validate_form(data: ContactFormData): ContactFormErrors {
    const errors: ContactFormErrors = {};
    if (!data.name.trim()) errors.name = 'Name is required';
    if (!data.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Please enter a valid email';
    }
    if (!data.phone.trim()) {
        errors.phone = 'Phone is required';
    } else if (!/^[\d\s()+-]{8,20}$/.test(data.phone)) {
        errors.phone = 'Please enter a valid phone number';
    }
    return errors;
}

export default function Contact() {
    const [form, set_form] = useState<ContactFormData>(EMPTY_FORM);
    const [errors, set_errors] = useState<ContactFormErrors>({});
    // Honeypot: real users never see or fill this; bots do.
    const [honeypot, set_honeypot] = useState('');
    const [submitted, set_submitted] = useState(false);
    const [loading, set_loading] = useState(false);
    const [submit_error, set_submit_error] = useState<string | null>(null);

    const update = (field: keyof ContactFormData) => (value: string) => {
        set_form((prev) => ({ ...prev, [field]: value }));
        if (errors[field])
            set_errors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handle_submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errs = validate_form(form);
        if (Object.keys(errs).length > 0) {
            set_errors(errs);
            return;
        }

        set_loading(true);
        set_submit_error(null);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, company: honeypot }),
            });

            if (!res.ok) throw new Error();

            track('Form Submitted', { source: 'homepage' });
            set_submitted(true);
            set_form(EMPTY_FORM);
        } catch {
            set_submit_error('Something went wrong. Please try again later.');
        } finally {
            set_loading(false);
        }
    };

    return (
        <section id="contact" className={s.contact}>
            <div className={s.inner}>
                <SectionHeader
                    label="Get in Touch"
                    title="Start Your Project"
                    subtitle="Ready to get started? Give us a call or send us a message below."
                />

                <div className={s.phoneBlock}>
                    <a
                        href={`tel:${businessData.phoneTel}`}
                        className={s.phoneLink}
                    >
                        <span className={s.phoneIconWrap}>
                            <Phone size={22} />
                        </span>
                        <div className={s.phoneText}>
                            <span className={s.phoneLabel}>
                                Call us directly
                            </span>
                            <span className={s.phoneNumber}>
                                {businessData.phone}
                            </span>
                        </div>
                    </a>
                </div>

                <div className={s.grid}>
                    <div className={s.info}>
                        <h3 className={s.infoTitle}>{businessData.name}</h3>
                        <p className={s.infoText}>{businessData.description}</p>

                        <div className={s.item}>
                            <div className={s.itemIcon}>
                                <Phone size={18} />
                            </div>
                            <div>
                                <div className={s.itemLabel}>Phone</div>
                                <a
                                    href={`tel:${businessData.phoneTel}`}
                                    className={s.itemValue}
                                >
                                    {businessData.phone}
                                </a>
                            </div>
                        </div>

                        <div className={s.item}>
                            <div className={s.itemIcon}>
                                <Mail size={18} />
                            </div>
                            <div>
                                <div className={s.itemLabel}>Email</div>
                                <a
                                    href={`mailto:${businessData.email}`}
                                    className={s.itemValue}
                                >
                                    {businessData.email}
                                </a>
                            </div>
                        </div>

                        <div className={s.item}>
                            <div className={s.itemIcon}>
                                <Clock size={18} />
                            </div>
                            <div>
                                <div className={s.itemLabel}>Hours</div>
                                <span className={s.itemValueStatic}>
                                    {businessData.hours}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={s.formWrap}>
                        {submitted ? (
                            <div className={s.successPanel}>
                                <CheckCircle2
                                    size={44}
                                    className={s.successIcon}
                                    aria-hidden="true"
                                />
                                <h3 className={s.successTitle}>
                                    Message Sent!
                                </h3>
                                <p className={s.successText}>
                                    Thanks for reaching out. We'll be in touch
                                    shortly.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handle_submit} noValidate>
                                <FormField
                                    label="Full Name"
                                    name="name"
                                    value={form.name}
                                    error={errors.name}
                                    onChange={update('name')}
                                    placeholder="Your full name"
                                    autoComplete="name"
                                    required
                                />
                                <FormField
                                    label="Phone Number"
                                    name="phone"
                                    type="tel"
                                    value={form.phone}
                                    error={errors.phone}
                                    onChange={update('phone')}
                                    placeholder="04XX XXX XXX"
                                    autoComplete="tel"
                                    required
                                />
                                <FormField
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    error={errors.email}
                                    onChange={update('email')}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    required
                                />
                                <FormField
                                    label="Service Required"
                                    name="serviceSelect"
                                    type="select"
                                    value={form.serviceSelect}
                                    onChange={update('serviceSelect')}
                                    options={businessData.services.map(
                                        (svc) => svc.title
                                    )}
                                />
                                <FormField
                                    label="Message / Project Details"
                                    name="message"
                                    type="textarea"
                                    value={form.message}
                                    onChange={update('message')}
                                    placeholder="Tell us about your project — location, scope, timeline..."
                                />
                                {/* Honeypot — visually hidden, off-screen, not announced */}
                                <input
                                    type="text"
                                    name="company"
                                    className={s.honeypot}
                                    tabIndex={-1}
                                    autoComplete="off"
                                    aria-hidden="true"
                                    value={honeypot}
                                    onChange={(e) =>
                                        set_honeypot(e.target.value)
                                    }
                                />
                                {submit_error && (
                                    <p className={s.submitError}>
                                        {submit_error}
                                    </p>
                                )}
                                <Button type="submit" disabled={loading}>
                                    {loading ? 'Sending…' : 'Send Message'}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
