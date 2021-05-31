import React from 'react'
import styles from '../styles/PopularRecipePage.module.css'
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';

const PopularRecipePage = () => {
  const stars = [1, 2, 3, 4, 5].map((item, index) => {
    if (index === 4) {
      return (
        <>
        <StarHalfIcon className={styles.ratingStars}/>
        <span style={{
          position: 'relative',
          top: '-5px',
        }}> &nbsp; 75</span>
        </>
      )
    }
    return (
      <StarIcon className={styles.ratingStars}/>
      )
  })
  return (
    <>
      <div className={styles.container}>

        <div>
          <img src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F7847380.jpg&w=272&h=272&c=sc&poi=face&q=85"
               className={styles.recipeImage}
          />
          <div className={styles.recipeInfo}>
            <h4>Pantry Chicken Casserole</h4>
            {stars}
            <br />
            <p className={styles.recipeDescription}>Using pantry items plus a couple of fresh items, you can create a cheesy, ...</p>
            <b>By: Bibi</b>
          </div>
        </div>

        <div>
          <img src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F7847380.jpg&w=272&h=272&c=sc&poi=face&q=85"
               className={styles.recipeImage}
          />
          <div className={styles.recipeInfo}>
            <h4>Pantry Chicken Casserole</h4>
            {stars}
            <br />
            <p className={styles.recipeDescription}>Using pantry items plus a couple of fresh items, you can create a cheesy, ...</p>
            <b>By: Bibi</b>
          </div>
        </div>

        <div>
          <img src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F7847380.jpg&w=272&h=272&c=sc&poi=face&q=85"
               className={styles.recipeImage}
          />
          <div className={styles.recipeInfo}>
            <h4>Pantry Chicken Casserole</h4>
            {stars}
            <br />
            <p className={styles.recipeDescription}>Using pantry items plus a couple of fresh items, you can create a cheesy, ...</p>
            <b>By: Bibi</b>
          </div>
        </div>

        <div>
          <img src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F7847380.jpg&w=272&h=272&c=sc&poi=face&q=85"
               className={styles.recipeImage}
          />
          <div className={styles.recipeInfo}>
            <h4>Pantry Chicken Casserole</h4>
            {stars}
            <br />
            <p className={styles.recipeDescription}>Using pantry items plus a couple of fresh items, you can create a cheesy, ...</p>
            <b>By: Bibi</b>
          </div>
        </div>

        <div>
          <img src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F7847380.jpg&w=272&h=272&c=sc&poi=face&q=85"
               className={styles.recipeImage}
          />
          <div className={styles.recipeInfo}>
            <h4>Pantry Chicken Casserole</h4>
            {stars}
            <br />
            <p className={styles.recipeDescription}>Using pantry items plus a couple of fresh items, you can create a cheesy, ...</p>
            <b>By: Bibi</b>
          </div>
        </div>

      </div>
    </>
  )
}

export default PopularRecipePage
