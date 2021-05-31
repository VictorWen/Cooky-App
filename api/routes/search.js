let express = require('express')
let recipe_data = require('../utils/recipe_database');
let router = express.Router()

router.get('/recipes/popular', async function(req, res) {
    res.json(await recipe_data.getPopularRecipes());
});

// GET http://localhost:3001/search/recipes/ingredients/name=Carrots
router.get('/recipes/ingredients', async function(req, res) {
    let name = req.query.name;
    let matching_recipes = await recipe_data.searchIngredient(name);
    res.json(matching_recipes);
});

module.exports = router;