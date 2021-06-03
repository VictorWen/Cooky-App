import React, { useRef, useState, useEffect } from 'react'
import styles from '../styles/YourRecipesPage.module.css'
import JSONDATA from '../mockData.json'
import RecipeDisplay from './components/recipeDisplay'

const YourRecipesPage2 = () => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className={styles.container}>
      <input type="text"
             placeholder="search"
             className={styles.searchFormat}
             onChange={event => {
               setSearchTerm(event.target.value)
             }}
      >
      </input>
      {JSONDATA.filter((value) => {
        if (searchTerm === "") {
          return value.user_name;
        } else if (value.user_name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return value.user_name;
        }

      })
        .map((val, key) => {
          return <div className={styles.recipeFormat}>
            Recipe Name: {val.user_name} {'\n'}
            Recipe Creator: {val.first_name} {val.last_name} {'\n'}
            Date Created : {val.email}
          </div>
        })}
    </div>
  )
}


const YourRecipesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  let renderedResults = []

  renderedResults = JSONDATA.filter(value => {
    if (searchTerm === "") {
      return value.user_name
    } else if (value.user_name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return value.user_name
    }
  }).map((val, key) => (
    <div>
      <RecipeDisplay title={val.user_name}
                     numRatings={30}
					 stars={3.7}
                     imgsrc="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F7847380.jpg&w=272&h=272&c=sc&poi=face&q=85"
                     description="Using pantry items plus a couple of fresh items, you can create a cheesy,"
                     author={val.first_name + " " + val.last_name}
      />
    </div>


  ))

  console.log(renderedResults)


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
        {renderedResults}
      </div>

    </div>
  )

}


export default YourRecipesPage
