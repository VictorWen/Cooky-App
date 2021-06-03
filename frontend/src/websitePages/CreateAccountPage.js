import React, {useState, useRef} from 'react'
import styles from '../styles/CreateAccountPage.module.css'
import { useAuth } from '../contexts/AuthContext'
import {useHistory} from 'react-router-dom'

const CreateAccountPage = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()
  const { signup, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  let history = useHistory()


  async function handleSubmit (e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
<<<<<<< HEAD
    } catch (err) {
      console.log(err)
      setError(err.code)
=======
      history.push('/')
    } catch {
      setError('Failed to create an account')
>>>>>>> e7a2f156d3c2612c2d14ec594e5c79e9351f677d
    }

    setLoading(false)
  }

  return (
        <div className={styles.container}>
          <form className={styles.form} onSubmit = {handleSubmit}>
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
                type="submit"
                value="Sign Up"
                className={styles.signUpButton}
                disabled = {loading}
              > Sign Up
              </button>
            </div>
            <br />
	   <br/><br/>
            {error === "auth/email-already-in-use" ?
              <div>
                <div className={styles.loginError}>
                  <p>
                    An account with this email already exists
                  </p>
                </div>
              </div> : <br/>
            }

            <div className={styles.signUpTitle}>
              <p onClick={() => {
                history.push('/login')
              }}
                 className={styles.accountExistsText}
              > I already have an account </p>
            </div>
          </form>
        </div>
  )
}

export default CreateAccountPage
