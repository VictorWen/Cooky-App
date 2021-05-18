import React from 'react'
import './CreateAccountPage.css'

const CreateAccountPage = () => {
  return (
    <>
      <body>
        <h1>
          Create an Account
        </h1>

        <div>
          <form>

            <label htmlFor="userName">User Name</label>
            <input type="text"
              id = "userName"
              name = "userName"
              placeholder= "Your User Name"
            /> <br/>

            <label htmlFor="passWord">Password</label>
            <input type="text"
              id = "passWord"
              name = "passWord"
              placeholder= "Your Password"
            /> <br/>

            <label htmlFor="firstName">First Name</label>
            <input type="text"
              id = "firstName"
              name = "firstName"
              placeholder= "Your First Name"
            /> <br/>

            <label htmlFor="lastName">Last Name</label>
            <input type="text"
              id = "lastName"
              name = "lastName"
              placeholder= "Your Last Name"
            /> <br/>

            <label htmlFor="country">Country</label>
            <select id="country" name="country">
              <option value="usa">USA</option>
              <option value="unitedKingdom">United Kingdom</option>
              <option value="canada">Canada</option>
            </select>
            <input type="submit" value="Submit"></input>
          </form>
          
        </div>

      </body>
      
    </>
  )
}

export default CreateAccountPage
