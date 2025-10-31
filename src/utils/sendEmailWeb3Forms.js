const sendEmailWeb3Forms = async ({ to, subject, html }) => {
  try {
    console.log('📧 Attempting to send email via Web3Forms...');
    console.log('📧 To:', to);
    console.log('📧 Subject:', subject);

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
        message: html.replace(/<[^>]*>/g, ''), // Plain text version
        html: html, // HTML version
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
