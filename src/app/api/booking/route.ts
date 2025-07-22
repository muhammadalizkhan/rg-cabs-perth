import nodemailer from "nodemailer"
import { type NextRequest, NextResponse } from "next/server"
import type { BookingData } from "@/types/location"

export async function POST(req: NextRequest) {
  try {
    const bookingData: BookingData = await req.json()
    const {
      outboundTrip,
      returnTrip,
      hasReturnTrip,
      date,
      time,
      returnDate,
      returnTime,
      passengers,
      firstName,
      lastName,
      email,
      phone,
      specialRequests,
      routeInfo,
    } = bookingData

    // Validation
    if (!outboundTrip?.pickup || !outboundTrip?.destination) {
      return NextResponse.json({ error: "Missing pickup or destination for outbound trip." }, { status: 400 })
    }

    if (hasReturnTrip && returnTrip && (!returnTrip.pickup || !returnTrip.destination)) {
      return NextResponse.json({ error: "Missing pickup or destination for return trip." }, { status: 400 })
    }

    if (!date || !time || !passengers || !firstName || !lastName || !email || !phone) {
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

    const formattedReturnDate =
      hasReturnTrip && returnDate
        ? new Date(returnDate).toLocaleDateString("en-AU", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : null

    // Generate stops HTML for outbound trip
    const outboundStopsHtml =
      outboundTrip.stops.length > 0
        ? `
        <h4 style="color: #333; margin: 15px 0 10px 0;">Outbound Stops:</h4>
        ${outboundTrip.stops
          .map(
            (stop, index) => `<p style="margin-bottom: 5px;"><strong>Stop ${index + 1}:</strong> ${stop.address}</p>`,
          )
          .join("")}
      `
        : ""

    // Generate stops HTML for return trip
    const returnStopsHtml =
      hasReturnTrip && returnTrip && returnTrip.stops.length > 0
        ? `
        <h4 style="color: #333; margin: 15px 0 10px 0;">Return Stops:</h4>
        ${returnTrip.stops
          .map(
            (stop, index) => `<p style="margin-bottom: 5px;"><strong>Stop ${index + 1}:</strong> ${stop.address}</p>`,
          )
          .join("")}
      `
        : ""

    // Generate return trip HTML
    const returnTripHtml =
      hasReturnTrip && returnTrip
        ? `
        <div style="margin-top: 25px; padding-top: 20px; border-top: 2px solid #eee;">
          <h3 style="color: #333; margin-top: 0; margin-bottom: 15px;">Return Trip Details:</h3>
          <p style="margin-bottom: 10px;"><strong>Return Pickup:</strong> ${returnTrip.pickup}</p>
          <p style="margin-bottom: 10px;"><strong>Return Destination:</strong> ${returnTrip.destination}</p>
          <p style="margin-bottom: 10px;"><strong>Return Date:</strong> ${formattedReturnDate}</p>
          <p style="margin-bottom: 10px;"><strong>Return Time:</strong> ${returnTime}</p>
          ${returnStopsHtml}
        </div>
      `
        : ""

    const businessMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New ${hasReturnTrip ? "Round Trip" : "One Way"} Booking - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #000000, #333333); padding: 25px; text-align: center;">
            <h2 style="color: white; margin: 0; font-size: 24px;">New Booking Request</h2>
            <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">RG Cabs Perth Transfers</p>
          </div>
          
          <div style="padding: 25px; background-color: #ffffff;">
            <h3 style="color: #333; margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 10px;">Outbound Trip Details:</h3>
            <p style="margin-bottom: 10px;"><strong>Pickup:</strong> ${outboundTrip.pickup}</p>
            <p style="margin-bottom: 10px;"><strong>Destination:</strong> ${outboundTrip.destination}</p>
            <p style="margin-bottom: 10px;"><strong>Date:</strong> ${formattedDate}</p>
            <p style="margin-bottom: 10px;"><strong>Time:</strong> ${time}</p>
            <p style="margin-bottom: 10px;"><strong>Passengers:</strong> ${passengers}</p>
            ${outboundStopsHtml}
            
            ${returnTripHtml}
            
            <h3 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 25px;">Passenger Details:</h3>
            <p style="margin-bottom: 10px;"><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
            <p style="margin-bottom: 20px;"><strong>Phone:</strong> ${phone}</p>
            
            ${
              routeInfo
                ? `
              <h3 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Route Information:</h3>
              <p style="margin-bottom: 10px;"><strong>Distance:</strong> ${routeInfo.distance}</p>
              <p style="margin-bottom: 10px;"><strong>Duration:</strong> ${routeInfo.duration}</p>
              <p style="margin-bottom: 20px;"><strong>Estimated Fare:</strong> ${routeInfo.fare}</p>
            `
                : ""
            }
            
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
            <p>This booking request was submitted via the Perth Transfers website.</p>
            <p>Timestamp: ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Perth" })}</p>
          </div>
        </div>
      `,
    }

    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your RG Cabs Perth Transfer Booking Confirmation ${hasReturnTrip ? "(Round Trip)" : "(One Way)"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #000000, #333333); padding: 25px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Perth Transfers</h1>
            <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Premium Transportation Services</p>
          </div>
          
          <div style="padding: 25px; background-color: #ffffff;">
            <h2 style="color: #333; margin-top: 0;">Hi ${firstName}, your booking request is confirmed!</h2>
            
            <p style="color: #555; line-height: 1.6;">
              Thank you for choosing RG Cabs. We've received your ${hasReturnTrip ? "round trip" : "one way"} booking request and will review it shortly.
              You will receive a final confirmation or a call from us if more details are needed.
            </p>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Your Trip Summary:</h3>
              <div style="margin-bottom: 15px;">
                <h4 style="color: #333; margin: 0 0 10px 0;">Outbound Journey:</h4>
                <p style="margin-bottom: 5px;"><strong>From:</strong> ${outboundTrip.pickup}</p>
                <p style="margin-bottom: 5px;"><strong>To:</strong> ${outboundTrip.destination}</p>
                <p style="margin-bottom: 5px;"><strong>Date:</strong> ${formattedDate}</p>
                <p style="margin-bottom: 5px;"><strong>Time:</strong> ${time}</p>
                <p style="margin-bottom: 5px;"><strong>Passengers:</strong> ${passengers}</p>
                ${
                  outboundTrip.stops.length > 0
                    ? `
                  <p style="margin-bottom: 5px;"><strong>Stops:</strong> ${outboundTrip.stops.length}</p>
                `
                    : ""
                }
              </div>
              
              ${
                hasReturnTrip && returnTrip
                  ? `
                <div style="border-top: 1px solid #ddd; padding-top: 15px;">
                  <h4 style="color: #333; margin: 0 0 10px 0;">Return Journey:</h4>
                  <p style="margin-bottom: 5px;"><strong>From:</strong> ${returnTrip.pickup}</p>
                  <p style="margin-bottom: 5px;"><strong>To:</strong> ${returnTrip.destination}</p>
                  <p style="margin-bottom: 5px;"><strong>Date:</strong> ${formattedReturnDate}</p>
                  <p style="margin-bottom: 5px;"><strong>Time:</strong> ${returnTime}</p>
                  ${
                    returnTrip.stops.length > 0
                      ? `
                    <p style="margin-bottom: 5px;"><strong>Stops:</strong> ${returnTrip.stops.length}</p>
                  `
                      : ""
                  }
                </div>
              `
                  : ""
              }
              
              ${
                specialRequests
                  ? `
                <p style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd;"><strong>Special Requests:</strong> ${specialRequests.substring(0, 100)}${specialRequests.length > 100 ? "..." : ""}</p>
              `
                  : ""
              }
            </div>
            
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h3 style="color: #333; margin-top: 0;">Need to make changes or have questions?</h3>
              <p style="margin: 10px 0;"><strong>📞 Phone:</strong> +61435287287 - Available 24/7</p>
              <p style="margin: 10px 0;"><strong>📧 Email:</strong> rgcabsperth@gmail.com</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="tel:+61435287287" style="background-color: #000000; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
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
        bookingId: `BK${Date.now()}`, // Simple booking ID generation
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
