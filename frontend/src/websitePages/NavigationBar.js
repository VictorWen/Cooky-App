import React from 'react'
import './navigationBar.css'
import SearchIcon from '@material-ui/icons/Search'
import PeopleIcon from '@material-ui/icons/People'
import { NavLink } from 'react-router-dom'
import { useLocation, useHistory } from 'react-router-dom'


const NavigationBar = () => {
  let location = useLocation()
  let history = useHistory()
  console.log(location)
  return (
    <div className="navigationBar">
      <div className={location.pathname === "/" ? "activeTab" : ""}
           onClick={() => {
             history.push('/')
           }}
      >
        Home
      </div>

      <div
        className={location.pathname === "/createRecipe" ? "activeTab" : ""}
        onClick={() => {
          history.push('/createRecipe')
        }}
      >
        Create a Recipe
      </div>

      <div
        className={location.pathname === "/popularRecipes" ? "activeTab" : ""}
        onClick={() => {
          history.push('/popularRecipes')
        }}
      >
        Popular Recipes
      </div>
      <div className="navBarSpace">{/*Filler*/}</div>
      <div
        className={location.pathname === "/createAnAccount" ? "activeTab" : ""}
        onClick={() => {
          history.push('/createAnAccount')
        }}
      >
        <PeopleIcon/>
      </div>
      <div>
        <SearchIcon/>
      </div>
    </div>
  )
}

export default NavigationBar
