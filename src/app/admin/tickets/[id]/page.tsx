"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import useSWR from "swr"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  Loader2,
  Send,
  Download,
  Upload,
  Clock,
  CheckCircle,
  AlertCircle,
  Car,
  Wrench,
  FileText,
  User,
  RefreshCw,
} from "lucide-react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ElementType }> = {
  PENDING_PAYMENT: { label: "Pending Payment", variant: "destructive", icon: AlertCircle },
  OPEN: { label: "Open", variant: "default", icon: Clock },
  IN_PROGRESS: { label: "In Progress", variant: "default", icon: Clock },
  AWAITING_CUSTOMER: { label: "Awaiting Customer", variant: "secondary", icon: AlertCircle },
  COMPLETED: { label: "Completed", variant: "outline", icon: CheckCircle },
  CLOSED: { label: "Closed", variant: "outline", icon: CheckCircle },
  REOPENED: { label: "Reopened", variant: "default", icon: RefreshCw },
}

export default function AdminTicketDetailPage() {
  const params = useParams()
  const { data: session } = useSession()
  const ticketId = params.id as string

  const { data, isLoading, mutate } = useSWR(
    ticketId ? `/api/tickets/${ticketId}` : null,
    fetcher,
    { refreshInterval: 10000 }
  )

  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const ticket = data?.ticket
  const status = ticket ? statusConfig[ticket.status] : null

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

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdatingStatus(true)
    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        mutate()
      }
    } catch (error) {
      console.error("Failed to update status:", error)
    } finally {
      setIsUpdatingStatus(false)
    }
  }

  const handleFileUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", selectedFile)
      formData.append("ticketId", ticketId)
      formData.append("fileType", "TUNED_FILE")

      const res = await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        setSelectedFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
        mutate()

        // Also send a message about the file
        await fetch(`/api/tickets/${ticketId}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `Tuned file uploaded: ${selectedFile.name}`,
          }),
        })
        mutate()
      }
    } catch (error) {
      console.error("Failed to upload file:", error)
    } finally {
      setIsUploading(false)
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
        <Link href="/admin/tickets">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tickets
          </Button>
        </Link>
      </div>
    )
  }

  const ecuDumps = ticket.files?.filter((f: any) => f.fileType === "ECU_DUMP") || []
  const tunedFiles = ticket.files?.filter((f: any) => f.fileType === "TUNED_FILE") || []
  const StatusIcon = status?.icon || Clock

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/tickets"
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
              Ticket opened {new Date(ticket.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Status dropdown */}
          <div className="flex items-center gap-2">
            <Select
              value={ticket.status}
              onValueChange={handleStatusChange}
              disabled={isUpdatingStatus}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OPEN">Open</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="AWAITING_CUSTOMER">Awaiting Customer</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="CLOSED">Closed</SelectItem>
              </SelectContent>
            </Select>
            {isUpdatingStatus && <Loader2 className="w-4 h-4 animate-spin" />}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Customer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="w-4 h-4" />
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="font-medium">{ticket.user?.name || "No name"}</p>
              <p className="text-muted-foreground">{ticket.user?.email}</p>
            </CardContent>
          </Card>

          {/* Vehicle */}
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

          {/* Tuning Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Tuning
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

          {/* ECU Dumps from customer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Download className="w-4 h-4" />
                ECU Dumps ({ecuDumps.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {ecuDumps.length === 0 ? (
                <p className="text-sm text-muted-foreground">No ECU dumps uploaded yet</p>
              ) : (
                <div className="space-y-2">
                  {ecuDumps.map((file: any) => (
                    <a
                      key={file.id}
                      href={`/api/files/${file.id}`}
                      className="flex items-center gap-2 p-2 rounded border hover:bg-accent transition-colors text-sm"
                    >
                      <Download className="w-4 h-4 text-blue-500" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate">{file.originalName}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.fileSize / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upload tune file */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Tuned File
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept=".bin,.rom,.hex,.map"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
              </div>
              <Button
                onClick={handleFileUpload}
                disabled={!selectedFile || isUploading}
                className="w-full"
              >
                {isUploading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4 mr-2" />
                )}
                Upload Tune
              </Button>

              {tunedFiles.length > 0 && (
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Uploaded Tunes:</p>
                  <div className="space-y-2">
                    {tunedFiles.map((file: any) => (
                      <a
                        key={file.id}
                        href={`/api/files/${file.id}`}
                        className="flex items-center gap-2 p-2 rounded border bg-green-500/10 border-green-500/30 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="truncate">{file.originalName}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Conversation */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Conversation
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[500px]">
                {ticket.messages?.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No messages yet.
                  </p>
                ) : (
                  ticket.messages?.map((msg: any) => {
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
                        className={`flex gap-3 ${isAdmin ? "flex-row-reverse" : ""}`}
                      >
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarFallback className={isAdmin ? "bg-primary text-primary-foreground" : "bg-muted"}>
                            {initials.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`max-w-[70%] ${isAdmin ? "text-right" : ""}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium">
                              {isAdmin ? "You" : msg.sender?.name || msg.sender?.email}
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
                              isAdmin
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message input */}
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
                  <Button type="submit" disabled={!message.trim() || isSending}>
                    {isSending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
