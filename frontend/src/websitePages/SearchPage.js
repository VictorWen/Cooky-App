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

    function displayRecipes(){
            recipeList.current.recipes.map((object,index)=> {
                return <div>{object.data.description}</div>;
            })
    }
    

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
                    SubmitFunction().then(displayRecipes)
                    /*if(recipeList.current?.recipes?.length > 0) {
                        recipeList.current.recipes.map(function(object,index){
                            return <li key={ index }>{object.data.description}</li>;
                        })}*/
                    
                }} className={styles.submitButton} value="Search" />
            </form>
            
            
                
            
        
        </div>

    );

}

export default SearchPage