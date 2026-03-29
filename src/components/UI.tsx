import type { ReactNode } from 'react';
import s from './UI.module.scss';

type ButtonProps = {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'white';
    href?: string;
    type?: 'button' | 'submit';
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
};

export function Button({
    children,
    variant = 'primary',
    href,
    type = 'button',
    disabled,
    onClick,
    className = '',
}: ButtonProps) {
    const variantClass =
        variant === 'secondary'
            ? s.secondary
            : variant === 'white'
              ? s.white
              : s.primary;
    const cls = `${s.btn} ${variantClass} ${className}`.trim();

    if (href) {
        return (
            <a href={href} className={cls}>
                {children}
            </a>
        );
    }
    return (
        <button
            type={type}
            className={cls}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

type SectionHeaderProps = {
    label: string;
    title: string;
    subtitle?: string;
    dark?: boolean;
};

export function SectionHeader({ label, title, subtitle, dark = false }: SectionHeaderProps) {
    return (
        <div className={s.sectionHeader}>
            <span className={`${s.sectionLabel}${dark ? ` ${s.sectionLabelDark}` : ''}`}>{label}</span>
            <h2 className={`${s.sectionTitle}${dark ? ` ${s.sectionTitleDark}` : ''}`}>{title}</h2>
            {subtitle && (
                <p className={`${s.sectionSubtitle}${dark ? ` ${s.sectionSubtitleDark}` : ''}`}>{subtitle}</p>
            )}
        </div>
    );
}

type FormFieldProps = {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'tel' | 'textarea' | 'select';
    value: string;
    error?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    options?: readonly string[];
    autoComplete?: string;
};

export function FormField({
    label,
    name,
    type = 'text',
    value,
    error,
    onChange,
    placeholder,
    required,
    options = [],
    autoComplete,
}: FormFieldProps) {
    const inputCls =
        `${s.formInput} ${error ? s.formInputError : ''} ${type === 'textarea' ? s.formTextarea : ''} ${type === 'select' ? s.formSelect : ''}`.trim();
    const inputId = `field-${name}`;
    const errorId = `error-${name}`;

    return (
        <div className={s.formGroup}>
            <label htmlFor={inputId} className={s.formLabel}>
                {label}
                {required && ' *'}
            </label>
            {type === 'textarea' ? (
                <textarea
                    id={inputId}
                    name={name}
                    className={inputCls}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    required={required}
                    aria-describedby={error ? errorId : undefined}
                    aria-invalid={!!error}
                />
            ) : type === 'select' ? (
                <select
                    id={inputId}
                    name={name}
                    className={inputCls}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required={required}
                    aria-describedby={error ? errorId : undefined}
                    aria-invalid={!!error}
                >
                    <option value="">Select a service...</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    id={inputId}
                    name={name}
                    type={type}
                    className={inputCls}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    required={required}
                    autoComplete={autoComplete}
                    aria-describedby={error ? errorId : undefined}
                    aria-invalid={!!error}
                />
            )}
            {error && (
                <p id={errorId} className={s.formError} role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
