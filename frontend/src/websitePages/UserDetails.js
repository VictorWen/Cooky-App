import React from 'react'
import styles from '../styles/UserDetails.module.css'
import { useAuth } from '../contexts/AuthContext'

const UserPages = () => {
  const { currentUser, logout } = useAuth()
  //console.log(currentUser)
  return (
    <div className={styles.container}>
        <h1>Account Details </h1>
        <p>Email: {currentUser.email}</p>
      <input type="button"
             value="Sign Out"
             className={styles.signOut}
             onClick={() => {
               logout()
             }}
      />
    </div>
  )
}

export default UserPages
