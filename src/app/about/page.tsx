import React from 'react'
import AboutUs from '@/components/aboutus/aboutus'
import BookingCap from '@/components/bookingCap/bookingCap'
import ContactUs from '@/components/contactUs/contactUs'
import FAQs from '@/components/faqs/faqs'
import Services from '@/components/services/services'

export default function page() {
  return (
    <div>
      <AboutUs />
      <Services />
      <BookingCap />
      <ContactUs />
      <FAQs />
    </div>
  )
}
