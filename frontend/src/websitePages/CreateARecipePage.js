import React, { useState, useEffect } from "react";
import './CreateARecipePage.css'
import CancelIcon from '@material-ui/icons/Cancel';

const CreateARecipePage = () => {
  const [title, setTitle] = useState("")
  const [ingredientText, setIngredientText] = useState("")
  const [ingredientsList, setIngredientsList] = useState([])
  const [ingredientsListRendered, setIngredientsListRendered] = useState([])
  const [noIngredients, setNoIngredients] = useState(false)
  const [cookingTime, setCookingTime] = useState("")
  useEffect(() => {
    const ingredientsListRendered = ingredientsList.map((item, index) => (
      <div key={index}>
        <CancelIcon className="removeIngredientButton"
                    onClick={() => {
                      const arrayCopy = [...ingredientsList]
                      arrayCopy.splice(index, 1)
                      setIngredientsList(arrayCopy)
                    }}/>
        {item}
      </div>
    ))
    setIngredientsListRendered(ingredientsListRendered)
  }, [ingredientsList])
  console.log(ingredientsListRendered)
  return (
    <>
      <div className="container">
        <div>
          <form>
            <label htmlFor="recipeTitle">Recipe Title:</label><br/>
            <input type="text"
                   id="recipeTitle"
                   name="recipeTitle"
                   value={title}
                   onChange={(event) => {
                     setTitle(event.target.value)
                   }}
                   placeholder="Recipe Title..."
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
                if(ingredientText === "") {
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
            />

          </form>
        </div>

        <div>
          <div className="ingredientsList">
            {ingredientsListRendered}
          </div>

        </div>
      </div>
    </>

  )
}
export default CreateARecipePage;
