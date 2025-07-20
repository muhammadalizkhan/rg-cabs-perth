import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar/navbar"
import Hero from "@/components/hero/hero"
import Services from "@/components/services/services"
import BookACap from "@/components/bookingCap/bookingCap"
import AboutUS from "@/components/aboutus/aboutus"
import ContactUS from "@/components/contactUs/contactUs"
import SecurePayment from "@/components/securePayment/securePayment"
import FAQs from "@/components/faqs/faqs"


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Hero />
      <Services />
      <BookACap />
      <AboutUS />
      <ContactUS />
      <SecurePayment />
      <FAQs />
    </div>
  )
}
