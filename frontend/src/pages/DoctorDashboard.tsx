"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import PatientList from "../components/PatientList"
import PatientForm from "../components/PatientForm"
import Header from "../components/Header"
import type { Patient } from "../types"
import toast from "react-hot-toast"

const DoctorDashboard = () => {
  const { user } = useAuth()
  const [patients, setPatients] = useState<Patient[]>([])
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      // Mock API call - replace with actual endpoint
      const mockPatients: Patient[] = [
        {
          id: "1",
          name: "John Smith",
          email: "john.smith@email.com",
          phone: "+1234567890",
          dateOfBirth: "1990-05-15",
          gender: "male",
          address: "123 Main St, City, State 12345",
          emergencyContact: "Jane Smith - +1234567891",
          medicalHistory: "No known allergies",
          createdAt: "2024-01-15T10:30:00Z",
          updatedAt: "2024-01-15T10:30:00Z",
        },
        {
          id: "2",
          name: "Sarah Johnson",
          email: "sarah.johnson@email.com",
          phone: "+1234567892",
          dateOfBirth: "1985-08-22",
          gender: "female",
          address: "456 Oak Ave, City, State 12345",
          emergencyContact: "Mike Johnson - +1234567893",
          medicalHistory: "Diabetes Type 2",
          createdAt: "2024-01-16T14:20:00Z",
          updatedAt: "2024-01-16T14:20:00Z",
        },
      ]

      setPatients(mockPatients)
    } catch (error) {
      toast.error("Failed to fetch patients")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePatient = async (patientData: Omit<Patient, "id" | "createdAt" | "updatedAt">) => {
    if (!editingPatient) return

    try {
      const updatedPatient: Patient = {
        ...editingPatient,
        ...patientData,
        updatedAt: new Date().toISOString(),
      }

      setPatients(patients.map((p) => (p.id === editingPatient.id ? updatedPatient : p)))
      setEditingPatient(null)
      setShowForm(false)
      toast.success("Patient information updated successfully!")
    } catch (error) {
      toast.error("Failed to update patient information")
    }
  }

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setEditingPatient(null)
    setShowForm(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, {user?.name}</p>
        </div>

        {showForm && editingPatient && (
          <div className="mb-8">
            <PatientForm
              patient={editingPatient}
              onSubmit={handleUpdatePatient}
              onCancel={handleCancelForm}
              isDoctor={true}
            />
          </div>
        )}

        <PatientList patients={patients} onEdit={handleEditPatient} canEdit={true} canDelete={false} />
      </div>
    </div>
  )
}

export default DoctorDashboard
