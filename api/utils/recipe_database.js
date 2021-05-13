firebase = require("firebase-admin");

const key_path = "../cs-35l-cooking-app-firebase-adminsdk-pfw6m-00878e5a37.json";
const db_url = "https://cs-35l-cooking-app-default-rtdb.firebaseio.com";

const recipe_properties = ['name', 'description', 'ingredients', 'steps']

class RecipeDataLoader {

    constructor(key_path, db_url) {
        let serviceAccount = require(key_path);

        let firebase_app = firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount),
            databaseURL: db_url
        });

        this.database = firebase_app.database();
        this.recipes = this.database.ref('recipes');
    }

    async getRecipe(recipe_id) {
        let recipes = this.recipes;
        return await new Promise(function (resolve) {
            recipes.child(recipe_id).get().then(function(snapshot) {
                resolve(snapshot.val());
            });
        });
    }

    async hasRecipe(recipe_id) {
        let recipes = this.recipes;
        return await new Promise(function (resolve) {
            recipes.child(recipe_id).get().then(function(snapshot) {
                resolve(snapshot.exists());
            });
        });
    }

    #filterRecipeProperties(recipe_data) {
        // Filters out properties from recipe_data that are not needed
        // Taken from https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
        let filtered_recipe = Object.keys(recipe_data)
            .filter((key) => recipe_properties.includes(key))
            .reduce(function(obj, key) {
                obj[key] = recipe_data[key];
                return obj;
            }, {});

        return filtered_recipe;
    }

    async addRecipe(recipe_data){
        let filtered_recipe = this.#filterRecipeProperties(recipe_data);
        let new_recipe = await this.recipes.push(filtered_recipe);
        return new_recipe.key;
    }

    async updateRecipe(recipe_id, recipe_data) {
        let filtered_recipe = this.#filterRecipeProperties(recipe_data);
        await this.recipes.child(recipe_id).update(filtered_recipe);
    }
}

module.exports = new RecipeDataLoader(key_path, db_url);