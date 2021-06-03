import React, {useRef, useEffect} from 'react'
import styles from '../styles/SearchPage.module.css'
import JSONDATA from '../mockData.json'



const SearchPage = () => {

    const searchQuery = useRef()
    const recipeList = useRef({recipes: []})



    async function SubmitFunction(event) {
        //event.preventDefault();
        // event.stopPropagation()
        //event.nativeEvent.stopImmediatePropagation();
        const localhost = "http://localhost:3001/search/recipes/name/"
        const url = localhost.concat(searchQuery.current.value)

        if(url === localhost){
            recipeList.current.recipes = undefined;
            return false;
        }

        
            const response = await fetch(url,
                {method: 'GET',headers: 
                    {'Content-Type': 'application/json'}
                })
            const val = await response.json()
            console.log(val)
            recipeList.current.recipes =val;
        
        return false
    }

   /* function displayRecipes(){
        if(recipeList.current.recipes.length !== 0) {
            if (recipeList.current.recipes.length > 10){
                for (let i = 0; i < 10; ++i){
                    return(
                        <p>Recipe Name: {recipeList.current.recipes[i]} 
                        Recipe Creator: {recipeList.current.recipes[i]}
                        Date Created : {recipeList.current.recipes[i]}</p>
                    );
                }
            }
            else {
                for (let i = 0; i < recipeList.current.recipes.length; ++i){
                    return(
                        <p>Recipe Name: {recipeList.current.recipes[i].data.name} 
                        Recipe ID: {recipeList.current.recipes[i].id}
                        Number of Ratings: {recipeList.current.recipes[i].data.total_ratings}</p>
                    );
                }
            }
        }
        return null;
    }*/

    return (
        
        <div className = {styles.container}>
            <form action=""method = "get">
                <input type = "text" 
                    ref={searchQuery}
                    placeholder = "search" 
                    name = "recipe"
                    className = {styles.searchFormat}
                />
 
            <input type="button" 
                onClick={() => {
                    SubmitFunction()
                }} className={styles.submitButton} value="Search" />
            </form>
            
            {recipeList.current?.recipes?.length > 0 &&
                recipeList.current.recipes.map(function(object,key){
                    return <li key={ key }>{object.data.description}</li>;
                })
            }
                
            
        
        </div>

    );

}

export default SearchPage