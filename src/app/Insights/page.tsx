import AboutUs from '@/components/aboutus/aboutus'
import FAQs from '@/components/faqs/faqs'
import SecurePayment from '@/components/securePayment/securePayment'
import { Contact } from 'lucide-react'
import React from 'react'

export default function page() {
  return (
    <div>
      <FAQs />
      <AboutUs />
      <SecurePayment />
      <Contact />
    </div>
  )
}
