import nodemailer from "nodemailer"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { 
      name, 
      email, 
      phone, 
      complaintType, 
      driverName,
      vehicleNumber,
      bookingRef,
      incidentDate,
      incidentTime,
      priority,
      description 
    } = await req.json()

    // Validation
    if (!name || !email || !complaintType || !description) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, complaint type, and description are required" },
        { status: 400 },
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 },
      )
    }

    // Description length validation
    if (description.trim().length < 20) {
      return NextResponse.json(
        { error: "Description must be at least 20 characters long" },
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

    // Generate complaint reference number
    const complaintRef = `RGC-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`
    
    // Format incident date and time for display
    const formatDateTime = (date: string, time: string) => {
      if (!date && !time) return "Not specified"
      if (!time) return new Date(date).toLocaleDateString("en-AU")
      if (!date) return time
      return `${new Date(date).toLocaleDateString("en-AU")} at ${time}`
    }

    const incidentDateTime = formatDateTime(incidentDate, incidentTime)

    // Priority color mapping for emails
    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case 'high': return '#ef4444'
        case 'medium': return '#f59e0b'
        case 'low': return '#10b981'
        default: return '#6b7280'
      }
    }

    // Business notification email
    const businessMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `🚨 New Complaint - ${complaintType} - ${priority.toUpperCase()} Priority - Ref: ${complaintRef}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 700px; margin: 0 auto; background-color: #f9fafb;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #f59e0b, #f97316); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">⚠️ NEW COMPLAINT RECEIVED</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">RG Cabs Perth - Customer Complaint System</p>
          </div>

          <!-- Content -->
          <div style="background-color: white; padding: 30px;">
            <!-- Priority Badge -->
            <div style="text-align: center; margin-bottom: 25px;">
              <span style="background-color: ${getPriorityColor(priority)}; color: white; padding: 8px 20px; border-radius: 20px; font-weight: bold; text-transform: uppercase; font-size: 14px;">
                ${priority} Priority
              </span>
            </div>

            <!-- Complaint Reference -->
            <div style="background-color: #fef3c7; border: 2px solid #f59e0b; border-radius: 10px; padding: 20px; margin-bottom: 25px; text-align: center;">
              <h2 style="margin: 0; color: #92400e; font-size: 18px;">Complaint Reference: ${complaintRef}</h2>
              <p style="margin: 5px 0 0 0; color: #92400e; font-size: 14px;">Please use this reference for all communications</p>
            </div>

            <!-- Customer Details -->
            <div style="background-color: #f8fafc; border-radius: 10px; padding: 20px; margin-bottom: 25px;">
              <h3 style="color: #1f2937; margin-top: 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Customer Information</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                  <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
                  <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
                  <p style="margin: 8px 0;"><strong>Phone:</strong> ${phone || "Not provided"}</p>
                </div>
                <div>
                  <p style="margin: 8px 0;"><strong>Complaint Type:</strong> ${complaintType}</p>
                  <p style="margin: 8px 0;"><strong>Date/Time:</strong> ${incidentDateTime}</p>
                  <p style="margin: 8px 0;"><strong>Priority:</strong> <span style="color: ${getPriorityColor(priority)}; font-weight: bold;">${priority.toUpperCase()}</span></p>
                </div>
              </div>
            </div>

            <!-- Service Details -->
            ${(driverName || vehicleNumber || bookingRef) ? `
            <div style="background-color: #f0f9ff; border-radius: 10px; padding: 20px; margin-bottom: 25px;">
              <h3 style="color: #1f2937; margin-top: 0; border-bottom: 2px solid #bfdbfe; padding-bottom: 10px;">Service Details</h3>
              ${driverName ? `<p style="margin: 8px 0;"><strong>Driver Name:</strong> ${driverName}</p>` : ''}
              ${vehicleNumber ? `<p style="margin: 8px 0;"><strong>Vehicle Number:</strong> ${vehicleNumber}</p>` : ''}
              ${bookingRef ? `<p style="margin: 8px 0;"><strong>Booking Reference:</strong> ${bookingRef}</p>` : ''}
            </div>` : ''}

            <!-- Complaint Description -->
            <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; margin-bottom: 25px;">
              <h3 style="color: #1f2937; margin-top: 0;">Complaint Description</h3>
              <p style="line-height: 1.6; color: #374151; background-color: white; padding: 15px; border-radius: 8px; margin: 0;">${description.replace(/\n/g, "<br>")}</p>
            </div>

            <!-- Action Required -->
            <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 10px; padding: 20px; margin-bottom: 25px;">
              <h3 style="color: #92400e; margin-top: 0;">⚡ Action Required</h3>
              <ul style="color: #92400e; margin: 0; padding-left: 20px;">
                <li>Acknowledge receipt within 2 hours</li>
                <li>Investigate the complaint thoroughly</li>
                <li>Contact customer within 24 hours</li>
                <li>Document all findings and actions taken</li>
                <li>Follow up to ensure customer satisfaction</li>
              </ul>
            </div>

            <!-- Quick Actions -->
          <div className="space-y-2 text-sm text-black font-medium">
  <div>
    📞{" "}
    <a
      href="tel:+61435287287"
      className="text-blue-600 hover:underline"
    >
      +61 435 287 287
    </a>
  </div>
  <div>
    📧{" "}
    <a
      href="mailto:rgcabsperth@gmail.com"
      className="text-blue-600 hover:underline"
    >
      rgcabsperth@gmail.com
    </a>
  </div>
</div>


          <!-- Footer -->
          <div style="background-color: #f3f4f6; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; color: #6b7280; font-size: 12px;">
              This complaint was submitted on ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Perth" })}<br>
              RG Cabs Perth - Complaint Management System
            </p>
          </div>
        </div>
      `,
    }

    // Customer acknowledgment email
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Complaint Received - Reference: ${complaintRef} - RG Cabs Perth`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #f59e0b, #f97316); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 26px; font-weight: bold;">RG Cabs Perth</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Premium Transportation Services</p>
          </div>

          <!-- Content -->
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1f2937; margin-top: 0; font-size: 22px;">Thank you for your feedback, ${name}</h2>
            
            <p style="color: #4b5563; line-height: 1.6; font-size: 16px;">
              We've received your complaint and take your concerns very seriously. Our team will investigate this matter thoroughly and respond to you within 24 hours.
            </p>

            <!-- Complaint Reference -->
            <div style="background-color: #fef3c7; border: 2px solid #f59e0b; border-radius: 10px; padding: 20px; margin: 25px 0; text-align: center;">
              <h3 style="margin: 0; color: #92400e; font-size: 18px;">Your Complaint Reference</h3>
              <p style="margin: 10px 0 0 0; color: #92400e; font-size: 24px; font-weight: bold; font-family: monospace;">${complaintRef}</p>
              <p style="margin: 10px 0 0 0; color: #92400e; font-size: 14px;">Please keep this reference number for your records</p>
            </div>

            <!-- Complaint Summary -->
            <div style="background-color: #f8fafc; border-radius: 10px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #1f2937; margin-top: 0; font-size: 18px;">Complaint Summary</h3>
              <div style="margin-bottom: 15px;">
                <p style="margin: 8px 0; color: #4b5563;"><strong>Type:</strong> ${complaintType}</p>
                <p style="margin: 8px 0; color: #4b5563;"><strong>Priority:</strong> <span style="color: ${getPriorityColor(priority)}; font-weight: bold;">${priority.charAt(0).toUpperCase() + priority.slice(1)}</span></p>
                ${incidentDateTime !== "Not specified" ? `<p style="margin: 8px 0; color: #4b5563;"><strong>Incident Date/Time:</strong> ${incidentDateTime}</p>` : ''}
              </div>
              <div style="background-color: white; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; color: #4b5563; font-style: italic;">
                  "${description.substring(0, 150)}${description.length > 150 ? '...' : ''}"
                </p>
              </div>
            </div>

            <!-- What Happens Next -->
            <div style="background-color: #ecfdf5; border-radius: 10px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #065f46; margin-top: 0; font-size: 18px;">What Happens Next?</h3>
              <div style="color: #047857;">
                <p style="margin: 10px 0; display: flex; align-items: center;">
                  <span style="background-color: #10b981; color: white; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 10px;">1</span>
                  We acknowledge your complaint immediately
                </p>
                <p style="margin: 10px 0; display: flex; align-items: center;">
                  <span style="background-color: #10b981; color: white; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 10px;">2</span>
                  Our team investigates the matter thoroughly
                </p>
                <p style="margin: 10px 0; display: flex; align-items: center;">
                  <span style="background-color: #10b981; color: white; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 10px;">3</span>
                  We contact you within 24 hours with an update
                </p>
                <p style="margin: 10px 0; display: flex; align-items: center;">
                  <span style="background-color: #10b981; color: white; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 10px;">4</span>
                  We work with you to resolve the issue satisfactorily
                </p>
              </div>
            </div>

            <!-- Contact Information -->
            <div style="background-color: #fef3c7; border-radius: 10px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #92400e; margin-top: 0; font-size: 18px;">Need Immediate Assistance?</h3>
              <div style="color: #92400e;">
                <p style="margin: 10px 0; font-size: 16px;"><strong>📞 Phone:</strong> +61 435 287 287 - Available 24/7</p>
                <p style="margin: 10px 0; font-size: 16px;"><strong>📧 Email:</strong> rgcabsperth@gmail.com</p>
                <p style="margin: 10px 0; font-size: 16px;"><strong>🌐 Website:</strong> www.rgcabsperth.com.au</p>
              </div>
            </div>

           <div className="space-y-2 text-sm text-black font-medium">
  <div>
    📞{" "}
    <a
      href="tel:+61435287287"
      className="text-blue-600 hover:underline"
    >
      +61 435 287 287
    </a>
  </div>
  <div>
    📧{" "}
    <a
      href="mailto:rgcabsperth@gmail.com"
      className="text-blue-600 hover:underline"
    >
      rgcabsperth@gmail.com
    </a>
  </div>
</div>


            <!-- Commitment Message -->
            <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center;">
              <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0;">
                <strong>Our Commitment:</strong> We're committed to providing excellent service and addressing your concerns promptly and professionally. Your feedback helps us improve our services for all customers.
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
            <p style="margin: 0;">
              RG Cabs Perth - Your trusted transportation partner<br>
              Serving Perth and surrounding areas 24/7<br>
              Complaint submitted on ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Perth" })}
            </p>
          </div>
        </div>
      `,
    }

    // Send both emails
    await Promise.all([
      transporter.sendMail(businessMailOptions),
      transporter.sendMail(customerMailOptions)
    ])

    return NextResponse.json(
      {
        success: true,
        message: "Complaint submitted successfully",
        complaintRef: complaintRef,
      },
      { status: 200 },
    )

  } catch (error) {
    console.error("Complaint submission error:", error)

    if (error instanceof Error) {
      if (error.message.includes("Invalid login")) {
        return NextResponse.json({ error: "Email authentication failed" }, { status: 500 })
      }
      if (error.message.includes("Network")) {
        return NextResponse.json({ error: "Network error - please try again" }, { status: 500 })
      }
      if (error.message.includes("ENOTFOUND") || error.message.includes("ETIMEDOUT")) {
        return NextResponse.json({ error: "Email server temporarily unavailable" }, { status: 500 })
      }
    }

    return NextResponse.json(
      { 
        error: "Failed to submit complaint. Please try again or contact us directly at +61 435 287 287" 
      }, 
      { status: 500 }
    )
  }
}