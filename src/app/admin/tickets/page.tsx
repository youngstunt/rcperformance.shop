"use client"

import { useState } from "react"
import Link from "next/link"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Loader2,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Download,
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

export default function AdminTicketsPage() {
  const { data, isLoading } = useSWR("/api/admin/tickets", fetcher, {
    refreshInterval: 30000,
  })

  const tickets = data?.tickets || []
  const statusCounts = data?.statusCounts || {}

  const pendingTickets = tickets.filter((t: any) =>
    ["OPEN", "REOPENED", "IN_PROGRESS", "AWAITING_CUSTOMER"].includes(t.status)
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
          const ecuDumpCount = ticket.files?.filter((f: any) => f.fileType === "ECU_DUMP").length || 0
          const tunedFileCount = ticket.files?.filter((f: any) => f.fileType === "TUNED_FILE").length || 0

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
                        <span>{ticket.user?.name || ticket.user?.email}</span>
                        <span>•</span>
                        <span>{ticket.ecuReadTool}</span>
                        {ticket.tuneType && (
                          <>
                            <span>•</span>
                            <span>{ticket.tuneType}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs">
                        {ecuDumpCount > 0 && (
                          <span className="flex items-center gap-1 text-blue-500">
                            <Download className="w-3 h-3" />
                            {ecuDumpCount} ECU dump{ecuDumpCount > 1 ? "s" : ""}
                          </span>
                        )}
                        {tunedFileCount > 0 && (
                          <span className="flex items-center gap-1 text-green-500">
                            <CheckCircle className="w-3 h-3" />
                            {tunedFileCount} tune{tunedFileCount > 1 ? "s" : ""} uploaded
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Updated {new Date(ticket.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
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
      <div>
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
          All Tickets
        </h1>
        <p className="text-muted-foreground mt-1">
          View and manage all customer tuning tickets
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="w-4 h-4" />
              Active ({pendingTickets.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <CheckCircle className="w-4 h-4" />
              Completed ({completedTickets.length})
            </TabsTrigger>
            <TabsTrigger value="all">
              All ({tickets.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <TicketList items={pendingTickets} />
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
