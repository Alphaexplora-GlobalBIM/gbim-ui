import { Resend } from 'resend';

const resend = new Resend('re_123456789');

const payload = [
  {
    from: 'onboarding@resend.dev',
    to: 'delivered@resend.dev',
    subject: 'Test',
    html: 'Test',
    attachments: [
        {
            filename: 'test.pdf',
            content: Buffer.from('hello world').toString('base64'),
        }
    ]
  }
];

resend.batch.send(payload).then(res => console.log('send return:', res)).catch(err => console.error('send error:', err));
