import React, { useContext, useState, useEffect} from 'react'
import { auth } from '../firebase/index'
import 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const logout = () => {
        return auth.signOut()
    }

    const signin = (email, password) => {
        return auth
          .signInWithEmailAndPassword(email, password)
          .then((response) => {
              setUser(response.user)
              console.log(response.user)
              return response.user
          })
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])


    const value = {
        currentUser,
        signup,
        logout,
        signin,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
