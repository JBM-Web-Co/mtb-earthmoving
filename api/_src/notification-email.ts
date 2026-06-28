import { NotificationEmail } from './emails/NotificationEmail.js';
import { sendEmail } from './utils/send-email.js';
import type { ContactSchema } from './utils/contact-schema.js';
import * as logger from './utils/logger.js';
import { HttpError } from './utils/http-error.js';

const FROM_EMAIL = process.env.FROM_EMAIL ?? '';
const TO_EMAIL = process.env.TO_EMAIL ?? '';

export const notificationEmail = async (data: ContactSchema) => {
    if (!FROM_EMAIL || !TO_EMAIL)
        return logger.error(
            'Email configuration is missing. Please set FROM_EMAIL and TO_EMAIL environment variables.'
        );

    try {
        await sendEmail({
            from: `MTB Earthmoving <${FROM_EMAIL}>`,
            to: TO_EMAIL,
            subject: `New contact form submission from ${data.name}`,
            react: NotificationEmail(data),
        });
    } catch (error) {
        throw new HttpError(
            400,
            `Failed to send notification email: ${error instanceof Error ? error.message : String(error)}`
        );
    }
};
