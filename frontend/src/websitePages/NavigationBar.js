import React from 'react'
import './navigationBar.css'
import SearchIcon from '@material-ui/icons/Search'
import PeopleIcon from '@material-ui/icons/People'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const NavigationBar = () => {
  let location = useLocation()
  console.log(location)
  return (
    <div className="navigationBar">
      <div style={{
        backgroundColor: "/" === location.pathname ? "#04AA6D" : "#333",

      }}>
        <NavLink
          to={'/'}
        >
        Home
        </NavLink>
      </div>


      <div div style={{
        backgroundColor: "/createRecipe" === location.pathname ? "#04AA6D" : "#333"
      }}>
        <NavLink to={'/createRecipe'}>
          Create a Recipe
        </NavLink>

      </div>

      <div style={{
        backgroundColor: "/popularRecipes" === location.pathname ? "#04AA6D" : "#333"
      }}>
        <NavLink to={'/popularRecipes'}>
          Popular Recipes
        </NavLink>
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
