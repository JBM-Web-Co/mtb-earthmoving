import type { VercelRequest, VercelResponse } from '@vercel/node';
import { HttpError } from './_src/utils/http-error.js';
import { notificationEmail } from './_src/notification-email.js';
import * as logger from './_src/utils/logger.js';
import { ContactSchema } from './_src/utils/contact-schema.js';
import { rateLimited } from './_src/utils/rate-limit.js';

const get_client_ip = (req: VercelRequest): string => {
    const forwarded = req.headers['x-forwarded-for'];
    if (Array.isArray(forwarded)) return forwarded[0] ?? 'unknown';
    if (typeof forwarded === 'string')
        return forwarded.split(',')[0]?.trim() ?? 'unknown';
    return 'unknown';
};

const validate_request = (req: VercelRequest) => {
    // --- Request validation ---
    if (req.method !== 'POST') throw new HttpError(405, 'Method not allowed');

    // --- Body validation ---
    const parsed = ContactSchema.safeParse(req.body);
    if (!parsed.success) throw new HttpError(400, 'Invalid request body');

    return parsed.data;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        if (rateLimited(get_client_ip(req)))
            throw new HttpError(
                429,
                'Too many requests, please try again later'
            );

        const contact_data = validate_request(req);

        // Honeypot tripped — accept silently so bots get no signal, but don't send.
        if (contact_data.company) return res.status(200).json({ ok: true });

        logger.info('Received contact submission', {
            service: contact_data.serviceSelect ?? 'unspecified',
        });

        await notificationEmail(contact_data);
        return res.status(200).json({ ok: true });
    } catch (err) {
        if (err instanceof HttpError)
            return res.status(err.statusCode).json({ error: err.message });

        return res.status(500).json({
            error: 'Internal server error',
        });
    }
}
