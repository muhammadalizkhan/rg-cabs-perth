import BookingCap from '@/components/bookingCap/bookingCap'
import ContactUs from '@/components/contactUs/contactUs'
import FAQs from '@/components/faqs/faqs'
import Services from '@/components/services/services'
import React from 'react'

export default function page() {
  return (
    <div>
      <BookingCap/>
      <ContactUs/>
      <Services/>
      <FAQs/>
    </div>
  )
}
