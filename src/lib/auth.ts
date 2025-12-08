import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),

    // Email OTP Login (passwordless)
    CredentialsProvider({
      id: "email-otp",
      name: "Email OTP",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp) {
          throw new Error("Email and OTP required")
        }

        // Find the OTP token
        const verificationToken = await prisma.verificationToken.findFirst({
          where: { identifier: credentials.email },
        })

        if (!verificationToken) {
          throw new Error("No OTP found. Please request a new one.")
        }

        // Check if expired
        if (new Date() > verificationToken.expires) {
          // Clean up expired token
          await prisma.verificationToken.delete({
            where: {
              identifier_token: {
                identifier: credentials.email,
                token: verificationToken.token,
              },
            },
          })
          throw new Error("OTP expired. Please request a new one.")
        }

        // Verify OTP (token is hashed)
        const isValid = await bcrypt.compare(credentials.otp, verificationToken.token)
        if (!isValid) {
          throw new Error("Invalid OTP")
        }

        // Get or create user
        let user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: credentials.email,
              emailVerified: new Date(),
            },
          })
        } else if (!user.emailVerified) {
          // Mark email as verified
          await prisma.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() },
          })
        }

        // Clean up the used token
        await prisma.verificationToken.delete({
          where: {
            identifier_token: {
              identifier: credentials.email,
              token: verificationToken.token,
            },
          },
        })

        return user
      },
    }),

    // Admin credentials login
    CredentialsProvider({
      id: "admin-credentials",
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required")
        }

        // Check against environment admin credentials
        if (
          credentials.email === process.env.ADMIN_EMAIL &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          // Get or create admin user
          let adminUser = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          if (!adminUser) {
            adminUser = await prisma.user.create({
              data: {
                email: credentials.email,
                name: "Admin",
                role: "ADMIN",
                emailVerified: new Date(),
              },
            })
          } else if (adminUser.role !== "ADMIN") {
            // Ensure admin role is set
            await prisma.user.update({
              where: { id: adminUser.id },
              data: { role: "ADMIN" },
            })
            adminUser.role = "ADMIN"
          }

          return adminUser
        }

        throw new Error("Invalid admin credentials")
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  callbacks: {
    async signIn({ user, account }) {
      // Auto-verify email for OAuth users
      if (account?.provider === "google") {
        if (user.email) {
          const dbUser = await prisma.user.findUnique({ where: { email: user.email } })
          if (dbUser && !dbUser.emailVerified) {
            await prisma.user.update({
              where: { email: user.email },
              data: { emailVerified: new Date() },
            }).catch(() => {})
          }
        }
      }
      return true
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        // Fetch role from database
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true },
        })
        token.role = dbUser?.role || "USER"
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}
