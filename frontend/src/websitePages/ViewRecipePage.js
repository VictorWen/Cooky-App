import React from 'react'
import styles from "../styles/CreateARecipePage.module.css";
import { useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


const ViewRecipePage = () => {
  const location = useLocation()
  const { currentUser } = useAuth()
  console.log(location.state)
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
        {currentUser === null ? <></> : <input type="number"
                                               className={styles.userInput}
                                               placeholder="Rate the recipe on a scale of 1 to 5"
        />}
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
