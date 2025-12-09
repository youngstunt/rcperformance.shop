import nodemailer from "nodemailer"

// Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

/**
 * Send OTP verification code for login
 */
export async function sendOTPEmail(email: string, otp: string) {
  await transporter.sendMail({
    from: `"RC Performance" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Your Login Code - RC Performance",
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1a1a; color: #ffffff; padding: 32px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #dc2626; margin: 0; font-size: 24px;">RC PERFORMANCE</h1>
          <p style="color: #888; margin: 8px 0 0 0; font-size: 14px;">ECU Tuning & Performance</p>
        </div>

        <h2 style="color: #ffffff; margin-bottom: 16px;">Your Login Code</h2>
        <p style="color: #cccccc; margin-bottom: 24px;">Use this code to sign in to your account:</p>

        <div style="background-color: #2a2a2a; padding: 20px; border-radius: 8px; text-align: center; margin: 24px 0; border: 1px solid #dc2626;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #ffffff;">${otp}</span>
        </div>

        <p style="color: #888888; font-size: 14px; margin-top: 24px;">
          This code expires in 10 minutes. If you didn't request this code, you can safely ignore this email.
        </p>

        <hr style="border: none; border-top: 1px solid #333; margin: 32px 0;" />

        <p style="color: #666666; font-size: 12px; text-align: center;">
          RC Performance LLC | Eastern Connecticut<br/>
          <a href="https://rcperformance.shop" style="color: #dc2626;">rcperformance.shop</a>
        </p>
      </div>
    `,
  })
}

/**
 * Send notification when ticket is updated
 */
export async function sendTicketUpdateEmail(
  email: string,
  ticketId: string,
  vehicleInfo: string,
  message: string
) {
  const ticketUrl = `${process.env.NEXTAUTH_URL}/dashboard/tickets/${ticketId}`

  await transporter.sendMail({
    from: `"RC Performance" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Ticket Update - ${vehicleInfo}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1a1a; color: #ffffff; padding: 32px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #dc2626; margin: 0; font-size: 24px;">RC PERFORMANCE</h1>
        </div>

        <h2 style="color: #ffffff; margin-bottom: 16px;">Ticket Update</h2>
        <p style="color: #cccccc; margin-bottom: 8px;">Vehicle: <strong>${vehicleInfo}</strong></p>

        <div style="background-color: #2a2a2a; padding: 16px; border-radius: 8px; margin: 24px 0; border-left: 4px solid #dc2626;">
          <p style="color: #ffffff; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>

        <a href="${ticketUrl}" style="display: inline-block; background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 16px;">
          View Ticket
        </a>

        <hr style="border: none; border-top: 1px solid #333; margin: 32px 0;" />

        <p style="color: #666666; font-size: 12px; text-align: center;">
          RC Performance LLC | Eastern Connecticut<br/>
          <a href="https://rcperformance.shop" style="color: #dc2626;">rcperformance.shop</a>
        </p>
      </div>
    `,
  })
}

/**
 * Send notification when tune is complete
 */
export async function sendTuneCompleteEmail(
  email: string,
  ticketId: string,
  vehicleInfo: string
) {
  const ticketUrl = `${process.env.NEXTAUTH_URL}/dashboard/tickets/${ticketId}`

  await transporter.sendMail({
    from: `"RC Performance" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Your Tune is Ready! - ${vehicleInfo}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1a1a; color: #ffffff; padding: 32px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #dc2626; margin: 0; font-size: 24px;">RC PERFORMANCE</h1>
        </div>

        <div style="text-align: center; margin-bottom: 24px;">
          <span style="font-size: 48px;">🎉</span>
        </div>

        <h2 style="color: #22c55e; margin-bottom: 16px; text-align: center;">Your Tune is Complete!</h2>

        <p style="color: #cccccc; text-align: center; margin-bottom: 8px;">
          Your custom tune for your <strong>${vehicleInfo}</strong> is ready to download.
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${ticketUrl}" style="display: inline-block; background-color: #dc2626; color: white; padding: 16px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
            Download Your Tune
          </a>
        </div>

        <div style="background-color: #2a2a2a; padding: 16px; border-radius: 8px; margin: 24px 0;">
          <p style="color: #888888; margin: 0; font-size: 14px;">
            <strong style="color: #ffffff;">Next Steps:</strong><br/>
            1. Download your tuned file from the ticket page<br/>
            2. Follow the flashing guide for your vehicle<br/>
            3. If you need any modifications, you can reopen the ticket
          </p>
        </div>

        <hr style="border: none; border-top: 1px solid #333; margin: 32px 0;" />

        <p style="color: #666666; font-size: 12px; text-align: center;">
          RC Performance LLC | Eastern Connecticut<br/>
          <a href="https://rcperformance.shop" style="color: #dc2626;">rcperformance.shop</a>
        </p>
      </div>
    `,
  })
}

