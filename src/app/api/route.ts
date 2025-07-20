import nodemailer from "nodemailer"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and message are required" },
        { status: 400 },
      )
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing email configuration")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.verify()

    const businessMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission - ${subject || "General Inquiry"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Subject:</strong> ${subject || "General Inquiry"}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, "<br>")}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This email was sent from the Perth Transfers contact form.</p>
            <p>Timestamp: ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Perth" })}</p>
          </div>
        </div>
      `,
    }

    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting RG Cabs Perth Transfers",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f59e0b, #f97316); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">RG Cabs Perth Transfers</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Premium Transportation Services</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Thank you for your inquiry, ${name}!</h2>
            
            <p style="color: #555; line-height: 1.6;">
              We've received your message and will get back to you within 2 hours during business hours.
            </p>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Your Message Summary:</h3>
              <p><strong>Subject:</strong> ${subject || "General Inquiry"}</p>
              <p><strong>Message:</strong> ${message.substring(0, 100)}${message.length > 100 ? "..." : ""}</p>
            </div>
            
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h3 style="color: #333; margin-top: 0;">Need Immediate Assistance?</h3>
              <p style="margin: 10px 0;"><strong>📞 Phone:</strong> +61435287287 - Available 24/7</p>
              <p style="margin: 10px 0;"><strong>📧 Email:</strong> rgcabsperth@gmail.comu</p>
              <p style="margin: 10px 0;"><strong>🌐 Website:</strong> www.rgcabsperth.com.au</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="tel:+61812345678" style="background-color: #f59e0b; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Call Now: +61435287287
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px; text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              Perth Transfers - Your trusted transportation partner<br>
              Serving Perth and surrounding areas 24/7
            </p>
          </div>
        </div>
      `,
    }

    await Promise.all([transporter.sendMail(businessMailOptions), transporter.sendMail(customerMailOptions)])

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Email sending error:", error)

    if (error instanceof Error) {
      if (error.message.includes("Invalid login")) {
        return NextResponse.json({ error: "Email authentication failed" }, { status: 500 })
      }
      if (error.message.includes("Network")) {
        return NextResponse.json({ error: "Network error - please try again" }, { status: 500 })
      }
    }

    return NextResponse.json({ error: "Failed to send email. Please try again or call us directly." }, { status: 500 })
  }
}
