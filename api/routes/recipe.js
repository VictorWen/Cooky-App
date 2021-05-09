let express = require('express')
let recipe_data = require('../utils/recipe_database');
let router = express.Router()

// This module only get and sends recipe data to the frontend
// It should not be used to process or validate recipe data

// Access recipe from the database
router.get('/:id', async function(req, res){
    id = req.params.id;
    if (await recipe_data.hasRecipe(id)) {
        let recipe = await recipe_data.getRecipe(id);
        res.json(recipe);
    }
    else{
        res.status(404).send("Recipe not found");
    }
});

// Update recipe in the database
router.post('/:id', async function(req, res){
    let recipe = req.body;
    console.log(recipe);
    await recipe_data.updateRecipe(recipe);
    res.end();
});

module.exports = router