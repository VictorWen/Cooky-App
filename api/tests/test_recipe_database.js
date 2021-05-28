const recipe_database = require("../utils/recipe_database");

let test_recipe_database = new Promise(async function(resolve, reject) {
    let test_recipe = {
        name: "Testing Recipe",
        description: "Testing Recipe Placeholder description",
        ingredients: [
            {name: "milk", amount: 1, unit: "cup"},
            {name: "sugar", amount: 2, unit: "spoons"}
        ],
        steps: [
            "Step Number One", "Step #2", "3rd Step"
        ],
        fakefield: "This field should not be added to the database",
        cooktime: 5,
        preptime: 15,
        servings: 3,
        equipment: [
            "Cup", "Spoon", "Microwave"
        ],
        images: [
            "data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7"
        ],
    };

    // Test Adding Recipe
    let key = await recipe_database.addRecipe(test_recipe);
    if (await recipe_database.hasRecipe(key))
        console.log("Test Add Recipe Passed: " + key);
    else
        reject("Test Add Recipe Failed");

    
    // Test Getting Recipe
    let recipe_data = await recipe_database.getRecipe(key);
    if ('fakefield' in recipe_data)
        reject("Fake field found in datbase");
    
    // Compare properties
    if (recipe_data.name != test_recipe.name)
        reject("Wrong name property!");
    if (recipe_data.description != test_recipe.description)
        reject("Wrong description property!");
    if (recipe_data.ingredients.length != test_recipe.ingredients.length)
        reject("Wrong ingredients property!");
    if (recipe_data.steps.length != test_recipe.steps.length)
        reject("Wrong stepts property!");
    if (recipe_data.cooktime != test_recipe.cooktime)
        reject("Wrong cooktime property!");
    if (recipe_data.preptime != test_recipe.preptime)
        reject("Wrong preptime property!");
    if (recipe_data.servings != test_recipe.servings)
        reject("Wrong servings property!");
    if (recipe_data.equipment.length != test_recipe.equipment.length)
        reject("Wrong equipment property!");
    if (recipe_data.images[0] != test_recipe.images[0])
        reject("Wrong images property!");
    console.log("Test Get Recipe Passed")

    // Test delete recipe
    await recipe_database.deleteRecipe(key);
    if (await recipe_database.hasRecipe(key))
        reject("Test Delete Recipe Failed")
    else
        console.log("Test Delete Recipe Passed")
    
    resolve()
})
.then(() => console.log("TEST RECIPE DATABASE PASSED!"))
.catch(failure => {
    console.log("TEST RECIPE DATABSE: " + failure)
});