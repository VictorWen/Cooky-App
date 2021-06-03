import React from 'react'
import styles from "../../styles/PopularRecipePage.module.css";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom'


const RecipeDisplay = (props) => {
  let history = useHistory()
  const starsMapping = []
  const noStars = props.item.data.total_rating / props.item.data.n_ratings
  for (let i = 0; i < 5; i++) {
    if (i + .75 < noStars) {
      starsMapping.push(2)
    } else if (i + .25 < noStars) {
      starsMapping.push(1)
    } else {
      starsMapping.push(0)
    }
  }
  const stars = starsMapping.map((item, index) => {
    if (item === 2) {
      return (
        <StarIcon className={styles.ratingStars}
                  key={index}
        />
      )
    } else if (item === 1) {
      return (
        <StarHalfIcon className={styles.ratingStars}
                      key={index}
        />
      )
    } else {
      return (
        <StarBorderIcon className={styles.ratingStars}
                        key={index}
        />
      )
    }

  })

  return (
    <div className={styles.recipeInfoContainer}>
      <img src={props.item.data.images[0]}
           className={styles.recipeImage}
      />
      <div className={styles.recipeInfo}>
        <h4>{props.item.data.name}</h4>
        {stars} <span style={{
        position: 'relative',
        top: '-6px',
      }}>{props.item.data.n_ratings} </span>
        <br/>
        <p className={styles.recipeDescription}>{props.item.data.description}</p>
      </div>
      {props.personalRecipe ?
        <>
          <EditIcon className={styles.editButton}
                    onClick={() => {
                      const pathname = '/editRecipe/' + props.item.id
                      console.log(pathname)
                      history.push({
                        pathname: pathname,
                        state: props.item
                        })
                    }}
          />
          <DeleteIcon className={styles.deleteButton}
                      onClick={async () => {
                        try {
                          const url = "http://localhost:3001/recipe/delete/" + props.item.id
                          const response = await fetch(url, {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json'
                            },
                          })
                          window.location.reload()
                        } catch (err) {
                          console.log(err)
                        }
                      }}
          />
        </>
        :
        <></>
      }

    </div>
  )
}

export default RecipeDisplay
