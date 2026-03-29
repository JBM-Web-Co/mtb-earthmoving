import type { VercelRequest, VercelResponse } from '@vercel/node';
import { HttpError } from './_src/utils/HttpError.js';
import { notificationEmail } from './_src/notificationEmail.js';
import * as logger from './_src/utils/logger.js';
import { ContactSchema } from './_src/utils/contactSchema.js';

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
        const contact_data = validate_request(req);
        logger.info('Received contact data', { contact_data });

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
