import React from 'react'
import HomePage from './websitePages/HomePage'
import NavigationBar from './websitePages/NavigationBar'
import PopularRecipesPage from './websitePages/PopularRecipePage'
import CreateAccountPage from './websitePages/CreateAccountPage'
import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";
import CreateARecipePage from "./websitePages/CreateARecipePage";
import { AuthProvider } from './contexts/AuthContext'




function App() {
  return (
    <AuthProvider>
      <div className="page">
          <NavigationBar />
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/createRecipe">
              <CreateARecipePage />
            </Route>
            <Route path="/popularRecipes">
              <PopularRecipesPage />
            </Route>
            <Route path="/createAnAccount">
              <CreateAccountPage />
            </Route>
            <Route path="/login">
              
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </AuthProvider>
  )
}

export default App;
