import React, {useState, useRef} from 'react'
import styles from '../styles/CreateAccountPage.module.css'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

const LoginPage = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit (e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push('/')
    } catch {
      setError('Failed to log in')
    }

    setLoading(false)
  }

  return (
        <div className={styles.container}>
          <form className={styles.form} onSubmit = {handleSubmit}>
            <div>
              <h1 className={styles.signUpTitle}>Log in</h1>
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
              <button
                name="logInButton"
                type="submit"
                value="LogIn"
                className={styles.signUpButton}
                disabled = {loading}
              > Log In
              </button>
            </div>
            <br />
            <div className={styles.signUpTitle}>
              Need an account?&nbsp; <Link to="/createAnAccount">Sign up</Link>
            </div>
          </form>
        </div>
  )
}

export default LoginPage