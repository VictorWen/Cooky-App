let express = require('express')
let recipe_data = require('../utils/recipe_database');
let router = express.Router()

router.put('/', async function(req, res) {
    let recipe = req.body;
    let key = await recipe_data.addRecipe(recipe);
    res.send(key);
});

module.exports = router;