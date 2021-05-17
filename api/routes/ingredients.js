let express = require('express')
let recipe_data = require('../utils/recipe_database');
let router = express.Router()

// Access recipe from the database
router.get('/:id', async function(req, res){
    let id = req.params.id;
    console.log(id);
    if (await recipe_data.hasIngredient(id)) {
        let matching_recipes = await recipe_data.searchIngredient(id);
        res.json(matching_recipes);
    }
    else{
        res.status(404).send("No recipes match ingredient");
    }
});

module.exports = router;
