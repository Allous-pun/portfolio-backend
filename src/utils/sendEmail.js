import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  // Create transporter using your actual email credentials (private)
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your private Gmail
      pass: process.env.EMAIL_PASS, // app password
    },
  });

  // Define the email details
  const mailOptions = {
    from: `"Aloyce Otieno" <${process.env.NO_REPLY_EMAIL || process.env.EMAIL_USER}>`, // masked sender
    to: options.to || process.env.NOTIFY_EMAIL, // recipient (default = you)
    replyTo: process.env.NOTIFY_EMAIL, // replies go to your real inbox
    subject: options.subject || "New Message from Portfolio",
    html: options.html || "<p>No content provided.</p>",
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
