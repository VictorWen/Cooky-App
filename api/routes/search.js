let express = require('express')
let recipe_data = require('../utils/recipe_database');
let router = express.Router()

router.get('/recipes/popular', async function(req, res) {
    res.json(await recipe_data.getPopularRecipes());
});

router.get('/recipes/ingredients', async function(req, res) {
    console.log(req.query.name)
    res.end()
});

module.exports = router;