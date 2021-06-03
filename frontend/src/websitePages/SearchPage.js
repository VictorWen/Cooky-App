import React, { useState, useEffect } from 'react'
import styles from '../styles/SearchPage.module.css'
import JSONDATA from '../mockData.json'
import RecipeDisplay from './components/recipeDisplay'
import { useAuth } from '../contexts/AuthContext'
import SearchIcon from '@material-ui/icons/Search';

const YourRecipesPage = () => {
  const [recipesList, setRecipesList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const { currentUser } = useAuth()
  const itemsRendered = recipesList.map((item, index) => (
    <RecipeDisplay item={item}
                   key={index}
                   personalRecipe={true}
    />
  ))
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.searchContainer}>
          <input type="text"
                 placeholder="Search by recipe name..."
                 className={styles.searchBox}
                 value={searchTerm}
                 onChange={(e) => {
                   setSearchTerm(e.target.value)
                 }}
          />
          <SearchIcon className={styles.searchIcon}
                      onClick={async () => {
                        try {
                          const response = await fetch('http://localhost:3001/search/recipes/name/' + searchTerm, {
                            method: 'GET',
                            headers: {
                              'Content-Type': 'application/json'
                            },
                          })
                          console.log(response)
                          const data = await response.json()
                          console.log(data)
                          setRecipesList(data)
                        } catch(err) {
                          console.log(err)
                        }

                      }}
          />
        </div>

      </div>
      <div>
        <br/><br/>
      </div>
      <div className={styles.recipeContainer}>
        {itemsRendered}
      </div>

    </div>
  )

}


export default YourRecipesPage
