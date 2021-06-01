import React, {useState, useRef} from 'react'
import styles from '../styles/CreateAccountPage.module.css'
import { useAuth } from '../contexts/AuthContext'

const CreateAccountPage = () => {
  const [email, setEmail] = useState('')
  const emailRef = useRef()
  const [password, setPassword] = useState('')
  const passwordRef = useRef()
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const passwordConfirmationRef = useRef()
  const { signup, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
    } catch {
      setError('Failed to create an account')
    }

    setLoading(false)
  }

  return (
        <div className={styles.container}>
          <form className={styles.form} onSubmit = {handleSubmit}>
            {currentUser.email}
            <div>
              <h1 className={styles.signUpTitle}>Sign Up</h1>
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
              <label htmlFor="password">Password:</label>
              <input type="password"
                     id="password"
                     className={styles.userInput}
                     name="password"
                     ref={passwordRef}
                     required
              /> <br/>
            </div>

            <div>
              <label htmlFor="passwordConfirmation">Confirm Password:</label>
              <input type="password"
                     id="passwordConfirmation"
                     className={styles.userInput}
                     name="passwordConfirmation"
                     ref={passwordConfirmationRef}
                     required
              /> <br/>
            </div>
            <div>
              <button
                name="signUpButton"
                type="button"
                value="Sign Up"
                className={styles.signUpButton}
                disabled = {loading}
                onClick={() => {

                }}
              > Sign Up
              </button>
            </div>
            <br />
            <div className={styles.signUpTitle}>
              <p> I already have an account </p>
            </div>

          </form>
        </div>
  )
}

export default CreateAccountPage
