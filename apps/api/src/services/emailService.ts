import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

// Lazy transporter initialization
let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!transporter) {
    // Debug: log SMTP config
    console.log("SMTP_USER present:", !!process.env.SMTP_USER);
    console.log("SMTP_PASS present:", !!process.env.SMTP_PASS);

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error(
        "SMTP credentials not configured. Set SMTP_USER and SMTP_PASS in .env"
      );
    }

    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

/**
 * Send pending approval email to students (thstd, interstd)
 * Called after successful registration
 */
export async function sendPendingApprovalEmail(
  email: string,
  firstName: string,
  lastName: string
): Promise<void> {
  const mailOptions = {
    from: process.env.SMTP_FROM || "ACCP Conference <noreply@accp.com>",
    to: email,
    subject: "Registration Received - Pending Verification",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">Thank you for registering!</h2>
        <p>Dear ${firstName} ${lastName},</p>
        <p>We have received your registration request for <strong>ACCP Conference 2026</strong>.</p>
        <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
          <strong>Your account is currently pending verification.</strong>
          <p style="margin: 10px 0 0 0;">Our team will review your submitted documents and verify your student status.</p>
        </div>
        <p>You will receive another email once your account has been approved.</p>
        <p>This process typically takes <strong>1-3 business days</strong>.</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;"/>
        <p style="color: #6b7280; font-size: 14px;">
          If you have any questions, please contact us at <a href="mailto:support@accp.com">support@accp.com</a>
        </p>
        <p style="color: #374151;">Best regards,<br/><strong>ACCP Conference Team</strong></p>
      </div>
    `,
  };

  await getTransporter().sendMail(mailOptions);
}

/**
 * Send approval email to students
 * Called after backoffice approval
 */
export async function sendVerificationApprovedEmail(
  email: string,
  firstName: string
): Promise<void> {
  const loginUrl = process.env.BASE_URL
    ? `${process.env.BASE_URL}/login`
    : "http://localhost:3000/login";

  const mailOptions = {
    from: process.env.SMTP_FROM || "ACCP Conference <noreply@accp.com>",
    to: email,
    subject: "Account Approved - ACCP Conference 2026",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #10b981;">Verification Successful!</h2>
        <p>Dear ${firstName},</p>
        <p>Great news! Your student documents have been verified and your account is now <strong>active</strong>.</p>
        <p>You can now log in to access your dashboard and complete your registration payment.</p>
        
        <div style="margin: 30px 0; text-align: center;">
          <a href="${loginUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Login to Your Account</a>
        </div>

        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="color: #6b7280; word-break: break-all;">${loginUrl}</p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;"/>
        <p style="color: #374151;">Best regards,<br/><strong>ACCP Conference Team</strong></p>
      </div>
    `,
  };

  await getTransporter().sendMail(mailOptions);
}
