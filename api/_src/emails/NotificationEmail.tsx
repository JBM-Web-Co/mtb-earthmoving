import React from 'react';
import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Section,
    Text,
    Heading,
    Hr,
} from '@react-email/components';
import type { ContactSchema } from '../utils/contactSchema.js';

const FONT_FAMILY =
    'ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif';

export const NotificationEmail = (data: ContactSchema) => {
    const { name, email, phone, serviceSelect, message } = data;

    return (
        <Html lang="en">
            <Head />

            <Preview>New contact form submission from {name}</Preview>

            <Body style={bodyStyle}>
                <Container style={containerStyle}>
                    <Heading as="h2" style={headingStyle}>
                        New Contact Form Submission
                    </Heading>

                    <Hr style={divider} />

                    <Text style={fieldStyle}>
                        <strong>Name:</strong> {name}
                    </Text>
                    <Text style={fieldStyle}>
                        <strong>Email:</strong> {email}
                    </Text>
                    <Text style={fieldStyle}>
                        <strong>Phone:</strong> {phone}
                    </Text>
                    <Text style={fieldStyle}>
                        <strong>Service:</strong>{' '}
                        {serviceSelect ?? 'Not specified'}
                    </Text>
                    <Section>
                        <Text style={fieldStyle}>
                            <strong>Message:</strong>
                        </Text>
                        <Text style={messageStyle}>
                            {message ?? 'No message provided'}
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

/* ---------- Styles ---------- */

const bodyStyle: React.CSSProperties = {
    margin: 0,
    padding: '24px 0',
    backgroundColor: '#f6f7fb',
    fontFamily: FONT_FAMILY,
};

const containerStyle: React.CSSProperties = {
    maxWidth: '600px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '24px',
};

const headingStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: '20px',
    color: '#111827',
    margin: '0 0 8px',
};

const divider: React.CSSProperties = {
    borderTop: '1px solid #e5e7eb',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    margin: '12px 0 16px',
};

const fieldStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#111827',
    margin: '0 0 8px',
};

const messageStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#374151',
    margin: '0',
    whiteSpace: 'pre-wrap',
};
