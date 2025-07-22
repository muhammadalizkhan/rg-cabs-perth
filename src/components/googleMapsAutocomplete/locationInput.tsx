"use client"

import * as React from "react"
import { Check, ChevronsUpDown, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface LocationComboboxProps {
  value: string
  onValueChange: (value: string) => void
  placeholder: string
  locations: string[]
  disabled?: boolean
  icon?: React.ReactNode
}

export function LocationCombobox({
  value,
  onValueChange,
  placeholder,
  locations,
  disabled = false,
  icon,
}: LocationComboboxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between h-14 px-4 text-left font-medium",
            "bg-white border-2 border-gray-400 text-gray-900 shadow-sm",
            "hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200",
            "transition-all duration-200",
            !value && "text-gray-500",
          )}
          disabled={disabled}
        >
          <div className="flex items-center gap-3">
            {icon}
            <span className="truncate text-base font-medium">
              {value ? (
                <span className="text-gray-900">{value}</span>
              ) : (
                <span className="text-gray-500">{placeholder}</span>
              )}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-gray-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 shadow-xl border-2 border-gray-300 bg-white" align="start">
        <Command className="bg-white">
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            className="h-12 text-gray-900 placeholder:text-gray-500 border-0 focus:ring-0 bg-white"
          />
          <CommandList className="bg-white max-h-60">
            <CommandEmpty className="text-gray-700 py-6 text-center text-sm font-medium">
              No location found.
            </CommandEmpty>
            <CommandGroup>
              {locations.map((location) => (
                <CommandItem
                  key={location}
                  value={location}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : location)
                    setOpen(false)
                  }}
                  className="py-3 px-4 cursor-pointer text-gray-900 hover:bg-gray-100 data-[selected]:bg-gray-100 font-medium"
                >
                  <MapPin className="mr-3 h-4 w-4 text-gray-600" />
                  <span className="text-base text-gray-900 font-medium">{location}</span>
                  <Check
                    className={cn("ml-auto h-4 w-4 text-teal-500", value === location ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
