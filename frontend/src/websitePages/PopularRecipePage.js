import React from 'react'
import styles from '../styles/PopularRecipePage.module.css'
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import RecipeDisplay from './components/recipeDisplay'

const PopularRecipePage = () => {
  const recipesDisplayed = [3.62, 1.93, 2.22, 0.35, 4.99, 2.72, 3.66, 3.99, 4.23].map((item, index) => {
    return (
      <RecipeDisplay stars={item}
                     key={index}
                     title="Pantry Chicken Casserole"
                     numRatings={30}
                     imgsrc="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F7847380.jpg&w=272&h=272&c=sc&poi=face&q=85"
                     description="Using pantry items plus a couple of fresh items, you can create a cheesy,"
                     author="Bibi"

      />
    )
  })

  return (
    <>
      <div className={styles.container}>

        {recipesDisplayed}

      </div>
    </>
  )
}

export default PopularRecipePage
