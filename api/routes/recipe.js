let express = require('express')
let router = express.Router()

class Recipe {
    constructor(name){
        this.name = name;
    }
}

let testRecipe1 = new Recipe("testRecipe1");
let testRecipe2 = new Recipe("testRecipe2");

recipe_dict = {
    "recipe1": testRecipe1,
    "recipe2": testRecipe2
}

router.get('/:id', function(req, res){
    if (req.params.id in recipe_dict) {
        res.send(recipe_dict[req.params.id].name);
    }
    else{
        res.send("Recipe not found");
    }
})

module.exports = router