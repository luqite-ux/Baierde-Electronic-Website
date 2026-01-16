"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  series: string[]
  mounting: string[]
  frequency: string[]
  impedance: string[]
}

const seriesOptions = ["SMA", "SSMA", "SMP", "SMB", "SMC", "SSMC", "MCX", "MMCX", "BNC", "D4"]
const mountingOptions = ["Straight", "Right Angle", "PCB Mount", "Bulkhead", "Cable Mount"]
const frequencyOptions = ["DC-4GHz", "DC-6GHz", "DC-12GHz", "DC-18GHz", "DC-40GHz"]
const impedanceOptions = ["50Ω", "75Ω"]

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    series: [],
    mounting: [],
    frequency: [],
    impedance: [],
  })

  const handleCheckboxChange = (category: keyof FilterState, value: string, checked: boolean) => {
    const newFilters = {
      ...filters,
      [category]: checked ? [...filters[category], value] : filters[category].filter((item) => item !== value),
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const emptyFilters = {
      series: [],
      mounting: [],
      frequency: [],
      impedance: [],
    }
    setFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  const hasActiveFilters = Object.values(filters).some((arr) => arr.length > 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2">
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Series Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Series</Label>
        <div className="space-y-2">
          {seriesOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`series-${option}`}
                checked={filters.series.includes(option)}
                onCheckedChange={(checked) => handleCheckboxChange("series", option, checked as boolean)}
              />
              <label
                htmlFor={`series-${option}`}
                className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Mounting Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Mounting Type</Label>
        <div className="space-y-2">
          {mountingOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`mounting-${option}`}
                checked={filters.mounting.includes(option)}
                onCheckedChange={(checked) => handleCheckboxChange("mounting", option, checked as boolean)}
              />
              <label
                htmlFor={`mounting-${option}`}
                className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Frequency Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Frequency Range</Label>
        <div className="space-y-2">
          {frequencyOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`frequency-${option}`}
                checked={filters.frequency.includes(option)}
                onCheckedChange={(checked) => handleCheckboxChange("frequency", option, checked as boolean)}
              />
              <label
                htmlFor={`frequency-${option}`}
                className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Impedance Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Impedance</Label>
        <div className="space-y-2">
          {impedanceOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`impedance-${option}`}
                checked={filters.impedance.includes(option)}
                onCheckedChange={(checked) => handleCheckboxChange("impedance", option, checked as boolean)}
              />
              <label
                htmlFor={`impedance-${option}`}
                className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
