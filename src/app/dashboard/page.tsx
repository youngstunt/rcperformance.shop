"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ElementType }> = {
  PENDING_PAYMENT: { label: "Pending Payment", variant: "destructive", icon: AlertCircle },
  OPEN: { label: "Open", variant: "default", icon: Clock },
  IN_PROGRESS: { label: "In Progress", variant: "default", icon: Clock },
  AWAITING_CUSTOMER: { label: "Awaiting Response", variant: "secondary", icon: AlertCircle },
  COMPLETED: { label: "Completed", variant: "outline", icon: CheckCircle },
  CLOSED: { label: "Closed", variant: "outline", icon: CheckCircle },
  REOPENED: { label: "Reopened", variant: "default", icon: Clock },
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const { data, isLoading } = useSWR("/api/tickets", fetcher)

  const tickets = data?.tickets || []
  const activeTickets = tickets.filter((t: any) =>
    !["COMPLETED", "CLOSED"].includes(t.status)
  )
  const completedTickets = tickets.filter((t: any) =>
    ["COMPLETED", "CLOSED"].includes(t.status)
  )

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
          Welcome back{session?.user?.name ? `, ${session.user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your ECU tuning tickets and download your tunes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Tickets</CardDescription>
            <CardTitle className="text-3xl">{activeTickets.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Completed Tunes</CardDescription>
            <CardTitle className="text-3xl">{completedTickets.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Tickets</CardDescription>
            <CardTitle className="text-3xl">{tickets.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Link href="/dashboard/tickets/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Open New Ticket
          </Button>
        </Link>
        <Link href="/dashboard/tickets">
          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            View All Tickets
          </Button>
        </Link>
      </div>

      {/* Recent Tickets */}
      <div>
        <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Recent Tickets
        </h2>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : tickets.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No tickets yet</h3>
              <p className="text-muted-foreground mb-4">
                Open your first ticket to get started with ECU tuning
              </p>
              <Link href="/dashboard/tickets/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Open New Ticket
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {tickets.slice(0, 5).map((ticket: any) => {
              const status = statusConfig[ticket.status] || statusConfig.OPEN
              const StatusIcon = status.icon
              return (
                <Link key={ticket.id} href={`/dashboard/tickets/${ticket.id}`}>
                  <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">
                              {ticket.vehicleYear} {ticket.vehicleMake} {ticket.vehicleModel}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {ticket.ecuReadTool} • {new Date(ticket.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant={status.variant} className="gap-1">
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}

            {tickets.length > 5 && (
              <div className="text-center pt-2">
                <Link href="/dashboard/tickets">
                  <Button variant="ghost" size="sm">
                    View all {tickets.length} tickets
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
