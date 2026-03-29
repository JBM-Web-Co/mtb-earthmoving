import { z } from 'zod';

export const SERVICE_OPTIONS = [
    'Rural Earthmoving & Clearing',
    'Site Preparation — House & Shed Pads',
    'Road Construction & Gravelling',
    'Drainage Solutions',
    'Dam Construction & De-silting',
    'Road Maintenance & Repair',
    'Welding, Fabrication & Machinery Repair',
] as const;

export const ContactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'Name is required')
        .max(120, 'Name is too long'),
    email: z.email('Invalid email').max(254, 'Email is too long'),
    phone: z
        .string()
        .trim()
        .min(1, 'Phone is required')
        .max(40, 'Phone is too long'),
    serviceSelect: z
        .enum(SERVICE_OPTIONS)
        .optional(),
    message: z.string().trim().max(5000, 'Message is too long').optional(),
});
export type ContactSchema = z.infer<typeof ContactSchema>;
