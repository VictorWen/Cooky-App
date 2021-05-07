import React from 'react'
import './navigationBar.css'
import SearchIcon from '@material-ui/icons/Search'
import PeopleIcon from '@material-ui/icons/People'
import MenuItem from '@material-ui/core/MenuItem'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const NavigationBar = () => {
  let location = useLocation()
  console.log(location)
  return (
    <div className="navigationBar">
      <div style={{
        backgroundColor: "/" === location.pathname ? "#04AA6D" : "#333"
      }}>
        <MenuItem component={Link} to={'/'}>Home</MenuItem>
      </div>

      <div style={{
        backgroundColor: "/createRecipe" === location.pathname ? "#04AA6D" : "#333"
      }}>
        <MenuItem component={Link} to={'createRecipe'}>Create a recipe</MenuItem>
      </div>

      <div>
        <MenuItem>Popular Recipes</MenuItem>
      </div>
      <div className="navBarSpace">{/*Filler*/}</div>
      <div>
        <PeopleIcon/>
      </div>
      <div>
        <SearchIcon/>
      </div>
    </div>
  )
}

export default NavigationBar
