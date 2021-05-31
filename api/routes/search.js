let express = require('express')
let recipe_data = require('../utils/recipe_database');
let router = express.Router()

router.get('/recipes/popular', async function(req, res) {
    res.json(await recipe_data.getPopularRecipes());
});

router.get('/recipes/name/:name', async function(req, res) {
    let name = req.params.name;
    res.json(await recipe_data.searchByName(name));
});

// GET http://localhost:3001/search/recipes/ingredients/name=Carrots
router.get('/recipes/ingredients/:name', async function(req, res) {
    let name = req.params.name;
    let matching_recipes = await recipe_data.searchByIngredients(name);
    res.json(matching_recipes);
});

module.exports = router;