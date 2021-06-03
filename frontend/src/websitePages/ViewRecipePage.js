
import React, { useRef, useState, useEffect } from 'react'
import styles from "../styles/CreateARecipePage.module.css";
import { useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


const ViewRecipePage = () => {
  const rating = useRef()
  const location = useLocation()
  const [userData, setUserData] = useState({})
  const { currentUser } = useAuth()
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('http://localhost:3001/user/' + currentUser.uid, {
          method: 'GET',
          headers: {
            'Content-Type': '/application/json'
          }
        })
        const data = await response.json()
        console.log("userData", userData)
        setUserData(data)
      } catch(err) {
        console.log(err)
      }
    }
    getData()
  }, [])
  console.log("userData", userData)
  const recipeInstructions = location.state.data.steps.map((item, index) => (
    <li key={index}>{item}</li>
  ))

  const ingredients = location.state.data.ingredients.map((item, index) => (
    <li key={index}>{item}</li>
  ))
  const equipment = location.state.data.equipment.map((item, index) => (
    <li key={index}>{item}</li>
  ))
  return (
    <div className={styles.container}>
      <div>
        <p>Recipe title: {location.state.data.name}</p>
        <p>Preparation time: {location.state.data.preptime} minutes</p>
        <p>Cooking time: {location.state.data.cooktime} minutes</p>
        <p>Steps:</p>
        <ul>
          {recipeInstructions}
        </ul>
        {(currentUser === null) ? <></> :
          (userData.ratings === undefined || !(location.state.id in userData.ratings))
          ?
          <form onSubmit={(e) => {
          e.preventDefault()
          const recipeId = location.state.id
          const userid = currentUser.uid
          const data = {
            'recipe_id': recipeId,
            'user_id': userid,
            'rating': rating.current.value
          }
          try {
            const url = 'http://localhost:3001/user/' + currentUser.uid + '/rate/' + location.state.id + '/' + rating.current.value
            fetch(url, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            }).then(response => {
            })
          } catch(err) {
            console.log(err)
          }
            window.location.reload()
        }}>
          <input type="number"
                 className={styles.userInput}
                 placeholder="Rate the recipe on a scale of 1 to 5"
                 min={0} max={5}
                 ref={rating}
                 required
          />
          <input type="submit"
                 className={styles.addIngredientButton}
                 value="Submit rating"
          />
        </form> :
        <p>You rated this recipe {userData.ratings[location.state.id]} out of 5</p>
        }
      </div>
      <div>
        <p>Ingredients:</p>
        <ul>
          {ingredients}
        </ul>
        <p>Equipment:</p>
        <ul>
          {equipment}
        </ul>
        <img src={location.state.data.images[0]} style={{
          width: '100%'
        }}/>
      </div>

    </div>
  )
}

export default ViewRecipePage
