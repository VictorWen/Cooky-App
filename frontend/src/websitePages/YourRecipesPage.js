import React, { useState, useEffect } from 'react'
import styles from '../styles/YourRecipesPage.module.css'
import JSONDATA from '../mockData.json'
import RecipeDisplay from './components/recipeDisplay'
import { useAuth } from '../contexts/AuthContext'

const YourRecipesPage = () => {
  const [recipesList, setRecipesList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const { currentUser } = useAuth()
  useEffect(() => {
    const getRecipes = async () => {
      try {
        const url = 'http://localhost:3001/user/' + currentUser.uid + '/recipes'
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const data = await response.json()
        console.log("data", data[0])
        setRecipesList(data)
      } catch(err) {
        console.log(err)
      }
    }
    getRecipes()
  }, [])

  const renderedResults2 = recipesList.filter(value => {
    if (searchTerm === "") {
      return value
    } else if (value.data.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return value
    }
  }).map((item, index) => (
    <RecipeDisplay item={item}
                   key={index}
                   personalRecipe={true}
    />
  ))



  return (
    <div className={styles.container}>
      <div>
        <input type="text"
               placeholder="Search by recipe name..."
               className={styles.searchBox}
               value={searchTerm}
               onChange={(e) => {
                 setSearchTerm(e.target.value)
               }}
        />
      </div>
      <div>
        <br/><br/>
      </div>
      <div className={styles.recipeContainer}>
        {renderedResults2}
      </div>

    </div>
  )

}


export default YourRecipesPage
