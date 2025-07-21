import nodemailer from "nodemailer"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const bookingData = await req.json()
    const {
      pickup,
      destination,
      waypoints,
      date,
      time,
      passengers,
      paymentCard,
      firstName,
      lastName,
      email,
      phone,
      specialRequests,
      estimatedFare,
    } = bookingData

    if (!pickup || !destination || !date || !time || !firstName || !lastName || !email || !phone) {
      return NextResponse.json({ error: "Missing required booking fields." }, { status: 400 })
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing email configuration for booking service.")
      return NextResponse.json({ error: "Email service not configured for bookings." }, { status: 500 })
    }

    const transporter = nodemailer.createTransporter({
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

    const waypointsText =
      waypoints && waypoints.length > 0
        ? waypoints.map((wp: any, index: number) => `Stop ${index + 1}: ${wp.location}`).join("<br>")
        : "No stops"

    const businessMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Booking Request - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 25px; text-align: center;">
            <h2 style="color: white; margin: 0; font-size: 24px;">New Booking Request</h2>
            <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Modern Ride Booking</p>
          </div>
          
          <div style="padding: 25px; background-color: #ffffff;">
            <h3 style="color: #333; margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 10px;">Trip Details:</h3>
            <p style="margin-bottom: 10px;"><strong>Pickup:</strong> ${pickup}</p>
            <p style="margin-bottom: 10px;"><strong>Waypoints:</strong><br>${waypointsText}</p>
            <p style="margin-bottom: 10px;"><strong>Destination:</strong> ${destination}</p>
            <p style="margin-bottom: 10px;"><strong>Date:</strong> ${formattedDate}</p>
            <p style="margin-bottom: 10px;"><strong>Time:</strong> ${time}</p>
            <p style="margin-bottom: 10px;"><strong>Passengers:</strong> ${passengers}</p>
            <p style="margin-bottom: 10px;"><strong>Payment Method:</strong> ${paymentCard}</p>
            <p style="margin-bottom: 20px;"><strong>Estimated Fare:</strong> $${estimatedFare}</p>
            
            <h3 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Passenger Details:</h3>
            <p style="margin-bottom: 10px;"><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
            <p style="margin-bottom: 20px;"><strong>Phone:</strong> ${phone}</p>
            
            ${
              specialRequests
                ? `
            <h3 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Special Requests:</h3>
            <p style="line-height: 1.6; color: #555;">${specialRequests.replace(/\n/g, "<br>")}</p>
            `
                : ""
            }
          </div>
          
          <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #eee;">
            <p>This booking request was submitted via the booking website.</p>
            <p>Timestamp: ${new Date().toLocaleString("en-AU")}</p>
          </div>
        </div>
      `,
    }

    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Ride Booking Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 25px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Ride Booking</h1>
            <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Premium Transportation Services</p>
          </div>
          
          <div style="padding: 25px; background-color: #ffffff;">
            <h2 style="color: #333; margin-top: 0;">Hi ${firstName}, your booking is confirmed!</h2>
            
            <p style="color: #555; line-height: 1.6;">
              Thank you for choosing our service. We've received your booking request and will review it shortly.
              You will receive a final confirmation or a call from us if more details are needed.
            </p>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Your Trip Summary:</h3>
              <p style="margin-bottom: 5px;"><strong>From:</strong> ${pickup}</p>
              ${waypoints && waypoints.length > 0 ? `<p style="margin-bottom: 5px;"><strong>Stops:</strong><br>${waypointsText}</p>` : ""}
              <p style="margin-bottom: 5px;"><strong>To:</strong> ${destination}</p>
              <p style="margin-bottom: 5px;"><strong>Date:</strong> ${formattedDate}</p>
              <p style="margin-bottom: 5px;"><strong>Time:</strong> ${time}</p>
              <p style="margin-bottom: 5px;"><strong>Passengers:</strong> ${passengers}</p>
              <p style="margin-bottom: 0;"><strong>Estimated Fare:</strong> $${estimatedFare}</p>
              ${specialRequests ? `<p style="margin-top: 10px;"><strong>Special Requests:</strong> ${specialRequests.substring(0, 100)}${specialRequests.length > 100 ? "..." : ""}</p>` : ""}
            </div>
            
            <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
              <h3 style="color: #333; margin-top: 0;">Need to make changes or have questions?</h3>
              <p style="margin: 10px 0;"><strong>📞 Phone:</strong> +61 400 000 000 - Available 24/7</p>
              <p style="margin: 10px 0;"><strong>📧 Email:</strong> support@ridebooking.com</p>
            </div>
            
            <p style="color: #666; font-size: 14px; text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              Modern Ride Booking - Your trusted transportation partner<br>
              Serving your area 24/7
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
    return NextResponse.json(
      {
        error: "Failed to send booking request. Please try again or contact us directly.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
