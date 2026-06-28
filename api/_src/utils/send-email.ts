import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type EmailProps = {
    from: string;
    to: string;
    subject: string;
    react: React.ReactNode;
};
export const sendEmail = async ({ from, to, subject, react }: EmailProps) => {
    try {
        await resend.emails.send({
            from,
            to,
            subject,
            react,
        });
    } catch (error) {
        throw new Error(
            `Failed to send email, from: ${from}, to: ${to}, subject: ${subject}, error: ${String(
                error
            )}`
        );
    }
};
