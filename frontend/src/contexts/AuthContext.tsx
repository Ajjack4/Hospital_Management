"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  role: "receptionist" | "doctor"
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Mock API call - replace with actual API endpoint
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        // Mock authentication for demo purposes
        let mockUser: User
        if (email === "receptionist@hospital.com" && password === "password") {
          mockUser = {
            id: "1",
            email: "receptionist@hospital.com",
            role: "receptionist",
            name: "Jane Smith",
          }
        } else if (email === "doctor@hospital.com" && password === "password") {
          mockUser = {
            id: "2",
            email: "doctor@hospital.com",
            role: "doctor",
            name: "Dr. John Doe",
          }
        } else {
          throw new Error("Invalid credentials")
        }

        localStorage.setItem("token", "mock-jwt-token")
        localStorage.setItem("user", JSON.stringify(mockUser))
        setUser(mockUser)
        return
      }

      const data = await response.json()
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      setUser(data.user)
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
