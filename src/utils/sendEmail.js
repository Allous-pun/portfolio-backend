import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
  // Validate required environment variables
  const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'NOTIFY_EMAIL'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:', missingVars);
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
        ciphers: 'SSLv3'
      },
      connectionTimeout: 30000, // 30 seconds
      socketTimeout: 30000,     // 30 seconds
      greetingTimeout: 30000,   // 30 seconds
      logger: true,             // Enable logging
      debug: true               // Enable debug output
    });

    // Verify transporter configuration
    await transporter.verify();
    console.log('✅ SMTP transporter verified successfully');

    const mailOptions = {
      from: `"O. Aloyce" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      // Add text version for better deliverability
      text: html.replace(/<[^>]*>/g, ''),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("📨 Email sent successfully:", info.messageId);
    
    return info;
  } catch (error) {
    console.error("❌ Detailed email error:", {
      name: error.name,
      message: error.message,
      code: error.code,
      command: error.command
    });
    
    // More specific error messages
    if (error.code === 'ETIMEDOUT') {
      throw new Error("Email service connection timeout. Please try again.");
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error("Unable to connect to email service.");
    } else if (error.responseCode === 535) {
      throw new Error("Email authentication failed. Check SMTP credentials.");
    }
    
    throw new Error("Email could not be sent. Please try again later.");
  }
};

export default sendEmail;
