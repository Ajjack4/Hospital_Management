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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/patients`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch patients')
      }

      const data = await response.json()
      // Transform API response to match frontend interface
      const transformedPatients = data.map((patient: any) => ({
        id: patient.ID.toString(),
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        address: patient.address,
        emergencyContact: patient.emergencyContact,
        medicalHistory: patient.medicalHistory,
        createdAt: patient.CreatedAt,
        updatedAt: patient.UpdatedAt,
      }))
      setPatients(transformedPatients)
    } catch (error) {
      toast.error("Failed to fetch patients")
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePatient = async (patientData: Omit<Patient, "id" | "createdAt" | "updatedAt">) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/patients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(patientData),
      })

      if (!response.ok) {
        throw new Error('Failed to create patient')
      }

      const newPatient = await response.json()
      // Transform API response to match frontend interface
      const transformedPatient = {
        id: newPatient.ID.toString(),
        name: newPatient.name,
        email: newPatient.email,
        phone: newPatient.phone,
        dateOfBirth: newPatient.dateOfBirth,
        gender: newPatient.gender,
        address: newPatient.address,
        emergencyContact: newPatient.emergencyContact,
        medicalHistory: newPatient.medicalHistory,
        createdAt: newPatient.CreatedAt,
        updatedAt: newPatient.UpdatedAt,
      }
      setPatients([...patients, transformedPatient])
      setShowForm(false)
      toast.success("Patient registered successfully!")
    } catch (error) {
      toast.error("Failed to register patient")
    }
  }

  const handleUpdatePatient = async (patientData: Omit<Patient, "id" | "createdAt" | "updatedAt">) => {
    if (!editingPatient) return

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/patients/${editingPatient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(patientData),
      })

      if (!response.ok) {
        throw new Error('Failed to update patient')
      }

      const updatedPatientResponse = await response.json()
      // Transform API response to match frontend interface
      const transformedPatient = {
        id: updatedPatientResponse.ID.toString(),
        name: updatedPatientResponse.name,
        email: updatedPatientResponse.email,
        phone: updatedPatientResponse.phone,
        dateOfBirth: updatedPatientResponse.dateOfBirth,
        gender: updatedPatientResponse.gender,
        address: updatedPatientResponse.address,
        emergencyContact: updatedPatientResponse.emergencyContact,
        medicalHistory: updatedPatientResponse.medicalHistory,
        createdAt: updatedPatientResponse.CreatedAt,
        updatedAt: updatedPatientResponse.UpdatedAt,
      }
      setPatients(patients.map((p) => (p.id === editingPatient.id ? transformedPatient : p)))
      setEditingPatient(null)
      setShowForm(false)
      toast.success("Patient updated successfully!")
    } catch (error) {
      toast.error("Failed to update patient")
    }
  }

  const handleDeletePatient = async (patientId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/patients/${patientId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to delete patient')
      }

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