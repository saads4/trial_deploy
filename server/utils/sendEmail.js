import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const message = {
    from: `Biosynvanta Website <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `<h3>New Inquiry from ${options.name}</h3>
           <p><strong>Phone:</strong> ${options.phone}</p>
           <p><strong>Subject:</strong> ${options.subject}</p>
           <p><strong>Message:</strong> ${options.message}</p>`
  };

  await transporter.sendMail(message);
};