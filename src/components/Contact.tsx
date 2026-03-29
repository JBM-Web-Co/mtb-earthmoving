import { useState } from 'react';
import { Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';
import { businessData } from '../data';
import { Button, FormField, SectionHeader } from './UI';
import type { ContactFormData, ContactFormErrors } from '../types';
import s from './Contact.module.scss';
import { track } from '@vercel/analytics';

const EMPTY_FORM: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    serviceSelect: '',
    message: '',
};

function validateForm(data: ContactFormData): ContactFormErrors {
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
    const [form, setForm] = useState<ContactFormData>(EMPTY_FORM);
    const [errors, setErrors] = useState<ContactFormErrors>({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const update = (field: keyof ContactFormData) => (value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field])
            setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        track('Form Submitted', { source: 'homepage' });
        e.preventDefault();
        const errs = validateForm(form);
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        setLoading(true);
        setSubmitError(null);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error();

            setSubmitted(true);
            setForm(EMPTY_FORM);
        } catch {
            setSubmitError('Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
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
                    <a href="tel:+61461522409" className={s.phoneLink}>
                        <span className={s.phoneIconWrap}>
                            <Phone size={22} />
                        </span>
                        <div className={s.phoneText}>
                            <span className={s.phoneLabel}>
                                Call us directly
                            </span>
                            <span className={s.phoneNumber}>
                                +61 461 522 409
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
                                    href="tel:+61461522409"
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
                            <form onSubmit={handleSubmit} noValidate>
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
                                {submitError && (
                                    <p className={s.submitError}>
                                        {submitError}
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
