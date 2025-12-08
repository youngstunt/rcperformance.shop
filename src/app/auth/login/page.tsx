import { LoginForm } from "@/components/auth/LoginForm"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <LoginForm />

      <div className="mt-8 text-center">
        <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
          ← Back to website
        </Link>
      </div>
    </div>
  )
}
