"use client"

import Link from "next/link"
import useSWR from "swr"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Loader2,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Users,
  DollarSign,
} from "lucide-react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ElementType }> = {
  PENDING_PAYMENT: { label: "Pending Payment", variant: "destructive", icon: AlertCircle },
  OPEN: { label: "Open", variant: "default", icon: Clock },
  IN_PROGRESS: { label: "In Progress", variant: "default", icon: Clock },
  AWAITING_CUSTOMER: { label: "Awaiting Customer", variant: "secondary", icon: AlertCircle },
  COMPLETED: { label: "Completed", variant: "outline", icon: CheckCircle },
  CLOSED: { label: "Closed", variant: "outline", icon: CheckCircle },
  REOPENED: { label: "Reopened", variant: "default", icon: Clock },
}

export default function AdminDashboardPage() {
  const { data, isLoading } = useSWR("/api/admin/tickets", fetcher, {
    refreshInterval: 30000,
  })

  const tickets = data?.tickets || []
  const statusCounts = data?.statusCounts || {}

  const pendingTickets = tickets.filter((t: any) =>
    ["OPEN", "REOPENED", "IN_PROGRESS"].includes(t.status)
  )

  const totalRevenue = tickets.reduce((sum: number, t: any) => {
    const paidAmount = t.payments?.reduce((pSum: number, p: any) => pSum + p.amount, 0) || 0
    return sum + paidAmount
  }, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage tuning tickets and customer requests
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Pending Tickets
            </CardDescription>
            <CardTitle className="text-3xl">{pendingTickets.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Total Tickets
            </CardDescription>
            <CardTitle className="text-3xl">{tickets.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Completed
            </CardDescription>
            <CardTitle className="text-3xl">{statusCounts.COMPLETED || 0}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Revenue
            </CardDescription>
            <CardTitle className="text-3xl">${(totalRevenue / 100).toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Pending Tickets */}
      <div>
        <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Tickets Needing Attention
        </h2>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : pendingTickets.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
              <h3 className="text-lg font-medium mb-2">All caught up!</h3>
              <p className="text-muted-foreground">
                No tickets need attention right now.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {pendingTickets.map((ticket: any) => {
              const status = statusConfig[ticket.status] || statusConfig.OPEN
              const StatusIcon = status.icon
              const lastMessage = ticket.messages?.[0]
              const fileCount = ticket.files?.length || 0

              return (
                <Link key={ticket.id} href={`/admin/tickets/${ticket.id}`}>
                  <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">
                              {ticket.vehicleYear} {ticket.vehicleMake} {ticket.vehicleModel}
                            </p>
                            <Badge variant={status.variant} className="gap-1">
                              <StatusIcon className="w-3 h-3" />
                              {status.label}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{ticket.user?.email}</span>
                            <span>•</span>
                            <span>{ticket.ecuReadTool}</span>
                            <span>•</span>
                            <span>{fileCount} files</span>
                          </div>
                          {lastMessage && !lastMessage.isSystem && (
                            <p className="text-sm text-muted-foreground mt-1 truncate">
                              Last: {lastMessage.content}
                            </p>
                          )}
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          {new Date(ticket.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
