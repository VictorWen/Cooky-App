const recipe_database = require("../utils/recipe_database");

let test_add_recipe = new Promise(async function(resolve, reject) {
    let test_recipe = {
        name: "Warm Milk",
        description: "The warmest of milks",
        ingredients: [
            {name: "milk", amount: 1, unit: "cup"},
            {name: "sugar", amount: 2, unit: "spoons"}
        ]
    };

    let key = await recipe_database.addRecipe(test_recipe);
    if (recipe_database.hasRecipe(key))
        resolve(key);
    else
        reject("Key not in database");
})
.then(passed => console.log("Test Add Recipe Passed: " + passed))
.catch(failed => console.log("Test Add Recipe Failed: " + failed));