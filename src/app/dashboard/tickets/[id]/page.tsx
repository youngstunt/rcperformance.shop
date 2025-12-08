"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import useSWR from "swr"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Loader2,
  Send,
  Download,
  Upload,
  Clock,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Car,
  Wrench,
  FileText,
  RefreshCw,
  BookOpen,
} from "lucide-react"
import { VehicleGuidePanel } from "@/components/guides"
import type { EcuTool } from "@/lib/guides/types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ElementType; color: string }> = {
  PENDING_PAYMENT: { label: "Pending Payment", variant: "destructive", icon: AlertCircle, color: "text-red-500" },
  OPEN: { label: "Open", variant: "default", icon: Clock, color: "text-blue-500" },
  IN_PROGRESS: { label: "In Progress", variant: "default", icon: Clock, color: "text-blue-500" },
  AWAITING_CUSTOMER: { label: "Awaiting Your Response", variant: "secondary", icon: AlertCircle, color: "text-yellow-500" },
  COMPLETED: { label: "Completed", variant: "outline", icon: CheckCircle, color: "text-green-500" },
  CLOSED: { label: "Closed", variant: "outline", icon: CheckCircle, color: "text-gray-500" },
  REOPENED: { label: "Reopened", variant: "default", icon: RefreshCw, color: "text-blue-500" },
}

