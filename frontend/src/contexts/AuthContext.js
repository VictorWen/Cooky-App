import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState()

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }
  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })
  }, [])

  const value = {
    currentUser,
    signup
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
