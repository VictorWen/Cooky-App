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
        res.json(await recipe_database.getUserRecipes(id));
    }
    else
        res.status(404).send("User not found");
})

router.put('/:id/recipes', async function(req, res) {
    let id = req.params.id;
    let recipe_data = req.body;
    if (await user_data.hasUser(id)) {
        recipe_data['author'] = id;
        let recipe_id = await recipe_database.addRecipe(recipe_data);
        await user_data.addRecipe(id, recipe_id);
        res.send(recipe_id);
    }
    else
        res.status(404).send("User not found");
});

module.exports = router