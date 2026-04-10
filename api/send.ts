import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
    api: { bodyParser: { sizeLimit: '10mb' } },
};

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    try {
        const { firstName, lastName, email, company, service, details, file_name, file_content } = req.body;

        const attachments = [];
        if (file_name && file_content) {
            // Ihiwalay ang metadata (data:image/png;base64,) sa mismong base64 string
            const parts = file_content.split(',');
            const contentType = parts[0].split(':')[1].split(';')[0];
            const base64Data = parts[1];

            attachments.push({
                filename: file_name,
                content: base64Data, // Mas safe ang raw string para sa batch send
                contentType: contentType
            });
        }

        const { data, error } = await resend.batch.send([
            {
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
                        <p><strong>Details:</strong><br/>${details.replace(/\n/g, '<br/>')}</p>
                    </div>
                `,
                attachments: attachments.length > 0 ? attachments : undefined
            },
            {
                from: 'GlobalBIM Engineering <info@globalbim.ph>',
                to: [email],
                subject: 'Inquiry Received - GlobalBIM Engineering',
                html: `
                    <div style="font-family: sans-serif; color: #1e293b;">
                        <h2 style="color: #eab308;">We've received your request</h2>
                        <p>Dear ${firstName}, thank you for reaching out. Our team is currently reviewing your project details for <strong>${service}</strong>.</p>
                        <p>We will get back to you within 24-48 hours.</p>
                        <br/>
                        <p>Best regards,<br/><strong>GlobalBIM Team</strong></p>
                    </div>
                `
            }
        ]);

        if (error) return res.status(400).json({ error });
        return res.status(200).json({ message: 'Sent!', data });

    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}