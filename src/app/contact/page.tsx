import BookingCap from "@/components/bookingCap/bookingCap"
import ContactBookComplain from "@/components/contactBookComplain/contactBookComplain"
import ContactUs from "@/components/contactUs/contactUs"
import FAQs from "@/components/faqs/faqs"
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-black/10 rounded-full text-black text-sm font-medium mb-4">
              <MessageCircle className="w-4 h-4 mr-2" />
              Get In Touch With Us
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 leading-tight">
              Contact Us
              <span className="block text-2xl md:text-3xl font-semibold">We're Here to Help</span>
            </h1>
            <p className="text-lg text-black/80 mb-6 max-w-3xl mx-auto">
              Have questions about our services? Need a custom quote? Our friendly team is ready to assist you with all
              your transportation needs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <ContactUs />
      </section>

      <section className="py-5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-bold text-black mb-2">Call Us</h3>
              <p className="text-gray-700 text-sm mb-2">Available 24/7</p>
              <a href="tel:+61812345678" className="text-yellow-600 font-semibold hover:text-yellow-700">
                (08) 1234 5678
              </a>
            </div>


            <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-bold text-black mb-2">Email Us</h3>
              <p className="text-gray-700 text-sm mb-2">Quick response</p>
              <a
                href="mailto:info@perthtransfers.com.au"
                className="text-yellow-600 font-semibold hover:text-yellow-700"
              >
                rgcabsperth@gmail.com              </a>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-bold text-black mb-2">Service Area</h3>
              <p className="text-gray-700 text-sm mb-2">Perth & Surrounds</p>
              <span className="text-yellow-600 font-semibold">Rockingham, Baldivis & More</span>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-bold text-black mb-2">Operating Hours</h3>
              <p className="text-gray-700 text-sm mb-2">Always available</p>
              <span className="text-yellow-600 font-semibold">24/7 Service</span>
            </div>
          </div>
        </div>
      </section>
       <section>
        <FAQs />
        <ContactBookComplain />
      </section>
      <section className="py-12 bg-gradient-to-r from-yellow-400 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Need Immediate Assistance?</h2>
          <p className="text-lg text-black/80 mb-6 max-w-2xl mx-auto">
            For urgent bookings or immediate assistance, call us directly. We're available 24/7 to help with your
            transportation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+61812345678"
              className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg rounded-lg font-semibold transition-all inline-flex items-center justify-center"
            >
              Call Now: (08) 1234 5678
            </a>
            <a
              href="mailto:info@perthtransfers.com.au"
              className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg rounded-lg bg-transparent font-semibold transition-all inline-flex items-center justify-center"
            >
              Send Email
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
