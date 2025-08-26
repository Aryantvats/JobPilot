import axios from 'axios'
import React, { useState, useEffect, createContext, useContext } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const AppContext = createContext()

export const AppProvider = ({ children }) => {   // ✅ lowercase children
  const navigate = useNavigate()

  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [jobs, setJobs] = useState([])   // ✅ define jobs
  const [loading, setLoading] = useState(false)
  const [showlogin, setShowlogin] = useState(false)

  // ================== FUNCTIONS ==================

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/me")   // ✅ await
      if (data.success) {
        setUser(data.user)
      } else {
        toast.error(data.message)
        logout()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      logout()
    }
  }

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get("/api/jobs")
      if (data.success) {
        setJobs(data.jobs)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  const login = (newToken) => {
    localStorage.setItem("token", newToken)
    setToken(newToken)
    axios.defaults.headers.common["Authorization"] = `${newToken}`
    fetchUser()
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common["Authorization"]
    navigate("/login")   // ✅ use frontend route
    toast.success("Logged out successfully")
  }

  // ================== EFFECTS ==================
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
      axios.defaults.headers.common["Authorization"] = `${storedToken}`
      fetchUser()
    }
  }, [])

  // ================== CONTEXT VALUE ==================
  const value = {
    axios,
    token,
    setToken,
    user,
    setUser,
    jobs,
    setJobs,
    loading,
    fetchUser,
    fetchJobs,
    login,
    logout,
    navigate,
    showlogin,
    setShowlogin,
  }

  return (
    <AppContext.Provider value={value}>
      {children}   {/* ✅ this now works */}
    </AppContext.Provider>
  )
}

// Custom hook
export const useAppContext = () => useContext(AppContext)
