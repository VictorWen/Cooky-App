import React, { useState, useEffect, useRef } from "react";
import styles from '../styles/CreateARecipePage.module.css'
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import { Remove } from "@material-ui/icons";
import { storage } from '../firebase/index'
import { useAuth } from '../contexts/AuthContext'
import { useLocation } from 'react-router-dom'

const CreateARecipePage = () => {
  const location = useLocation()
  console.log("location", location)
  const { currentUser } = useAuth()
  console.log("uid", currentUser.uid)
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {
      name: title.current.value,
      ingredients: ingredientsList,
      cooktime: cookingTime.current.value,
      preptime: prepTime.current.value,
      servings: 0,
      steps: recipeInstructionsList,
      equipment: equipmentList,
      images: [imageURL],
      n_ratings: 1,
      total_rating: 5,
      description: shortDescription.current.value,
    }
    const response = await fetch('http://localhost:3001/user/' + currentUser.uid + '/recipes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    console.log(response)
  }

  const handleUpload = (e) => {
    if (image === null) return
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    uploadTask.on(
      "state_changed",
      snapshot => {
      },
      error => {
        console.log("error", error)
        setImageUploadable(true)

      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setImageURL(url)
            setImageUploadable(false)
            console.log("url", url)
          })
      }
    )
  }

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const [imageUploadable, setImageUploadable] = useState(true)
  const [imageURL, setImageURL] = useState("")
  const [image, setImage] = useState(null)
  const title = useRef()
  const ingredientText = useRef()
  const [ingredientsList, setIngredientsList] = useState([])
  const [ingredientsListRendered, setIngredientsListRendered] = useState([])
  const equipmentText = useRef()
  const [noEquipmentText, setNoEquipmentText] = useState(false)
  const [equipmentList, setEquipmentList] = useState([])
  const [equipmentListRendered, setEquipmentListRendered] = useState([])
  const [noIngredients, setNoIngredients] = useState(false)
  const [emptyStep, setEmptyStep] = useState(false)
  const cookingTime = useRef()
  const prepTime = useRef()
  const shortDescription = useRef()
  const [recipeInstructionsList, setRecipeInstructionsList] = useState([""])
  const [recipeInstructionsListRendered, setRecipeInstructionsListRendered] = useState([])
  useEffect(() => {
    if (location.state !== undefined) {
      title.current.value = location.state.data.name
      setIngredientsList(location.state.data.ingredients)
      setEquipmentList(location.state.data.equipment)
      setRecipeInstructionsList(location.state.data.steps)
      prepTime.current.value = location.state.data.preptime
      cookingTime.current.value = location.state.data.cooktime
      shortDescription.current.value = location.state.data.description
      if (location.state.data.images.length === 1) {
        setImageUploadable(false)
      }

    }
  }, [title.current])


  useEffect(() => {
    const ingredientsListRendered = ingredientsList.map((item, index) => (
      <div key={index}>
        <Tooltip title="Remove ingredient">
          <CancelIcon className={styles.removeIngredientButton}
                      onClick={() => {
                        const arrayCopy = [...ingredientsList]
                        arrayCopy.splice(index, 1)
                        setIngredientsList(arrayCopy)
                      }}/>
        </Tooltip>

        {item}
      </div>
    ))
    setIngredientsListRendered(ingredientsListRendered)
  }, [ingredientsList])

  useEffect(() => {
    const equipmentListRendered = equipmentList.map((item, index) => (
      <div key={index}>
        <Tooltip title="Remove ingredient">
          <CancelIcon className={styles.removeIngredientButton}
                      onClick={() => {
                        const arrayCopy = [...equipmentList]
                        arrayCopy.splice(index, 1)
                        setEquipmentList(arrayCopy)
                      }}/>
        </Tooltip>

        {item}
      </div>
    ))
    setEquipmentListRendered(equipmentListRendered)
  }, [equipmentList])


  useEffect(() => {
    const recipeInstructionsListRendered = recipeInstructionsList.map((item, index) => (
      <div className={styles.recipeInstructionsContainer}
           key={index}
      >
        <Tooltip title="Add a step">
          <AddCircleIcon className={styles.addStepButton}
                         onClick={() => {
                           const arrayCopy = [...recipeInstructionsList]
                           arrayCopy.splice(index + 1, 0, "")
                           setRecipeInstructionsList(arrayCopy)
                         }}
          />
        </Tooltip>
        <Tooltip title="Remove step">
          <RemoveCircleRoundedIcon className={styles.removeStepButton}
                                   onClick={() => {
                                     if (recipeInstructionsList.length === 1) return
                                     const arrayCopy = [...recipeInstructionsList]
                                     arrayCopy.splice(index, 1)
                                     setRecipeInstructionsList(arrayCopy)
                                   }}
          />
        </Tooltip>
        <textarea
          className={styles.recipeInstructions}
          name={"step" + index}
          value={recipeInstructionsList[index]}
          onChange={(event) => {
            const arrayCopy = [...recipeInstructionsList]
            arrayCopy[index] = event.target.value
            setRecipeInstructionsList(arrayCopy)
          }}
          placeholder={"Step " + (index + 1) + "..."}
          required
        />
      </div>
    ))
    setRecipeInstructionsListRendered(recipeInstructionsListRendered)
  }, [recipeInstructionsList])

  return (
    <>
      <form onSubmit={handleSubmit} required>

        <div className={styles.container}>
          <div>
            <label htmlFor="recipeTitle">Recipe Title:</label>
            <input type="text"
                   id="recipeTitle"
                   className={styles.userInput}
                   name="recipeTitle"
                   ref={title}
                   placeholder="Recipe Title..."
                   required
            />
            <label htmlFor="addAnIngredient">Add an ingredient
              <span className={styles.noIngredientsText}>{noIngredients ? " - Please enter an ingredient" : ""}</span>
            </label>
            <input type="text"
                   className={styles.userInput}
                   id="addAnIngredient"
                   name="addAnIngredient"
                   ref={ingredientText}
                   placeholder="Ingredient Name..."
            />

            <button
              name="AddIngredient"
              type="button"
              className={styles.addIngredientButton}
              onClick={() => {
                const str = ingredientText.current.value.replace(/\s/g, '')
                if (str === "") {
                  setNoIngredients(true)
                  return
                }
                setNoIngredients(false)
                setIngredientsList([...ingredientsList, ingredientText.current.value])
                ingredientText.current.value = ""
              }}
            >
              Add Ingredient
            </button>

            <label htmlFor="addEquipment">Give a short description of your recipe
              <span
                className={styles.noIngredientsText}>{noEquipmentText ? " - Please enter a piece of equipment" : ""}</span>
            </label>
            <input type="text"
                   className={styles.userInput}
                   id="addEquipment"
                   name="addEquipment"
                   ref={equipmentText}
                   placeholder="Equipment..."
            />

            <button
              name="addEquipment"
              type="button"
              className={styles.addIngredientButton}
              onClick={() => {
                const str = equipmentText.current.value.replace(/\s/g, '')
                if (str === "") {
                  setNoEquipmentText(true)
                  return
                }
                setNoEquipmentText(false)
                setEquipmentList([...equipmentList, equipmentText.current.value])
                equipmentText.current.value = ""
              }}
            >
              Add equipment
            </button>


            <label htmlFor="recipeStep1">Enter the steps of your recipe
              <span className={styles.emptyStepText}>{emptyStep ? " - Please fill in this step first" : ""}</span>
            </label><br/>
            <div className={styles.recipeStepsContainer}>
              {recipeInstructionsListRendered}
            </div>


          </div>

          <div>
            <div className={styles.ingredientsEquipmentContainer}>
              <div>
                <div className={styles.ingredientsList}>
                  {ingredientsListRendered}
                </div>
                <div className={styles.listContainerText}>
                  Ingredients
                </div>
              </div>

              <div>
                <div className={styles.ingredientsList}>
                  {equipmentListRendered}
                </div>
                <div className={styles.listContainerText}>
                  Equipment
                </div>

              </div>

            </div>
            <br/>
            <label htmlFor="prepTime">Preparation time in minutes
            </label>
            <input type="number"
                   className={styles.userInput}
                   id="prepTime"
                   name="prepTime"
                   ref={prepTime}
                   placeholder="Prep Time..."
                   required
            />
            <label htmlFor="cookingTime">Cooking time in minutes
            </label>
            <input type="number"
                   className={styles.userInput}
                   id="cookingTime"
                   name="cookingTime"
                   ref={cookingTime}
                   placeholder="Cooking Time..."
                   required
            />
            <input type="file"
                   className={styles.userInput}
                   placeholder="Upload an image of your recipe"
                   id="inputImage"
                   name="inputImage"
                   onChange={handleImageChange}
                   required
            />

            <input type="button"
                   disabled={!imageUploadable}
                   value={imageUploadable ? "Upload image" :
                     location.pathname.slice(0, 5) === "/edit" ? "Image already uploaded" : "Image Uploaded"}
                   className={imageUploadable ? styles.uploadFileButton : styles.imageUploadedButton}
                   onClick={handleUpload}
            />
            <label htmlFor="shortDescription">Add a piece of equipment
            </label>
            <input type="text"
                   className={styles.userInput}
                   id="shortDescription"
                   name="shortDescription"
                   ref={shortDescription}
                   placeholder="Please enter a short description of your recipe"
                   required
            />

            <input type="submit"
                   className={styles.submitRecipeButton}
                   value="Submit"
            />

          </div>
        </div>
      </form>
    </>

  )
}
export default CreateARecipePage;
