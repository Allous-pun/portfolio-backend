const sendEmailWeb3Forms = async ({ to, subject, html }) => {
  try {
    console.log('📧 Attempting to send email via Web3Forms...');
    console.log('📧 To:', to);
    console.log('📧 Subject:', subject);

    // Convert HTML to plain text for the message body
    const plainText = html
      .replace(/<h[1-6]>/g, '\n\n') // Headers get extra spacing
      .replace(/<\/h[1-6]>/g, '\n')
      .replace(/<p>/g, '')
      .replace(/<\/p>/g, '\n\n')
      .replace(/<strong>/g, '**')
      .replace(/<\/strong>/g, '**')
      .replace(/<em>/g, '*')
      .replace(/<\/em>/g, '*')
      .replace(/<[^>]*>/g, '') // Remove all other HTML tags
      .replace(/\n\s*\n/g, '\n\n') // Clean up extra newlines
      .trim();

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: subject,
        from_name: 'Aloyce Otieno',
        email: to,
        message: plainText, // Just plain text, no HTML
      }),
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Email sent successfully via Web3Forms');
      return result;
    } else {
      console.error('❌ Web3Forms API error:', result);
      throw new Error(result.message || 'Email failed to send');
    }
  } catch (error) {
    console.error('❌ Web3Forms request failed:', error);
    throw new Error('Email service temporarily unavailable. Please try again later.');
  }
};

export default sendEmailWeb3Forms;
