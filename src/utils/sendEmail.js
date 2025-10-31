import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,        // smtp-relay.brevo.com
      port: Number(process.env.SMTP_PORT), // 587
      secure: false,                       // Brevo requires secure=false for port 587
      auth: {
        user: process.env.SMTP_USER,       // 9a7a70001@smtp-brevo.com
        pass: process.env.SMTP_PASS,       // your Brevo SMTP key
      },
      tls: {
        rejectUnauthorized: false,         // prevents some Render SMTP TLS issues
      },
    });

    const mailOptions = {
      from: `"O. Aloyce" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("📨 Email sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error("Email could not be sent.");
  }
};

export default sendEmail;
