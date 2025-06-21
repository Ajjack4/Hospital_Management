"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import PatientForm from "../components/PatientForm"
import PatientList from "../components/PatientList"
import Header from "../components/Header"
import type { Patient } from "../types"
import toast from "react-hot-toast"

const ReceptionistDashboard = () => {
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

  const handleCreatePatient = async (patientData: Omit<Patient, "id" | "createdAt" | "updatedAt">) => {
    try {
      // Mock API call
      const newPatient: Patient = {
        ...patientData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setPatients([...patients, newPatient])
      setShowForm(false)
      toast.success("Patient registered successfully!")
    } catch (error) {
      toast.error("Failed to register patient")
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
      toast.success("Patient updated successfully!")
    } catch (error) {
      toast.error("Failed to update patient")
    }
  }

  const handleDeletePatient = async (patientId: string) => {
    try {
      setPatients(patients.filter((p) => p.id !== patientId))
      toast.success("Patient deleted successfully!")
    } catch (error) {
      toast.error("Failed to delete patient")
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
          <h1 className="text-3xl font-bold text-gray-900">Receptionist Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, {user?.name}</p>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Register New Patient
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <PatientForm
              patient={editingPatient}
              onSubmit={editingPatient ? handleUpdatePatient : handleCreatePatient}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        <PatientList
          patients={patients}
          onEdit={handleEditPatient}
          onDelete={handleDeletePatient}
          canEdit={true}
          canDelete={true}
        />
      </div>
    </div>
  )
}

export default ReceptionistDashboard
