import React, { useRef, useState } from 'react'
import styles from '../styles/LoginPage.module.css'
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const ResetPasswordPage = () => {
  const emailRef = useRef()
  const { resetPassword, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  let history = useHistory()


  async function handleSubmit (e) {
    e.preventDefault()
    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("A link has been sent to your inbox with further instructions")
    } catch(err) {
      console.log(err.code)
      setError(err.code)
    }
    setLoading(false)
    history.push('/login')

  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit = {handleSubmit}>
        <div>
          <h1 className={styles.SignInTitle}>Reset Password</h1>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text"
                 id="email"
                 className={styles.userInput}
                 name="email"
                 ref={emailRef}
                 placeholder="Enter your email..."
                 required
          /> <br/>
        </div>

        <div>
          <button
            name="resetPasswordButton"
            type="submit"
            value="Reset Password"
            className={styles.SignInButton}
            disabled = {loading}
          > Reset Password
          </button>
        </div>
        <br />
        {error === "auth/user-not-found" ?
          <div>
            <div className={styles.loginError}>
              <p>
                No user with this email exists.
              </p>
              <p>
                Please enter a different email.
              </p>
            </div>
          </div> : ""
        }
      </form>
        <div className={styles.SignInTitle}>
          <p onClick={() => {
            history.push('/accountPage')
          }}
             className={styles.accountExistsText}
          > I don't have an account </p>
        </div>
    </div>
  )
}

export default ResetPasswordPage
