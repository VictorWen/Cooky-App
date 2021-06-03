import React, { useState, useEffect } from 'react'
import styles from '../styles/PopularRecipePage.module.css'
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import RecipeDisplay from './components/recipeDisplay'
import { useAuth } from '../contexts/AuthContext'


const PopularRecipePage = () => {
  const { currentUser } = useAuth()
  const [recipes, setRecipes] = useState([])
  useEffect(() => {
    const getData = async () => {
      const url = 'http://localhost:3001/search/recipes/popular'
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setRecipes(data)
      console.log(data)
    }
    getData()
  }, [])
  const recipesDisplayed = recipes.map((item, index) => (
    <RecipeDisplay item={item}
                   key={index}
                   personalRecipe={currentUser !== null && item.data.author === currentUser.uid}
    />
  ))
  return (
    <>
      <div className={styles.container}>

        {recipesDisplayed}

      </div>
    </>
  )
}

export default PopularRecipePage
