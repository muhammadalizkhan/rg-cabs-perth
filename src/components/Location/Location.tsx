'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LocationServices } from '@/utils/location-services'

export default function LocationStep() {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [stops, setStops] = useState<string[]>([''])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleAddStop = () => {
    if (stops.length < 5) {
      setStops([...stops, ''])
    }
  }

  const handleStopChange = (index: number, value: string) => {
    const updated = [...stops]
    updated[index] = value
    setStops(updated)
  }

  const handleBookNow = async () => {
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pickup,
          destination,
          stops: stops.filter(s => s.trim() !== '')
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Booking info sent!')
      } else {
        setMessage(data.error || 'Something went wrong')
      }
    } catch (err) {
      console.error(err)
      setMessage('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold">Step 1: Enter Your Locations</h2>

    <Input
  className="text-black bg-white"
  placeholder="Pickup Location"
  value={pickup}
  onChange={(e) => setPickup(e.target.value)}
/>


      <Input
        placeholder="Destination Location"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <div className="space-y-2">
        {stops.map((stop, idx) => (
          <Input
            key={idx}
            placeholder={`Stop ${idx + 1}`}
            value={stop}
            onChange={(e) => handleStopChange(idx, e.target.value)}
          />
        ))}
        {stops.length < 5 && (
          <Button variant="secondary" onClick={handleAddStop}>
            + Add Stop
          </Button>
        )}
      </div>

      <Button onClick={handleBookNow} disabled={loading}>
        {loading ? 'Sending...' : 'Book Now'}
      </Button>

      {message && <p className="text-sm text-center mt-2">{message}</p>}
    </div>
  )
}
