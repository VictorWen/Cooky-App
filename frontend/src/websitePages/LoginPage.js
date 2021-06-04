import React, { useRef, useState } from 'react'
import styles from '../styles/LoginPage.module.css'
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { signin, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  let history = useHistory()


  async function handleSubmit (e) {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)
      const signIn = await signin(emailRef.current.value, passwordRef.current.value)
      history.push('/yourRecipes')
    } catch(err) {
      console.log(err.code)
      setError(err.code)
    }
    setLoading(false)
  }


  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit = {handleSubmit}>
        <div>
          <h1 className={styles.SignInTitle}>Sign In</h1>
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
            name="signInButton"
            type="submit"
            value="Sign In"
            className={styles.SignInButton}
            disabled = {loading}
          > Sign In
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
                Please create an account.
              </p>
            </div>
          </div> : <><br/><br/></>
        }
        {error === "auth/wrong-password" ?
          <div>
            <div className={styles.loginError}>
              <p>
                Incorrect email or password
              </p>
            </div>
          </div> : <br/>

        }

        {error === "auth/too-many-requests" ?
          <div>
            <div className={styles.loginError}>
              <p>
                Server Error - try again later
              </p>
            </div>
          </div> : <br/>

        }
        <div className={styles.SignInTitle}>
          <p onClick={() => {
            history.push('/resetPassword')
          }}
             className={styles.accountExistsText}
          > Forgot password? </p>
        </div>
        <div className={styles.SignInTitle}>
          <p onClick={() => {
            history.push('/accountPage')
          }}
             className={styles.accountExistsText}
          > I don't have an account </p>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
