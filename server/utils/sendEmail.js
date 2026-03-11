import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {
  try {
    // Create transporter with better configuration
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
      // Add connection pooling and timeout
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      connectionTimeout: 60000, // 60 seconds
      greetingTimeout: 30000, // 30 seconds
      socketTimeout: 60000, // 60 seconds
    });

    // Verify connection configuration
    await transporter.verify();
    console.log("Email transporter verified successfully");

    const message = {
      from: `Biosynvanta Website <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: options.subject,
      text: options.message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h2 style="color: #333; margin-bottom: 20px;">New Website Inquiry</h2>
            <div style="background-color: white; padding: 20px; border-radius: 6px; border-left: 4px solid #007bff;">
              <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${options.name}</p>
              <p style="margin: 0 0 10px 0;"><strong>Phone:</strong> ${options.phone}</p>
              <p style="margin: 0 0 10px 0;"><strong>Subject:</strong> ${options.subject}</p>
              <p style="margin: 0;"><strong>Message:</strong></p>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin-top: 10px;">
                ${options.message}
              </div>
            </div>
            <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 6px;">
              <p style="margin: 0; font-size: 14px; color: #6c757d;">
                This inquiry was submitted from the Biosynvanta website contact form.
              </p>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #6c757d;">
                Submitted on: ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(message);
    console.log("Email sent successfully:", result.messageId);
    return result;

  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};