/**
 * Send payment confirmation email
 */
export async function sendPaymentConfirmationEmail(
  email: string,
  ticketId: string,
  vehicleInfo: string,
  amount: number
) {
  const ticketUrl = `${process.env.NEXTAUTH_URL}/dashboard/tickets/${ticketId}`
  const formattedAmount = (amount / 100).toFixed(2)

  await transporter.sendMail({
    from: `"RC Performance" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Payment Confirmed - ${vehicleInfo}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1a1a; color: #ffffff; padding: 32px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #dc2626; margin: 0; font-size: 24px;">RC PERFORMANCE</h1>
        </div>

        <h2 style="color: #22c55e; margin-bottom: 16px;">Payment Confirmed</h2>

        <div style="background-color: #2a2a2a; padding: 16px; border-radius: 8px; margin: 24px 0;">
          <p style="color: #888888; margin: 0 0 8px 0; font-size: 14px;">Vehicle</p>
          <p style="color: #ffffff; margin: 0 0 16px 0; font-weight: bold;">${vehicleInfo}</p>

          <p style="color: #888888; margin: 0 0 8px 0; font-size: 14px;">Amount Paid</p>
          <p style="color: #22c55e; margin: 0; font-weight: bold; font-size: 24px;">$${formattedAmount}</p>
        </div>

        <p style="color: #cccccc; margin-bottom: 24px;">
          Your tuning ticket is now open. Our team will begin working on your custom tune shortly.
          We'll notify you when there are updates or when your tune is ready.
        </p>

        <a href="${ticketUrl}" style="display: inline-block; background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
          View Ticket
        </a>

        <hr style="border: none; border-top: 1px solid #333; margin: 32px 0;" />

        <p style="color: #666666; font-size: 12px; text-align: center;">
          RC Performance LLC | Eastern Connecticut<br/>
          <a href="https://rcperformance.shop" style="color: #dc2626;">rcperformance.shop</a>
        </p>
      </div>
    `,
  })
}

// Admin notification email address
const ADMIN_EMAIL = "rcperformancellc@gmail.com"

/**
 * Send admin notification when a new ticket is created
 */
export async function sendAdminNewTicketEmail(
  ticketId: string,
  customerEmail: string,
  vehicleInfo: string,
  ecuReadTool: string,
  tuneType?: string,
  notes?: string
) {
  const ticketUrl = `${process.env.NEXTAUTH_URL}/admin/tickets/${ticketId}`

  await transporter.sendMail({
    from: `"RC Performance" <${process.env.GMAIL_USER}>`,
    to: ADMIN_EMAIL,
    subject: `New Ticket Created - ${vehicleInfo}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1a1a; color: #ffffff; padding: 32px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #dc2626; margin: 0; font-size: 24px;">RC PERFORMANCE - ADMIN</h1>
        </div>

        <h2 style="color: #3b82f6; margin-bottom: 16px;">New Ticket Created</h2>

        <div style="background-color: #2a2a2a; padding: 16px; border-radius: 8px; margin: 24px 0;">
          <p style="color: #888888; margin: 0 0 8px 0; font-size: 14px;">Customer</p>
          <p style="color: #ffffff; margin: 0 0 16px 0; font-weight: bold;">${customerEmail}</p>

          <p style="color: #888888; margin: 0 0 8px 0; font-size: 14px;">Vehicle</p>
          <p style="color: #ffffff; margin: 0 0 16px 0; font-weight: bold;">${vehicleInfo}</p>

          <p style="color: #888888; margin: 0 0 8px 0; font-size: 14px;">ECU Read Tool</p>
          <p style="color: #ffffff; margin: 0 0 16px 0;">${ecuReadTool}</p>

          ${tuneType ? `
          <p style="color: #888888; margin: 0 0 8px 0; font-size: 14px;">Tune Type</p>
          <p style="color: #ffffff; margin: 0 0 16px 0;">${tuneType}</p>
          ` : ''}

          ${notes ? `
          <p style="color: #888888; margin: 0 0 8px 0; font-size: 14px;">Notes</p>
          <p style="color: #ffffff; margin: 0; white-space: pre-wrap;">${notes}</p>
          ` : ''}
        </div>

        <p style="color: #fbbf24; margin-bottom: 24px;">
          Status: Pending Payment
        </p>

        <a href="${ticketUrl}" style="display: inline-block; background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
          View Ticket in Admin
        </a>

        <hr style="border: none; border-top: 1px solid #333; margin: 32px 0;" />

        <p style="color: #666666; font-size: 12px; text-align: center;">
          This is an automated admin notification from RC Performance
        </p>
      </div>
    `,
  })
}

