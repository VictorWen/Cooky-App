import React from 'react'
import HomePage from './websitePages/HomePage'
import NavigationBar from './websitePages/NavigationBar'
import PopularRecipesPage from './websitePages/PopularRecipePage'
import CreateAccountPage from './websitePages/CreateAccountPage'
import SearchPage from './websitePages/SearchPage'
import YourRecipesPage from './websitePages/YourRecipesPage'
import UserDetails from './websitePages/UserDetails'
import LoginPage from './websitePages/LoginPage'
import ResetPasswordPage from './websitePages/ResetPasswordPage'
import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";
import CreateARecipePage from "./websitePages/CreateARecipePage";
import { useAuth } from './contexts/AuthContext'


function App() {
  let renderItem;
  const { currentUser } = useAuth()
  if (currentUser === null) {
    return (
      <div className="page">
        <NavigationBar/>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/popularRecipes">
            <PopularRecipesPage/>
          </Route>
          <Route path="/accountPage">
            <CreateAccountPage/>
          </Route>
          <Route path="/searchPage">
            <SearchPage/>
          </Route>
          <Route path="/login">
            <LoginPage/>
          </Route>
          <Route path="/resetPassword">
            <ResetPasswordPage/>
          </Route>
          <Route path="/">
            <HomePage/>
          </Route>
        </Switch>
      </div>
    )
  } else {
    return (
      <div className="page">
        <NavigationBar/>
        <Switch>
          <Route path="/createRecipe">
            <CreateARecipePage/>
          </Route>
          <Route path="/popularRecipes">
            <PopularRecipesPage/>
          </Route>
          <Route path="/yourRecipes">
            <YourRecipesPage/>
          </Route>
          <Route path="/accountPage">
            <UserDetails/>
          </Route>
          <Route path="/resetPassword">
            <ResetPasswordPage/>
          </Route>
          <Route path="/searchPage">
            <SearchPage/>
          </Route>
          <Route path="/">
            <HomePage/>
          </Route>
        </Switch>
      </div>
    )
  }
}

export default App;
