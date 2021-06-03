import React from 'react'
import styles from '../styles/NavigationBar.module.css'
import SearchIcon from '@material-ui/icons/Search'
import PeopleIcon from '@material-ui/icons/People'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLocation, useHistory } from 'react-router-dom'


const NavigationBar = () => {
    let location = useLocation()
    const history = useHistory()

    const { currentUser, logout } = useAuth()
    let authdiv
    if (currentUser === null)
    {
      authdiv = <div
      className={location.pathname === "/accountPage" ? styles.activeTab : styles.none}
      onClick={() => {
        history.push('/accountPage')
      }}
    >
      <PeopleIcon/>
    </div>
    }
    else
    {
      authdiv = <div
      className={styles.none}
      onClick={logout}
      >
        Log Out
      </div>
    }
  return (
    <div className={styles.navigationBar}>
      <div
        className={location.pathname === "/" ? styles.activeTab : styles.none}
        onClick={() => {
          history.push('/')
        }}
      >
        Home
      </div>
      {currentUser === null ? "" :
        <>
          <div
            className={location.pathname === "/createRecipe" ? styles.activeTab : styles.none}
            onClick={() => {
              history.push('/createRecipe')
            }}
          >
            Create a Recipe
          </div>
          <div
            className={location.pathname === "/yourRecipes" ? styles.activeTab : styles.none}
            onClick={() => {
              history.push('/yourRecipes')
            }}
          >
            Your Recipes
          </div>
        </>
      }
      <div
        className={location.pathname === "/popularRecipes" ? styles.activeTab : styles.none}
        onClick={() => {
          history.push('/popularRecipes')
        }}
      >
        Popular Recipes
      </div>
      <div className={styles.navBarSpace}>{/*Filler*/}</div>
      {authdiv}
      <div
        className={location.pathname === "/searchPage" ? styles.activeTab : styles.none}
        onClick={() => {
          history.push('/searchPage')
        }}
      >
        <SearchIcon/>
      </div>
    </div>
  )
}

export default NavigationBar