/**
 * Send admin notification when payment is received
 */
export async function sendAdminPaymentReceivedEmail(
  ticketId: string,
  customerEmail: string,
  vehicleInfo: string,
  amount: number,
  paymentType: string
) {
  const ticketUrl = `${process.env.NEXTAUTH_URL}/admin/tickets/${ticketId}`
  const formattedAmount = (amount / 100).toFixed(2)

  await transporter.sendMail({
    from: `"RC Performance" <${process.env.GMAIL_USER}>`,
    to: ADMIN_EMAIL,
    subject: `Payment Received - $${formattedAmount} - ${vehicleInfo}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1a1a; color: #ffffff; padding: 32px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #dc2626; margin: 0; font-size: 24px;">RC PERFORMANCE - ADMIN</h1>
        </div>

        <h2 style="color: #22c55e; margin-bottom: 16px;">Payment Received!</h2>

        <div style="background-color: #2a2a2a; padding: 16px; border-radius: 8px; margin: 24px 0;">
          <p style="color: #888888; margin: 0 0 8px 0; font-size: 14px;">Amount</p>
          <p style="color: #22c55e; margin: 0 0 16px 0; font-weight: bold; font-size: 28px;">$${formattedAmount}</p>

          <p style="color: #888888; margin: 0 0 8px 0; font-size: 14px;">Payment Type</p>
          <p style="color: #ffffff; margin: 0 0 16px 0;">${paymentType === 'NEW_TICKET' ? 'New Ticket' : 'Ticket Reopen'}</p>

          <p style="color: #888888; margin: 0 0 8px 0; font-size: 14px;">Customer</p>
          <p style="color: #ffffff; margin: 0 0 16px 0;">${customerEmail}</p>

          <p style="color: #888888; margin: 0 0 8px 0; font-size: 14px;">Vehicle</p>
          <p style="color: #ffffff; margin: 0;">${vehicleInfo}</p>
        </div>

        <p style="color: #cccccc; margin-bottom: 24px;">
          The ticket is now open and ready for you to start working on.
        </p>

        <a href="${ticketUrl}" style="display: inline-block; background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
          View Ticket in Admin
        </a>

        <hr style="border: none; border-top: 1px solid #333; margin: 32px 0;" />

        <p style="color: #666666; font-size: 12px; text-align: center;">
          This is an automated admin notification from RC Performance
        </p>
      </div>
    `,
  })
}

/**
 * Send admin notification when customer sends a message
 */
export async function sendAdminCustomerMessageEmail(
  ticketId: string,
  customerEmail: string,
  vehicleInfo: string,
  message: string
) {
  const ticketUrl = `${process.env.NEXTAUTH_URL}/admin/tickets/${ticketId}`

  await transporter.sendMail({
    from: `"RC Performance" <${process.env.GMAIL_USER}>`,
    to: ADMIN_EMAIL,
    subject: `Customer Message - ${vehicleInfo}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1a1a; color: #ffffff; padding: 32px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #dc2626; margin: 0; font-size: 24px;">RC PERFORMANCE - ADMIN</h1>
        </div>

        <h2 style="color: #3b82f6; margin-bottom: 16px;">New Customer Message</h2>

        <div style="background-color: #2a2a2a; padding: 16px; border-radius: 8px; margin: 24px 0;">
          <p style="color: #888888; margin: 0 0 8px 0; font-size: 14px;">Customer</p>
          <p style="color: #ffffff; margin: 0 0 16px 0; font-weight: bold;">${customerEmail}</p>

          <p style="color: #888888; margin: 0 0 8px 0; font-size: 14px;">Vehicle</p>
          <p style="color: #ffffff; margin: 0 0 16px 0;">${vehicleInfo}</p>

          <p style="color: #888888; margin: 0 0 8px 0; font-size: 14px;">Message</p>
          <div style="background-color: #1a1a1a; padding: 12px; border-radius: 4px; border-left: 4px solid #3b82f6;">
            <p style="color: #ffffff; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>

        <a href="${ticketUrl}" style="display: inline-block; background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Reply in Admin
        </a>

        <hr style="border: none; border-top: 1px solid #333; margin: 32px 0;" />

        <p style="color: #666666; font-size: 12px; text-align: center;">
          This is an automated admin notification from RC Performance
        </p>
      </div>
    `,
  })
}
