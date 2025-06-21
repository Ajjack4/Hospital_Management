

import { useAuth } from "../contexts/AuthContext"
import { LogOut , HeartPulse } from "lucide-react"



const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <HeartPulse  className="h-8 w-8 text-blue-600" />
            
            <span className="ml-2 text-xl font-semibold text-gray-900">Hospital Management</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="text-gray-500">Welcome, </span>
              <span className="font-medium text-gray-900">{user?.name}</span>
              <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full capitalize">
                {user?.role}
              </span>
            </div>

            <button
              onClick={logout}
              className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
