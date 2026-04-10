import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Note: Standard Node.js handler format ito para sa Vercel functions
export default async function handler(req: VercelRequest, res: VercelResponse) {
    // 1. Check if method is POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { firstName, lastName, email, company, service, details, file_name, file_content } = req.body;

        const attachments = [];
        if (file_name && file_content) {
            // Safe split para sa Base64
            const base64Data = file_content.includes(',')
                ? file_content.split(',')[1]
                : file_content;

            attachments.push({
                filename: file_name,
                content: base64Data,
            });
        }

        // ==========================================
        // CALL 1: Para sa GlobalBIM (Inbound)
        // ==========================================
        const inbound = await resend.emails.send({
            from: 'GlobalBIM Website <no-reply@globalbim.ph>',
            to: ['info@globalbim.ph'],
            subject: `New Project Inquiry: ${service} from ${company}`,
            html: `
                <div style="font-family: sans-serif; color: #1e293b;">
                    <h2 style="color: #eab308;">New Contact Request</h2>
                    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Company:</strong> ${company}</p>
                    <p><strong>Service:</strong> ${service}</p>
                    <p><strong>Details:</strong><br/>${details}</p>
                </div>
            `,
            attachments: attachments.length > 0 ? attachments : undefined
        });

        // ==========================================
        // CALL 2: Para sa Client (Auto-reply)
        // ==========================================
        const outbound = await resend.emails.send({
            from: 'GlobalBIM Engineering <info@globalbim.ph>',
            to: [email],
            subject: 'Inquiry Received - GlobalBIM Engineering',
            html: `
                <div style="font-family: sans-serif; color: #1e293b;">
                    <h2 style="color: #eab308;">We've received your request</h2>
                    <p>Dear ${firstName}, thank you for reaching out to us regarding <strong>${service}</strong>.</p>
                    <p>We will get back to you within 24-48 hours.</p>
                    <br/>
                    <p>Best regards,<br/><strong>GlobalBIM Team</strong></p>
                </div>
            `
        });

        // Error handling para sa individual calls
        if (inbound.error || outbound.error) {
            return res.status(400).json({ error: inbound.error || outbound.error });
        }

        return res.status(200).json({ message: 'Emails sent successfully!' });

    } catch (err: any) {
        console.error("Server Error:", err);
        return res.status(500).json({ error: err.message });
    }
}