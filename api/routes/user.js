// Get User info from id
let express = require('express')
let user_data = require('../utils/user_database');
let recipe_database = require('../utils/recipe_database')
let router = express.Router()

// Access user from the database
router.get('/:id', async function(req, res){
    let id = req.params.id;
    console.log(id);
    if (await user_data.hasUser(id)) {
        let user = await user_data.getUser(id);
        res.json(user);
    }
    else{
        res.status(404).send("User not found");
    }
});

//Update user in the database
router.post('/:id', async function(req, res){
    let id = req.params.id;
    let user = req.body;
    await user_data.updateUser(id, user);
    res.json(await user_data.getUser(id));
});

router.get('/:id/recipes', async function(req, res) {
    let id = req.params.id;
    if (await user_data.hasUser(id)) {
        let matching_recipes = await recipe_database.getUserRecipes(id);
        matching_recipes.splice(30); 
        res.json(matching_recipes);
    }
    else
        res.status(404).send("User not found");
})

router.put('/:id/recipes', async function(req, res) {
    let id = req.params.id;
    let recipe_data = req.body;
    if (await user_data.hasUser(id)) {
        res.send(await recipe_database.addUserRecipe(id, recipe_data));
    }
    else
        res.status(404).send("User not found");
});

// Copy recipe
router.put('/:id/copy/:recipe_id', async function(req, res) {
    let id = req.params.id;
    let recipe_id = req.params.recipe_id;
    if (await user_data.hasUser(id)){
        let recipe = await recipe_database.getRecipe(recipe_id);
        res.send(await recipe_database.addUserRecipe(id, recipe));
    }
    else
        res.status(404).send("User not found");
});

module.exports = router