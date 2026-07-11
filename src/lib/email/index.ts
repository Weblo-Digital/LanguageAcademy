import { Resend } from "resend";
import { BrevoClient } from "@getbrevo/brevo";

const resend = new Resend(process.env.RESEND_API_KEY || "mock");

// Initialize Brevo Client
const brevoApiKey = process.env.BREVO_API_KEY || "mock";
const brevoClient = new BrevoClient({ apiKey: brevoApiKey });

interface EmailPayload {
  formType: string;
  data: Record<string, any>;
  sourcePage?: string;
}

export async function sendNotificationEmail(payload: EmailPayload) {
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "noreply@nextpoint.ma";
  const recipientEmail = "contact@nextpoint.ma"; // Academy inbox

  const subject = `[Admin] Nouvelle soumission - Formulaire ${payload.formType}`;
  
  // Format submission details for HTML and Text
  const detailsHtml = Object.entries(payload.data)
    .map(
      ([key, val]) =>
        `<p style="margin: 4px 0;"><strong style="text-transform: capitalize;">${key}:</strong> ${val}</p>`
    )
    .join("");

  const detailsText = Object.entries(payload.data)
    .map(([key, val]) => `${key}: ${val}`)
    .join("\n");

  const htmlContent = `
    <div style="font-family: sans-serif; padding: 24px; color: #0F172A; background-color: #F8FAFC;">
      <h2 style="color: #1E293B; margin-top: 0;">Nouvelle soumission de formulaire reçue</h2>
      <p style="font-size: 14px; color: #64748B;">Type: <strong>${payload.formType}</strong></p>
      ${payload.sourcePage ? `<p style="font-size: 14px; color: #64748B;">Page Source: <code>${payload.sourcePage}</code></p>` : ""}
      
      <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #E2E8F0; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #1E293B; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Détails:</h3>
        ${detailsHtml}
      </div>
      
      <p style="font-size: 12px; color: #94A3B8; margin-bottom: 0;">Next Point Academy Admin Automated System</p>
    </div>
  `;

  const textContent = `
    Nouvelle soumission de formulaire reçue
    Type: ${payload.formType}
    ${payload.sourcePage ? `Page Source: ${payload.sourcePage}` : ""}

    Détails:
    ${detailsText}

    Next Point Academy Admin Automated System
  `;

  // 1. Try sending via Resend (Primary)
  try {
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "mock") {
      await resend.emails.send({
        from: `Next Point Academy <${senderEmail}>`,
        to: recipientEmail,
        subject: subject,
        html: htmlContent,
        text: textContent,
      });
      console.log("Email notification sent successfully via Resend.");
      return;
    }
    throw new Error("Resend API key missing or mock");
  } catch (resendError) {
    console.warn("Resend failed or skipped, falling back to Brevo:", resendError);

    // 2. Try sending via Brevo (Failover)
    try {
      if (process.env.BREVO_API_KEY && process.env.BREVO_API_KEY !== "mock") {
        await brevoClient.transactionalEmails.sendTransacEmail({
          subject: subject,
          htmlContent: htmlContent,
          textContent: textContent,
          sender: { name: "Next Point Academy", email: senderEmail },
          to: [{ email: recipientEmail, name: "Administration" }],
        });
        console.log("Email notification sent successfully via Brevo.");
        return;
      }
      console.log("Brevo API key missing or mock. Skipping email sending.");
    } catch (brevoError) {
      console.error("Failover Brevo sending also failed:", brevoError);
    }
  }
}
