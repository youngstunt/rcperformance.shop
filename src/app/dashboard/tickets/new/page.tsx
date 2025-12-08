"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, ArrowLeft, CreditCard, Car, Wrench, FileText } from "lucide-react"
import Link from "next/link"

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 30 }, (_, i) => currentYear - i)

const popularMakes = [
  "Subaru",
  "BMW",
  "Audi",
  "Volkswagen",
  "Ford",
  "Chevrolet",
  "Dodge",
  "Mitsubishi",
  "Nissan",
  "Toyota",
  "Honda",
  "Mazda",
  "Mercedes-Benz",
  "Porsche",
  "Other",
]

const ecuTools = [
  "Tactrix Openport 2.0",
  "HP Tuners",
  "PCMFlash",
  "COBB Accessport",
  "EcuFlash",
  "RomRaider",
  "MPVI2",
  "K-TAG",
  "Other",
]

const tuneTypes = [
  "Stage 1 - Stock Hardware",
  "Stage 2 - Basic Bolt-ons",
  "Stage 3 - Full Bolt-on",
  "E85 Tune",
  "Flex Fuel",
  "Custom",
]

export default function NewTicketPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleVin: "",
    ecuReadTool: "",
    tuneType: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Create ticket
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to create ticket")
      }

      // Redirect to checkout
      const checkoutRes = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId: data.ticket.id,
          paymentType: "NEW_TICKET",
        }),
      })

      const checkoutData = await checkoutRes.json()

      if (!checkoutRes.ok) {
        // If Stripe not configured, go to ticket page anyway
        if (checkoutRes.status === 503) {
          router.push(`/dashboard/tickets/${data.ticket.id}`)
          return
        }
        throw new Error(checkoutData.error || "Failed to create checkout")
      }

      // Redirect to Stripe checkout
      window.location.href = checkoutData.url
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setIsLoading(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid =
    formData.vehicleYear &&
    formData.vehicleMake &&
    formData.vehicleModel &&
    formData.ecuReadTool

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/tickets"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Tickets
        </Link>
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
          Open New Ticket
        </h1>
        <p className="text-muted-foreground mt-1">
          Submit your ECU file for custom tuning
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Vehicle Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="w-5 h-5" />
              Vehicle Information
            </CardTitle>
            <CardDescription>
              Tell us about your vehicle
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Select
                  value={formData.vehicleYear}
                  onValueChange={(v) => updateField("vehicleYear", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="make">Make *</Label>
                <Select
                  value={formData.vehicleMake}
                  onValueChange={(v) => updateField("vehicleMake", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    {popularMakes.map((make) => (
                      <SelectItem key={make} value={make}>
                        {make}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                placeholder="e.g., WRX STI, M3, GTI"
                value={formData.vehicleModel}
                onChange={(e) => updateField("vehicleModel", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vin">VIN (Optional)</Label>
              <Input
                id="vin"
                placeholder="17-character VIN"
                value={formData.vehicleVin}
                onChange={(e) => updateField("vehicleVin", e.target.value)}
                maxLength={17}
              />
              <p className="text-xs text-muted-foreground">
                Providing your VIN helps us identify your exact ECU configuration
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tuning Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Tuning Details
            </CardTitle>
            <CardDescription>
              Tell us how you read your ECU and what type of tune you need
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tool">ECU Reading Tool *</Label>
              <Select
                value={formData.ecuReadTool}
                onValueChange={(v) => updateField("ecuReadTool", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select the tool you used" />
                </SelectTrigger>
                <SelectContent>
                  {ecuTools.map((tool) => (
                    <SelectItem key={tool} value={tool}>
                      {tool}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tuneType">Tune Type (Optional)</Label>
              <Select
                value={formData.tuneType}
                onValueChange={(v) => updateField("tuneType", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select tune type" />
                </SelectTrigger>
                <SelectContent>
                  {tuneTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any modifications, goals, or special requests..."
                value={formData.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* File Upload Notice */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              ECU File
            </CardTitle>
            <CardDescription>
              You'll upload your ECU file after payment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              After completing payment, you'll be able to upload your ECU dump file
              directly in the ticket conversation. We accept .bin, .rom, and other
              common ECU file formats.
            </p>
          </CardContent>
        </Card>

        {/* Pricing & Submit */}
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg">ECU Tuning Service</span>
              <span className="text-2xl font-bold text-primary">$200.00</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Includes custom tune development, email support, and one revision.
              Additional revisions may require reopening the ticket.
            </p>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating ticket...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Payment
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
