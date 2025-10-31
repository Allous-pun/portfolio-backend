import Contact from "../models/Contact.js";
import Service from "../models/Service.js";
import sendEmail from "../utils/sendEmail.js";

// @desc    Submit a new contact / enquiry / quotation
// @route   POST /api/contact
// @access  Public
export const createContact = async (req, res) => {
  try {
    // Validate required fields
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required fields"
      });
    }

    // Validate email format
    const emailRegex = /.+\@.+\..+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address"
      });
    }

    let contact = await Contact.create(req.body);
    contact = await contact.populate("service", "title price category");

    const heading =
      contact.type === "quotation"
        ? "Quotation Request"
        : contact.type === "enquiry"
        ? "Service Enquiry"
        : "Contact Message";

    // ✅ Build admin email
    const emailHTML = `
      <h2>📩 New ${heading}</h2>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      ${contact.phone ? `<p><strong>Phone:</strong> ${contact.phone}</p>` : ""}

      ${
        contact.service
          ? `<p><strong>Service Selected:</strong> ${contact.service.title} (${contact.service.category}) — $${contact.service.price}</p>`
          : ""
      }

      ${contact.company ? `<p><strong>Company:</strong> ${contact.company}</p>` : ""}
      ${contact.budgetRange ? `<p><strong>Budget:</strong> ${contact.budgetRange}</p>` : ""}
      ${contact.timeline ? `<p><strong>Timeline:</strong> ${contact.timeline}</p>` : ""}

      <p><strong>Subject:</strong> ${contact.subject}</p>
      <p><strong>Message:</strong></p>
      <blockquote>${contact.message}</blockquote>

      <hr />
      <p style="font-size: 11px; color: #777;">
        This message was automatically sent from your portfolio backend.
      </p>
    `;

    // ✅ Send to admin (don't block on failure)
    try {
      await sendEmail({
        to: process.env.NOTIFY_EMAIL,
        subject: `New ${heading} — ${contact.name}`,
        html: emailHTML,
      });
      console.log(`📨 Email sent to admin: ${process.env.NOTIFY_EMAIL}`);
    } catch (emailError) {
      console.error("❌ Failed to send admin email:", emailError.message);
      // Don't fail the entire request if email fails
    }

    // ✅ Show available services for enquiries or quotations
    let servicesSection = "";
    if (contact.type === "enquiry" || contact.type === "quotation") {
      const services = await Service.find().sort({ category: 1, price: 1 });

      if (services.length > 0) {
        servicesSection = `
          <h3>💼 Available Services</h3>
          <ul>
            ${services
              .map(
                (s) =>
                  `<li><strong>${s.title}</strong> — ${s.category} — $${s.price}</li>`
              )
              .join("")}
          </ul>
          <p style="font-size: 13px; color: #666;">Reply with the service name to continue.</p>
          <hr />
        `;
      }
    }

    // ✅ Auto reply to user (don't block on failure)
    try {
      const autoReplyHTML = `
        <h2>Hi ${contact.name}, 👋</h2>
        <p>Thanks for your ${
          contact.type === "quotation"
            ? "quotation request — I'll send a custom offer soon."
            : contact.type === "enquiry"
            ? "service enquiry — I'll reply shortly."
            : "message — I'll get back shortly."
        }</p>

        ${
          contact.service
            ? `<p><strong>Service Chosen:</strong> ${contact.service.title}</p>`
            : ""
        }

        ${contact.company ? `<p><strong>Company:</strong> ${contact.company}</p>` : ""}
        ${contact.budgetRange ? `<p><strong>Budget:</strong> ${contact.budgetRange}</p>` : ""}
        ${contact.timeline ? `<p><strong>Timeline:</strong> ${contact.timeline}</p>` : ""}

        ${servicesSection}

        <p>Regards,<br /><strong>O. Aloyce</strong></p>
        <hr />
        <p style="font-size: 12px; color: #777;">This is an automated reply — don't reply directly.</p>
      `;

      await sendEmail({
        to: contact.email,
        subject: `✅ We've received your ${
          contact.type === "quotation" ? "quotation request" : "message"
        }`,
        html: autoReplyHTML,
      });

      console.log(`🤖 Auto-reply sent to: ${contact.email}`);
    } catch (autoReplyError) {
      console.error("❌ Failed to send auto-reply:", autoReplyError.message);
      // Don't fail the entire request if auto-reply fails
    }

    // Always return success if contact was created
    res.status(201).json({ 
      success: true, 
      contact,
      message: "Your message has been received successfully!"
    });
  } catch (error) {
    console.error("❌ Error creating contact:", error);
    
    // Handle duplicate submissions or validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate submission detected"
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Server error. Please try again later." 
    });
  }
};

// @route   GET /api/contact
// @access  Private (Admin)
export const getContacts = async (req, res) => {
  try {
    const { type, status, search } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const contacts = await Contact.find(filter)
      .populate("service", "title price category")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    console.error("❌ Error fetching contacts:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   PUT /api/contact/:id
// @access  Private
export const updateContactStatus = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!contact)
      return res.status(404).json({ success: false, message: "Contact not found" });

    res.status(200).json({ success: true, contact });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @route   DELETE /api/contact/:id
// @access  Private
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact)
      return res.status(404).json({ success: false, message: "Contact not found" });

    res.status(200).json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
