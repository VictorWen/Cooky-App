let express = require('express')
let recipe_data = require('../utils/recipe_database');
let router = express.Router()

router.get('/:id', async function(req, res){
    id = req.params.id;
    if (await recipe_data.hasRecipe(id)) {
        let recipe = await recipe_data.getRecipe(id);
        console.log("test" + recipe.name);
        res.send(JSON.stringify(recipe));
    }
    else{
        res.send("Recipe not found");
    }
})

module.exports = router