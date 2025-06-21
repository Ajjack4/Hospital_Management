export interface Patient {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: "male" | "female" | "other"
  address: string
  emergencyContact: string
  medicalHistory: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  role: "receptionist" | "doctor"
  name: string
}
