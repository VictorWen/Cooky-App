import React from 'react'
import styles from "../../styles/PopularRecipePage.module.css";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { StarBorder } from "@material-ui/icons";

const RecipeDisplay = (props) => { // props.stars
  const starsMapping = []
  for (let i = 0; i < 5; i++) {
    if (i + .75 < props.stars) {
      starsMapping.push(2)
    } else if (i + .25 < props.stars) {
      starsMapping.push(1)
    } else {
      starsMapping.push(0)
    }
  }
  const stars = starsMapping.map((item, index) => {
    if (item === 2) {
      return (
        <>
          <StarIcon className={styles.ratingStars}/>
        </>
      )
    } else if (item === 1) {
      return (
        <>
          <StarHalfIcon className={styles.ratingStars}/>
        </>
      )
    } else {
      return (
        <>
          <StarBorderIcon className={styles.ratingStars}/>
        </>
      )
    }

  })

  return (
    <div>
      <img src={props.imgsrc}
           className={styles.recipeImage}
      />
      <div className={styles.recipeInfo}>
        <h4>{props.title}</h4>
        {stars}  <span style={{
        position: 'relative',
        top: '-6px',
      }}>{props.numRatings} </span>
        <br/>
        <p className={styles.recipeDescription}>{props.description}</p>
        <b>By:{props.author}</b>
      </div>
    </div>
  )
}

export default RecipeDisplay
