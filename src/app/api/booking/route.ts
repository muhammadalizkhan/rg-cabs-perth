import nodemailer from "nodemailer"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const bookingData = await req.json()
    const {
      pickup,
      destination,
      date,
      time,
      vehicleType,
      passengers,
      firstName,
      lastName,
      email,
      phone,
      specialRequests,
    } = bookingData

    if (!pickup || !destination || !date || !time || !vehicleType || !firstName || !lastName || !email || !phone) {
      return NextResponse.json({ error: "Missing required booking fields." }, { status: 400 })
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing email configuration for booking service.")
      return NextResponse.json({ error: "Email service not configured for bookings." }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.verify()

    const formattedDate = new Date(date).toLocaleDateString("en-AU", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    const businessMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Booking Request - ${firstName} ${lastName} (${vehicleType})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #f59e0b, #f97316); padding: 25px; text-align: center;">
            <h2 style="color: white; margin: 0; font-size: 24px;">New Booking Request</h2>
            <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">RgCabs Perth Transfers</p>
          </div>
          
          <div style="padding: 25px; background-color: #ffffff;">
            <h3 style="color: #333; margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 10px;">Trip Details:</h3>
            <p style="margin-bottom: 10px;"><strong>Pickup:</strong> ${pickup}</p>
            <p style="margin-bottom: 10px;"><strong>Destination:</strong> ${destination}</p>
            <p style="margin-bottom: 10px;"><strong>Date:</strong> ${formattedDate}</p>
            <p style="margin-bottom: 10px;"><strong>Time:</strong> ${time}</p>
            <p style="margin-bottom: 10px;"><strong>Vehicle Type:</strong> ${vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)}</p>
            <p style="margin-bottom: 20px;"><strong>Passengers:</strong> ${passengers}</p>

            <h3 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Passenger Details:</h3>
            <p style="margin-bottom: 10px;"><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
            <p style="margin-bottom: 20px;"><strong>Phone:</strong> ${phone}</p>

            ${specialRequests
          ? `
            <h3 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Special Requests:</h3>
            <p style="line-height: 1.6; color: #555;">${specialRequests.replace(/\n/g, "<br>")}</p>
            `
          : ""
        }
          </div>
          
          <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #eee;">
            <p>This booking request was submitted via the Perth Transfers website.</p>
            <p>Timestamp: ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Perth" })}</p>
          </div>
        </div>
      `,
    }

    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your RG Cabs Perth Transfers Booking Request Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #f59e0b, #f97316); padding: 25px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Perth Transfers</h1>
            <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Premium Transportation Services</p>
          </div>
          
          <div style="padding: 25px; background-color: #ffffff;">
            <h2 style="color: #333; margin-top: 0;">Hi ${firstName}, your booking request is confirmed!</h2>
            
            <p style="color: #555; line-height: 1.6;">
              Thank you for choosing RGCab. We've received your booking request and will review it shortly.
              You will receive a final confirmation or a call from us if more details are needed.
            </p>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Your Trip Summary:</h3>
              <p style="margin-bottom: 5px;"><strong>From:</strong> ${pickup}</p>
              <p style="margin-bottom: 5px;"><strong>To:</strong> ${destination}</p>
              <p style="margin-bottom: 5px;"><strong>Date:</strong> ${formattedDate}</p>
              <p style="margin-bottom: 5px;"><strong>Time:</strong> ${time}</p>
              <p style="margin-bottom: 5px;"><strong>Vehicle:</strong> ${vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)}</p>
              <p style="margin-bottom: 0;"><strong>Passengers:</strong> ${passengers}</p>
              ${specialRequests ? `<p style="margin-top: 10px;"><strong>Special Requests:</strong> ${specialRequests.substring(0, 100)}${specialRequests.length > 100 ? "..." : ""}</p>` : ""}
            </div>
            
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h3 style="color: #333; margin-top: 0;">Need to make changes or have questions?</h3>
              <p style="margin: 10px 0;"><strong>📞 Phone:</strong> +61435287287 - Available 24/7</p>
              <p style="margin: 10px 0;"><strong>📧 Email:</strong> rgcabsperth@gmail.com</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="tel:+61812345678" style="background-color: #f59e0b; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Call Us Now
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
        message: "Booking request sent successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Booking email sending error:", error)

    if (error instanceof Error) {
      if (error.message.includes("Invalid login")) {
        return NextResponse.json(
          { error: "Email authentication failed. Please check your app password." },
          { status: 500 },
        )
      }
      if (error.message.includes("Network")) {
        return NextResponse.json({ error: "Network error - please try again" }, { status: 500 })
      }
    }

    return NextResponse.json(
      {
        error: "Failed to send booking request. Please try again or call us directly.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}