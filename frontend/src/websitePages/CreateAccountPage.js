import React, {useState, useRef} from 'react'
import styles from '../styles/CreateAccountPage.module.css'

const CreateAccountPage = () => {
  const [email, setEmail] = useState('')
  const emailRef = useRef()
  const [password, setPassword] = useState('')
  const passwordRef = useRef()
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const passwordConfirmationRef = useRef()

  const handleSubmit = (event) => {
    if (password === passwordConfirmation) {
    }

  }

  return (
        <div className={styles.container}>
          <form className={styles.form}>
            <div>
              <h1 className={styles.signUpTitle}>Sign Up</h1>
            </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input type="text"
                       id="email"
                       className={styles.userInput}
                       name="email"
                       value={email}
                       onChange={(event) => {
                         setEmail(event.target.value)
                       }}
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
                     value={password}
                     onChange={(event) => {
                       setPassword(event.target.value)
                     }}
                     required
              /> <br/>
            </div>

            <div>
              <label htmlFor="passwordConfirmation">Confirm Password:</label>
              <input type="password"
                     id="passwordConfirmation"
                     className={styles.userInput}
                     name="passwordConfirmation"
                     value={passwordConfirmation}
                     onChange={(event) => {
                       setPasswordConfirmation(event.target.value)
                     }}
                     required
              /> <br/>
            </div>
            <div>
              <button
                name="signUpButton"
                type="button"
                value="Sign Up"
                className={styles.signUpButton}
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
