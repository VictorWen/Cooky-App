import React, {useState} from 'react'
import styles from '../styles/SearchPage.module.css'
import JSONDATA from '../mockData.json'



const SearchPage = () => {
    const [userInput, setUserInput] = useState('')


    async function submitValue () {
        //URLs for fetching
        const searchName = "localhost:3001/search/recipes/name/"
        const searchIngredient = "localhost:3001/search/recipes/ingredient/"
        const searchPopular = "localhost:3001/search/recipes/popular/"

        console.log(userInput)
        //trying to fetch the data from firebase and then display it
        const url = searchName.concat(userInput)

        console.log(url)
        const response = await fetch(url,
            {method: 'PUT', headers: 
            {'Content-Type': 'application/json'}
        })

        const val = await response.json()
        console.log(val)
    }
    return (
        
        <div className = {styles.container}>
            <input type = "text" 
                placeholder = "search" 
                name = "recipe"
                onChange = {event => {setUserInput(event.target.value)}}
                className = {styles.searchFormat}
            />
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