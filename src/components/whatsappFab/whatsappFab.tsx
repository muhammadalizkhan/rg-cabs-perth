"use client"

import { useState, useEffect } from "react"
import { Plus, Phone, MessageCircle, ClipboardEdit, BookOpen, X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function WhatsAppFab() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  const phoneNumber = "61435287287" 

  useEffect(() => {
    setMounted(true)
  }, [])

  const actions = [
    {
      label: "Book Now",
      icon: <BookOpen className="w-5 h-5" />,
      onClick: () => {
        router.push("/BookNow")
        setOpen(false)
      },
      color: "bg-blue-500 hover:bg-blue-600",
      textColor: "text-white",
    },
    {
      label: "Complain",
      icon: <ClipboardEdit className="w-5 h-5" />,
      onClick: () => {
        router.push("/Complain")
        setOpen(false)
      },
      color: "bg-red-500 hover:bg-red-600",
      textColor: "text-white",
    },
    {
      label: "Contact",
      icon: <Phone className="w-5 h-5" />,
      onClick: () => {
        router.push("/Contact")
        setOpen(false)
      },
      color: "bg-purple-500 hover:bg-purple-600",
      textColor: "text-white",
    },
    {
      label: "WhatsApp",
      icon: <MessageCircle className="w-5 h-5" />,
      onClick: () => {
        window.open(`https://wa.me/${phoneNumber}`, "_blank", "noopener,noreferrer")
        setOpen(false)
      },
      color: "bg-green-500 hover:bg-green-600",
      textColor: "text-white",
    },
  ]

  if (!mounted) return null

  return (
    <>
      

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
        <div className="flex flex-col items-end space-y-3">
          {actions.map((action, index) => (
            <div
              key={index}
              className={`transform transition-all duration-300 ease-out ${
                open ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95 pointer-events-none"
              }`}
              style={{
                transitionDelay: open ? `${index * 50}ms` : `${(actions.length - index - 1) * 50}ms`,
              }}
            >
              <button
                onClick={action.onClick}
                className={`group flex items-center gap-3 px-4 py-3 ${action.color} ${action.textColor} rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95`}
              >
                <div className="flex items-center justify-center w-6 h-6">{action.icon}</div>
                <span className="text-sm font-medium whitespace-nowrap pr-1 hidden sm:inline">{action.label}</span>
                <div className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none sm:hidden whitespace-nowrap">
                  {action.label}
                  <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={`relative flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
            open ? "rotate-45" : "rotate-0"
          }`}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-200"></div>

          <div className="relative z-10">
            {open ? (
              <X className="w-7 h-7 transition-all duration-200" />
            ) : (
              <Plus className="w-7 h-7 transition-all duration-200" />
            )}
          </div>

          {!open && <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>}
        </button>

        {!open && (
          <div className="absolute -top-12 right-0 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            Quick Actions
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 -mt-1"></div>
          </div>
        )}
      </div>
    </>
  )
}
