import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmailResend = async ({ to, subject, html }) => {
  try {
    console.log('📧 Attempting to send email via Resend...');
    console.log('📧 To:', to);
    console.log('📧 Subject:', subject);

    const { data, error } = await resend.emails.send({
      from: 'Aloyce Otieno <onboarding@resend.dev>',
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error('❌ Resend API error:', error);
      throw new Error(`Email failed: ${error.message}`);
    }

    console.log('✅ Email sent successfully via Resend. ID:', data.id);
    return data;
  } catch (error) {
    console.error('❌ Resend email failed:', error);
    throw new Error('Email service temporarily unavailable. Please try again later.');
  }
};

export default sendEmailResend;
