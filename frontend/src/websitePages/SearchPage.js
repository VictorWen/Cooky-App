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

    function displayResults(){
        console.log(recipeList)
        if ( recipeList.current?.recipes.length !== 0) {
            return (
                <h1>sad</h1>
            )
        }
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
                    SubmitFunction().then(displayResults())
                }} className={styles.submitButton} value="Search" />
            </form>

        
        </div>

    )


  
    {/* const [searchTerm,setSearchTerm] = useState('')
    return (
        <div className = {styles.container}>
            <input type = "text" 
                placeholder = "search" 
                className = {styles.searchFormat}
                onChange = {event => {setSearchTerm(event.target.value)
                }}
            >
            </input>
            {JSONDATA.filter((value) => {
                if(searchTerm =="") {}
                
                else if (value.user_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return value.user_name;
                }

            })
                .map((val,key) => {
                return <div className = {styles.recipeFormat}>
                    Recipe Name: {val.user_name} {'\n'}
                    Recipe Creator: {val.first_name} {val.last_name} {'\n'}
                    Date Created : {val.email}
                </div>
            })}
        </div>
        )*/}
}

export default SearchPage