let express = require('express')
let recipe_data = require('../utils/recipe_database');
let router = express.Router()

router.get('/recipes/popular', async function(req, res) {
    res.json(await recipe_data.getPopularRecipes());
});

// POST http://localhost:3001/search/recipes/ingredients/name=Carrots
router.get('/recipes/ingredients', async function(req, res) {
    let name = req.query.name;
    if (await recipe_data.hasIngredient(name)) {
        let matching_recipes = await recipe_data.searchIngredient(name);
        res.json(matching_recipes);
    }
    else{
        res.status(404).send("No recipes match ingredient");
    }
});

module.exports = router;