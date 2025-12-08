"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import useSWR from "swr"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CreditCard,
  Receipt,
  ExternalLink,
  Loader2,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const paymentStatusConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  COMPLETED: { label: "Paid", icon: CheckCircle, color: "text-green-500" },
  PENDING: { label: "Pending", icon: Clock, color: "text-yellow-500" },
  FAILED: { label: "Failed", icon: XCircle, color: "text-red-500" },
  REFUNDED: { label: "Refunded", icon: Receipt, color: "text-blue-500" },
}

export default function BillingPage() {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  // Fetch user's tickets to show payment history
  const { data: ticketsData } = useSWR("/api/tickets", fetcher)
  const tickets = ticketsData?.tickets || []

  // Get all payments from tickets
  const payments = tickets
    .flatMap((ticket: any) =>
      (ticket.payments || []).map((payment: any) => ({
        ...payment,
        ticket,
      }))
    )
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const handleManageBilling = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/stripe/billing-portal", {
        method: "POST",
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Failed to open billing portal:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
          Billing
        </h1>
        <p className="text-muted-foreground mt-1">
          View your payment history and manage billing
        </p>
      </div>

      {/* Billing Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Method
            </CardTitle>
            <CardDescription>
              Manage your payment methods through Stripe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              We use Stripe for secure payment processing. You can manage your saved payment methods and view invoices through the Stripe billing portal.
            </p>
            <Button onClick={handleManageBilling} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <ExternalLink className="w-4 h-4 mr-2" />
              )}
              Manage Billing
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              Pricing
            </CardTitle>
            <CardDescription>
              Our tuning service pricing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">ECU Tuning Service</span>
              <span className="font-bold text-lg">$200.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Ticket Reopen</span>
              <span className="font-bold text-lg">$200.00</span>
            </div>
            <p className="text-xs text-muted-foreground pt-2 border-t">
              Each tune includes custom calibration, email support, and one revision.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>
            Your recent payments for tuning services
          </CardDescription>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Receipt className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No payments yet</p>
              <p className="text-sm">Your payment history will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {payments.map((payment: any) => {
                const status = paymentStatusConfig[payment.status] || paymentStatusConfig.PENDING
                const StatusIcon = status.icon

                return (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full bg-muted ${status.color}`}>
                        <StatusIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {payment.paymentType === "REOPEN" ? "Ticket Reopen" : "New Ticket"} - {payment.ticket.vehicleYear} {payment.ticket.vehicleMake} {payment.ticket.vehicleModel}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(payment.createdAt).toLocaleDateString()} at{" "}
                          {new Date(payment.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${(payment.amount / 100).toFixed(2)}</p>
                      <Badge variant="outline" className={status.color}>
                        {status.label}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
