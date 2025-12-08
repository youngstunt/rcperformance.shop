"use client"

import Link from "next/link"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, FileText, Clock, CheckCircle, AlertCircle, Loader2, Download } from "lucide-react"

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

export default function TicketsPage() {
  const { data, isLoading } = useSWR("/api/tickets", fetcher)

  const tickets = data?.tickets || []
  const activeTickets = tickets.filter((t: any) =>
    !["COMPLETED", "CLOSED"].includes(t.status)
  )
  const completedTickets = tickets.filter((t: any) =>
    ["COMPLETED", "CLOSED"].includes(t.status)
  )

  const TicketList = ({ items }: { items: any[] }) => {
    if (items.length === 0) {
      return (
        <Card>
          <CardContent className="py-8 text-center">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No tickets in this category</p>
          </CardContent>
        </Card>
      )
    }

    return (
      <div className="space-y-3">
        {items.map((ticket: any) => {
          const status = statusConfig[ticket.status] || statusConfig.OPEN
          const StatusIcon = status.icon
          const hasTunedFile = ticket.files?.some((f: any) => f.fileType === "TUNED_FILE")

          return (
            <Link key={ticket.id} href={`/dashboard/tickets/${ticket.id}`}>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium truncate">
                          {ticket.vehicleYear} {ticket.vehicleMake} {ticket.vehicleModel}
                        </p>
                        {hasTunedFile && (
                          <Download className="w-4 h-4 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{ticket.ecuReadTool}</span>
                        <span>•</span>
                        <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                        {ticket.tuneType && (
                          <>
                            <span>•</span>
                            <span>{ticket.tuneType}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <Badge variant={status.variant} className="gap-1 flex-shrink-0">
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            My Tickets
          </h1>
          <p className="text-muted-foreground mt-1">
            View and manage your tuning requests
          </p>
        </div>
        <Link href="/dashboard/tickets/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Ticket
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : tickets.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No tickets yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Open your first ticket to submit your ECU file for custom tuning.
              Our experts will optimize your vehicle's performance.
            </p>
            <Link href="/dashboard/tickets/new">
              <Button size="lg">
                <Plus className="w-4 h-4 mr-2" />
                Open Your First Ticket
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active" className="gap-2">
              <Clock className="w-4 h-4" />
              Active ({activeTickets.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <CheckCircle className="w-4 h-4" />
              Completed ({completedTickets.length})
            </TabsTrigger>
            <TabsTrigger value="all">
              All ({tickets.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <TicketList items={activeTickets} />
          </TabsContent>

          <TabsContent value="completed">
            <TicketList items={completedTickets} />
          </TabsContent>

          <TabsContent value="all">
            <TicketList items={tickets} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
