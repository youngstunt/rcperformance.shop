import { Suspense } from "react"
import { OTPInput } from "@/components/auth/OTPInput"
import Link from "next/link"

function VerifyContent() {
  return <OTPInput />
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <Suspense fallback={<div className="text-muted-foreground">Loading...</div>}>
        <VerifyContent />
      </Suspense>

      <div className="mt-8 text-center">
        <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
          ← Back to website
        </Link>
      </div>
    </div>
  )
}
