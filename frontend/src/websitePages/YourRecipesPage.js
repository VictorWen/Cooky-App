import React, {useState} from 'react'
import styles from '../styles/YourRecipesPage.module.css'
import JSONDATA from '../mockData.json'

const YourRecipesPage = () => {
    const [searchTerm,setSearchTerm] = useState('')
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
                if(searchTerm =="") {
                    return value.user_name;
                }
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
    )
  }
  
  export default YourRecipesPage