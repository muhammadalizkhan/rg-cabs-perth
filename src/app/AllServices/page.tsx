import BookingCap from '@/components/bookingCap/bookingCap'
import FAQs from '@/components/faqs/faqs'
import SecurePayment from '@/components/securePayment/securePayment'
import Services from '@/components/services/services'
import React from 'react'

export default function page() {
  return (
    <div>
      <Services />
      <BookingCap />
      <SecurePayment />
      <FAQs />
    </div>
  )
}
