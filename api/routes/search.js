let express = require('express')
let recipe_data = require('../utils/recipe_database');
let router = express.Router()

router.get('/recipes/popular', async function(req, res) {
    let matching_recipes = await recipe_data.getPopularRecipes(); 
    matching_recipes.splice(10);
    res.json(matching_recipes);
});

router.get('/recipes/name/:name', async function(req, res) {
    let name = req.params.name;
    let matching_recipes = await recipe_data.searchByName(name);
    matching_recipes.splice(10);
    res.json(matching_recipes);
});

// GET http://localhost:3001/search/recipes/ingredients/Carrots
router.get('/recipes/ingredients/:name', async function(req, res) {
    let name = req.params.name;
    let matching_recipes = await recipe_data.searchByIngredients(name);
    matching_recipes.splice(10);
    res.json(matching_recipes);
});

module.exports = router;