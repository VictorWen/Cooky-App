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

      <div style={{
        backgroundColor: "/" === location.pathname ? "#04AA6D" : "#333",
      }}
           onClick = {() => {
             history.push('/')
           }}
      >
        Home
      </div>

      <div style={{
        backgroundColor: "/createRecipe" === location.pathname ? "#04AA6D" : "#333"
      }}
           onClick = {() => {
             history.push('/createRecipe')
           }}
      >
          Create a Recipe
      </div>

      <div style={{
        backgroundColor: "/popularRecipes" === location.pathname ? "#04AA6D" : "#333"
      }}
           onClick = {() => {
             history.push('/popularRecipes')
           }}
      >
          Popular Recipes
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
