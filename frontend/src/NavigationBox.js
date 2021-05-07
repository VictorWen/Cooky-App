import React from 'react'
import './navigationBar.css'
import SearchIcon from '@material-ui/icons/Search'
import PeopleIcon from '@material-ui/icons/People'


const NavigationBox = () => {
  return (
    <div className="navigationBar">li
      <div className="home">
        <a href>Home</a>
      </div>

      <div>
        <a href>Popular Recipes</a>
      </div>

      <div>
        <a href>Vegetarian</a>
      </div>
      <div className="navBarSpace">{/*Filler*/}</div>
      <div>
        <PeopleIcon />
      </div>
      <div>
        <SearchIcon />
      </div>
    </div>
  )
}

export default NavigationBox