export default function TicketDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const ticketId = params.id as string
  const paymentStatus = searchParams.get("payment")

  const { data, isLoading, mutate } = useSWR(
    ticketId ? `/api/tickets/${ticketId}` : null,
    fetcher,
    { refreshInterval: 10000 } // Poll every 10 seconds
  )

  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const ticket = data?.ticket
  const status = ticket ? statusConfig[ticket.status] : null

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [ticket?.messages?.length])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isSending) return

    setIsSending(true)
    try {
      const res = await fetch(`/api/tickets/${ticketId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message }),
      })

      if (res.ok) {
        setMessage("")
        mutate()
      }
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setIsSending(false)
    }
  }

  const handlePayment = async () => {
    setIsCheckingOut(true)
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId,
          paymentType: ticket?.status === "COMPLETED" ? "REOPEN" : "NEW_TICKET",
        }),
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Failed to create checkout:", error)
    } finally {
      setIsCheckingOut(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium mb-2">Ticket not found</h2>
        <Link href="/dashboard/tickets">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tickets
          </Button>
        </Link>
      </div>
    )
  }

  const tunedFiles = ticket.files?.filter((f: any) => f.fileType === "TUNED_FILE") || []
  const StatusIcon = status?.icon || Clock

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/tickets"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Tickets
        </Link>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              {ticket.vehicleYear} {ticket.vehicleMake} {ticket.vehicleModel}
            </h1>
            <p className="text-muted-foreground">
              Opened {new Date(ticket.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Badge variant={status?.variant} className="gap-1">
            <StatusIcon className="w-3 h-3" />
            {status?.label}
          </Badge>
        </div>
      </div>

      {/* Payment alerts */}
      {paymentStatus === "success" && (
        <Alert className="border-green-500 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle>Payment Successful!</AlertTitle>
          <AlertDescription>
            Your payment has been processed. Your ticket is now open and our team will begin working on your tune.
          </AlertDescription>
        </Alert>
      )}

      {paymentStatus === "cancelled" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Payment Cancelled</AlertTitle>
          <AlertDescription>
            Your payment was cancelled. Click the button below to complete your payment.
          </AlertDescription>
        </Alert>
      )}

      {/* Pending payment banner */}
      {ticket.status === "PENDING_PAYMENT" && (
        <Card className="border-destructive">
          <CardContent className="py-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-medium text-lg">Payment Required</h3>
                <p className="text-muted-foreground">
                  Complete payment to open your ticket and start the tuning process.
                </p>
              </div>
              <Button onClick={handlePayment} disabled={isCheckingOut}>
                {isCheckingOut ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <CreditCard className="w-4 h-4 mr-2" />
                )}
                Pay $200
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completed tune download */}
      {ticket.status === "COMPLETED" && tunedFiles.length > 0 && (
        <Card className="border-green-500 bg-green-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-500">
              <CheckCircle className="w-5 h-5" />
              Your Tune is Ready!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Download your custom tune file below. Follow the flashing guide for your {ticket.ecuReadTool} to apply the tune.
            </p>
            <div className="space-y-2">
              {tunedFiles.map((file: any) => (
                <a
                  key={file.id}
                  href={`/api/files/${file.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <Download className="w-5 h-5 text-green-500" />
                  <div className="flex-1">
                    <p className="font-medium">{file.originalName}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.fileSize / 1024).toFixed(1)} KB • Uploaded by {file.uploader?.name || "Admin"}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Flashing Guide */}
            <div className="pt-4 border-t space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <BookOpen className="w-4 h-4" />
                How to Flash Your Tune
              </div>
              <VehicleGuidePanel
                year={ticket.vehicleYear}
                make={ticket.vehicleMake}
                model={ticket.vehicleModel}
                tool={ticket.ecuReadTool as EcuTool}
                showGuideType="writing"
              />
            </div>

            <div className="pt-4 border-t">
              <Button variant="outline" onClick={handlePayment} disabled={isCheckingOut}>
                {isCheckingOut ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Reopen Ticket ($200)
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Need revisions? Reopen the ticket to request changes.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Ticket Info */}
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Car className="w-4 h-4" />
                Vehicle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Make/Model:</span>
                <p className="font-medium">{ticket.vehicleMake} {ticket.vehicleModel}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Year:</span>
                <p className="font-medium">{ticket.vehicleYear}</p>
              </div>
              {ticket.vehicleVin && (
                <div>
                  <span className="text-muted-foreground">VIN:</span>
                  <p className="font-medium font-mono text-xs">{ticket.vehicleVin}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Tuning Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">ECU Tool:</span>
                <p className="font-medium">{ticket.ecuReadTool}</p>
              </div>
              {ticket.tuneType && (
                <div>
                  <span className="text-muted-foreground">Tune Type:</span>
                  <p className="font-medium">{ticket.tuneType}</p>
                </div>
              )}
              {ticket.notes && (
                <div>
                  <span className="text-muted-foreground">Notes:</span>
                  <p className="font-medium">{ticket.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tool Guides */}
          {ticket.ecuReadTool && ticket.status !== "PENDING_PAYMENT" && (
            <VehicleGuidePanel
              year={ticket.vehicleYear}
              make={ticket.vehicleMake}
              model={ticket.vehicleModel}
              tool={ticket.ecuReadTool as EcuTool}
              showGuideType={ticket.status === "COMPLETED" ? "writing" : "reading"}
            />
          )}
        </div>

        {/* Conversation */}
        <div className="md:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Conversation
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
                {ticket.messages?.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No messages yet. Start the conversation below.
                  </p>
                ) : (
                  ticket.messages?.map((msg: any) => {
                    const isCurrentUser = msg.senderId === session?.user?.id
                    const isAdmin = msg.sender?.role === "ADMIN"
                    const initials = msg.sender?.name?.[0] || msg.sender?.email?.[0] || "?"

                    if (msg.isSystem) {
                      return (
                        <div key={msg.id} className="flex justify-center">
                          <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                            {msg.content}
                          </span>
                        </div>
                      )
                    }

                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${isCurrentUser ? "flex-row-reverse" : ""}`}
                      >
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarFallback className={isAdmin ? "bg-primary text-primary-foreground" : "bg-muted"}>
                            {initials.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`max-w-[70%] ${isCurrentUser ? "text-right" : ""}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium">
                              {isAdmin ? "RC Performance" : msg.sender?.name || "You"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <div
                            className={`p-3 rounded-lg ${
                              isCurrentUser
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                          </div>

                          {/* Attached files */}
                          {msg.files?.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {msg.files.map((file: any) => (
                                <a
                                  key={file.id}
                                  href={`/api/files/${file.id}`}
                                  className="flex items-center gap-2 text-xs text-primary hover:underline"
                                >
                                  <Download className="w-3 h-3" />
                                  {file.originalName}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message input */}
              {ticket.status !== "PENDING_PAYMENT" && ticket.status !== "CLOSED" && (
                <form onSubmit={handleSendMessage} className="border-t p-4">
                  <div className="flex gap-2">
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="min-h-[80px] resize-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage(e)
                        }
                      }}
                    />
                    <div className="flex flex-col gap-2">
                      <Button type="submit" disabled={!message.trim() || isSending}>
                        {isSending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Press Enter to send, Shift+Enter for new line
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
