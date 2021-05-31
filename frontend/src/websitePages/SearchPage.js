import React, {useState} from 'react'
import styles from '../styles/SearchPage.module.css'
import JSONDATA from '../mockData.json'
//import SearchBar from '../searchBar.js'

const SearchPage = () => {
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
                    return value;
                }
                else if (value.first_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return value;
                }

            })
                .map((val,key) => {
                return <div className = {styles.recipe}> {val.first_name}</div>
            })}


        </div>
      )
}

export default SearchPage