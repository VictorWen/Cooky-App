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

    async function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password).then(data => {
            createProfile(data)
            })
    }

    async function createProfile(userObject)
    {
        console.log("made it here")
        console.log('email', userObject.user.email)
        const data = {
          uid: userObject.user.uid,
          email: userObject.user.email,
          recipes: []
        }

        console.log(JSON.stringify(data))
    
      const response = await fetch('http://localhost:3001/newuser', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
        console.log(response)
        return response
        
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

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
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
        resetPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
