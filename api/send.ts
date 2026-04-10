import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// SUPER IMPORTANT: Ito ang mag-a-allow sa Vercel na tumanggap ng files up to 10MB.
// Kapag wala ito, iba-block ng Vercel ang request kapag lumagpas sa 1MB ang image/PDF.
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { firstName, lastName, email, company, service, details, file_name, file_content } = req.body;

        // CHECKPOINT 1: Tignan natin kung nakarating sa backend ang file
        console.log("--- INCOMING REQUEST ---");
        console.log("File Name exists?", !!file_name);
        console.log("File Content exists?", !!file_content);

        const attachments = [];
        if (file_name && file_content) {
            try {
                // FOOLPROOF CLEANER: Tatanggalin nito yung "data:image/png;base64," kahit ano pa ang type ng file
                const base64Data = file_content.replace(/^data:(.*,)?/, '');

                // Mas stable basahin ng Resend SDK kapag naka-Buffer
                attachments.push({
                    filename: file_name,
                    content: Buffer.from(base64Data, 'base64'),
                });
                console.log("Success: Attachment formatted and added to array.");
            } catch (formatError) {
                console.error("Failed to format attachment:", formatError);
            }
        }

        // CHECKPOINT 2: Tignan natin kung may laman ang array bago ipadala kay Resend
        console.log("Total Attachments to send:", attachments.length);

        const { data, error } = await resend.batch.send([
            {
                from: 'GlobalBIM Website <no-reply@globalbim.ph>',
                to: ['info@globalbim.ph'],
                subject: `New Project Inquiry: ${service} from ${company}`,
                html: `
                    <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px;">
                        <h2 style="color: #eab308; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">New Contact Request</h2>
                        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Company:</strong> ${company}</p>
                        <p><strong>Service Requested:</strong> ${service}</p>
                        <p><strong>Project Details:</strong><br/>
                        <div style="background-color: #f8fafc; padding: 15px; border-radius: 4px; margin-top: 5px;">
                            ${details.replace(/\n/g, '<br/>')}
                        </div>
                    </div>
                `,
                // I-attach lang natin kapag may laman yung array
                attachments: attachments.length > 0 ? attachments : undefined
            },
            {
                from: 'GlobalBIM Engineering <info@globalbim.ph>',
                to: [email],
                subject: 'We have received your project inquiry - GlobalBIM',
                html: `
                    <div style="font-family: Arial, sans-serif; color: #1e293b; line-height: 1.6; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #eab308;">Inquiry Received</h2>
                        <p>Dear ${firstName},</p>
                        <p>Thank you for reaching out to <strong>GlobalBIM Engineering</strong>.</p>
                        <p>This is an automated message to confirm that we have successfully received your inquiry and any attached project files regarding <strong>${service}</strong>.</p>
                        <p>Our technical team is currently reviewing your requirements. We are committed to providing high-fidelity structural solutions, and one of our senior engineers will get back to you with a comprehensive response or proposal within the next 24 to 48 hours.</p>
                        <p>If you have any urgent details or revisions to add, please feel free to reply directly to this email.</p>
                        <br/>
                        <p>Best regards,</p>
                        <p><strong>The Engineering Team</strong><br/>
                        GlobalBIM Engineering & Steel Detailing<br/>
                        <a href="https://www.globalbim.ph" style="color: #eab308; text-decoration: none;">www.globalbim.ph</a></p>
                    </div>
                `
            }
        ]);

        if (error) {
            console.error("Resend API Error:", error);
            return res.status(400).json({ error });
        }

        console.log("--- EMAIL SENT SUCCESSFULLY ---");
        return res.status(200).json({ message: 'Emails sent successfully!', data });
    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}