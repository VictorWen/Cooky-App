const user_database = require("../utils/user_database");
const recipe_database = require("../utils/recipe_database");

const N_RATINGS = 23;
const EPLISON = 0.0001;


function get_random_rating() {
    return Math.floor(Math.random() * 5) + 1;
}

let test_ratings = new Promise(async function(resolve, reject) {
    let temp_recipe = {
        name: "TEMPORARY RATINGS TEST RECIPE",
        description: "THIS RECIPE SHOULD NOT BE IN THE DATABASE"
    };
    let temp_user = {
        username: "TempTestSubject",
        password: "notA_goodPassword"
    }

    let recipe_key = await recipe_database.addRecipe(temp_recipe);
    
    let sum = 0;
    let users = []
    let ratings = []
    let rating_promises = []

    for (let i = 0; i < N_RATINGS; i++) {
        let user_key = await user_database.addUser(temp_user);
        let random_rating = get_random_rating();
        
        users.push(user_key);
        ratings.push(random_rating);
        sum += random_rating;
        
        rating_promises.push(new Promise (async function (resolve) {
            await recipe_database.addRating(recipe_key, user_key, random_rating)
            resolve();
        }));
    }
    // Pipeline addRating
    await Promise.all(rating_promises);

    let recipe = await recipe_database.getRecipe(recipe_key);
    if (recipe.n_ratings != N_RATINGS)
        reject("Wrong number of ratings (" + recipe.n_ratings +" / " + N_RATINGS + ")");
    if (recipe.total_rating != sum)
        reject("Wrong total rating (" + recipe.total_rating + " / " + sum + ")");
    
    for (i = 0; i < N_RATINGS; i++) {
        let user = await user_database.getUser(users[i]);
        if (user.ratings[recipe_key] != ratings[i])
            reject("Wrong rating value, user (" + users[i] + " " + JSON.stringify(user.ratings) + " / " + ratings[i] + ")");
    }
    resolve({recipe_key: recipe_key, users: users});
})
.then(async function(value) {
    // Cleanup
    recipe_database.deleteRecipe(value.recipe_key);
    for (i = 0; i < N_RATINGS; i++){
        user_database.deleteUser(value.users[i]);
    }

    console.log("TEST RATINGS PASSED!");
})
.catch(failure => {console.log("TEST RATING FAILUE: " + failure)});