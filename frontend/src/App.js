import React from 'react'
import RecipePage from './RecipePage'
import HomePage from './HomePage'
import NavigationBar from './NavigationBar'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";




function App() {
  return (
    <div className="page">
      <Router>
        <div>
          <NavigationBar />
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/createRecipe">
              <RecipePage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>

  )
}

export default App;
