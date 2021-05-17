import React, { useState, useEffect } from "react";
import './CreateARecipePage.css'
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import { Remove } from "@material-ui/icons";

const CreateARecipePage = () => {
  const [title, setTitle] = useState("")
  const [ingredientText, setIngredientText] = useState("")
  const [ingredientsList, setIngredientsList] = useState([])
  const [ingredientsListRendered, setIngredientsListRendered] = useState([])
  const [noIngredients, setNoIngredients] = useState(false)
  const [emptyStep, setEmptyStep] = useState(false)
  const [cookingTime, setCookingTime] = useState("")
  const [recipeInstructionsList, setRecipeInstructionsList] = useState([""])
  const [recipeInstructionsListRendered, setRecipeInstructionsListRendered] = useState([])
  useEffect(() => {
    const ingredientsListRendered = ingredientsList.map((item, index) => (
      <div key={index}>
        <Tooltip title="Remove ingredient">
          <CancelIcon className="removeIngredientButton"
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
    const recipeInstructionsListRendered = recipeInstructionsList.map((item, index) => (
      <div className="recipeInstructionsContainer"
           key={index}
      >

            <Tooltip title="Add a step">
            <AddCircleIcon className="addStepButton"
                           onClick={() => {
                             const arrayCopy = [...recipeInstructionsList]
                             arrayCopy.splice(index + 1, 0, "")
                             setRecipeInstructionsList(arrayCopy)
                           }}
            />
            </Tooltip>
        <Tooltip title="Remove step">
          <RemoveCircleRoundedIcon className="removeStepButton"
                                   onClick={() => {
                                     if (recipeInstructionsList.length === 1) return
                                     const arrayCopy = [...recipeInstructionsList]
                                     arrayCopy.splice(index, 1)
                                     setRecipeInstructionsList(arrayCopy)
                                   }}
          />
        </Tooltip>
        <textarea
          className="recipeInstructions"
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

  console.log(ingredientsListRendered)
  return (
    <>
      <form>

      <div className="container">
        <div>
            <label htmlFor="recipeTitle">Recipe Title:</label><br/>
            <input type="text"
                   id="recipeTitle"
                   name="recipeTitle"
                   value={title}
                   onChange={(event) => {
                     setTitle(event.target.value)
                   }}
                   placeholder="Recipe Title..."
                   required
            /> <br/>
            <label htmlFor="addAnIngredient">Add an ingredient
              <span className="noIngredientsText">{noIngredients ? " - Please enter an ingredient" : ""}</span>
            </label><br/>
            <input type="text"
                   id="addAnIngredient"
                   name="addAnIngredient"
                   value={ingredientText}
                   onChange={(event) => {
                     setIngredientText(event.target.value)
                   }}
                   placeholder="Ingredient Name..."
            />


            <button
              name="AddIngredient"
              type="button"
              className="addIngredientButton"
              onClick={() => {
                if (ingredientText === "") {
                  setNoIngredients(true)
                  return
                }
                setNoIngredients(false)
                setIngredientsList([...ingredientsList, ingredientText])
                setIngredientText("")
              }}
            >
              Add Ingredient
            </button>

            <label htmlFor="cookingTime">Cooking time in minutes
            </label><br/>
            <input type="number"
                   id="cookingTime"
                   name="cookingTime"
                   value={cookingTime}
                   onChange={(event) => {
                     setCookingTime(event.target.value)
                   }}
                   placeholder="Cooking Time..."
                   required
            />
              <label htmlFor="recipeStep1">Enter the steps of your recipe
                <span className="emptyStepText">{emptyStep ? " - Please fill in this step first" : ""}</span>
              </label><br/>
            <div className="recipeStepsContainer">
              {recipeInstructionsListRendered}
            </div>




        </div>

        <div>
          <div>
            <h1 className="ingredientsLabel">Ingredients</h1>
          </div>
          <div className="ingredientsList">
            {ingredientsListRendered}
          </div>
          <input type="file"
                 placeholder="Upload an image of your recipe"
                 id="inputImage"
                 name="inputImage"
          />
          <input type="button"
                 value="Upload image"
                 className="uploadFileButton"/>
          <input type="submit"
                 className="submitRecipeButton"
                 value="Submit"
          />

        </div>
      </div>
      </form>
    </>

  )
}
export default CreateARecipePage;
