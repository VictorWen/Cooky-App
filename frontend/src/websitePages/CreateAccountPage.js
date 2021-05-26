import React from 'react'
import styles from '../styles/CreateAccountPage.module.css'

const CreateAccountPage = () => {
  return (
    <>
        <h1>
          Create an Account
        </h1>

          <form>

            <label htmlFor="userName">User Name</label>
            <input type="text"
                   className={styles.userInput}
              id = "userName"
              name = "userName"
              placeholder= "Your User Name"
            /> <br/>

            <label htmlFor="passWord">Password</label>
            <input type="text"
                   className={styles.userInput}
              id = "passWord"
              name = "passWord"
              placeholder= "Your Password"
            /> <br/>

            <label htmlFor="firstName">First Name</label>
            <input type="text"
                   className={styles.userInput}
              id = "firstName"
              name = "firstName"
              placeholder= "Your First Name"
            /> <br/>

            <label htmlFor="lastName">Last Name</label>
            <input type="text"
                   className={styles.userInput}
              id = "lastName"
              name = "lastName"
              placeholder= "Your Last Name"
            /> <br/>

            <label htmlFor="country">Country</label>
            <select id="country" name="country"
                    className={styles.userInput}
            >
              <option value="usa">USA</option>
              <option value="unitedKingdom">United Kingdom</option>
              <option value="canada">Canada</option>
            </select>
            <input type="button"
                   value="Create an account"
                   className={styles.addIngredientButton}
            />
          </form>


    </>
  )
}

export default CreateAccountPage
