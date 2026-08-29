import nodemailer from "nodemailer";

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER || "fake@example.com",
        pass: process.env.SMTP_PASSWORD || "fake_password",
      },
    });
  }

  async sendAdminNotification(subject: string, data: any) {
    if (!process.env.SMTP_USER || process.env.SMTP_USER === "fake@example.com") {
      console.log("Mock Email Sent: Admin Notification", subject, data);
      return;
    }

    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_FROM || '"Visha IT Solutions" <noreply@vishait.com>',
        to: process.env.ADMIN_EMAIL || "admin@vishait.com",
        subject: `[Visha IT] ${subject}`,
        html: `<p>New enquiry received.</p><pre>${JSON.stringify(data, null, 2)}</pre>`,
      });
      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error sending admin email:", error);
    }
  }
}

export const emailService = new EmailService();
