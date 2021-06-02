import React, {useState} from 'react'
import styles from '../styles/SearchPage.module.css'
import JSONDATA from '../mockData.json'



const SearchPage = () => {

    async function submitValue (data) {
        const localhost = "https://localhost:3000/search/recipes/name/"
        const url = localhost.concat(data)
        const response = await fetch(url)
        const val = await response.json()
    }
    return (
        
        <div className = {styles.container}>
            <form action=""method = "get">
                <input type = "text" 
                    placeholder = "search" 
                    name = "recipe"
                    className = {styles.searchFormat}
                />
 
                <button type = "submit" className={styles.submitButton}>Search</button>
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