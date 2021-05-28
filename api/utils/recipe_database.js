let firebase = require("firebase-admin");
let user_data = require("../utils/user_database");

const key_path = "../cs-35l-cooking-app-firebase-adminsdk-pfw6m-00878e5a37.json";
const db_url = "https://cs-35l-cooking-app-default-rtdb.firebaseio.com";

const recipe_properties = ['name', 'description', 'ingredients', 'steps', "cooktime", "preptime", "servings", "equipment", "images"]

class RecipeDataLoader {

    constructor() {
        let firebase_app = firebase.app(); // Get default app

        this.database = firebase_app.firestore();
        this.recipes = this.database.collection('recipes');
    }

    async getRecipe(recipe_id) {
        let recipes = this.recipes;
        return await new Promise(function (resolve) {
            recipes.doc(recipe_id).get().then(function(snapshot) {
                resolve(snapshot.data());
            });
        });
    }

    async hasRecipe(recipe_id) {
        let recipes = this.recipes;
        return await new Promise(function (resolve) {
            recipes.doc(recipe_id).get().then(function(snapshot){
                resolve(snapshot.exists);
            });
        });
    }

    // recipes have additional "ingredients_list" field that strictly contains the names of all ingredients
    async searchIngredient(target_ingredient) {
        let recipes = this.recipes;
        return await new Promise(function (resolve) {
            recipes.where("ingredients_list", "array-contains", target_ingredient).get().then(function(snapshot) {
                resolve(snapshot.docs.map(doc => doc.data()));
            });
        });
    }

    async hasIngredient(target_ingredient) {
        let recipes = this.recipes;
        return await new Promise(function (resolve) {
            recipes.where("ingredients_list", "array-contains", target_ingredient).get().then(function(snapshot) {
                resolve(!snapshot.empty);
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
        let new_recipe = await this.recipes.add(filtered_recipe);
        return new_recipe.id;
    }

    async updateRecipe(recipe_id, recipe_data) {
        let filtered_recipe = this.#filterRecipeProperties(recipe_data);
        await this.recipes.doc(recipe_id).update(filtered_recipe);
    }

    async deleteRecipe(recipe_id) {
        await this.recipes.doc(recipe_id).delete();
    }

    async addRating(recipe_id, user_id, rating) {
        // Update recipe's average rating
        let recipe = await this.getRecipe(recipe_id)

        if (isNaN(recipe.rating))
            recipe.rating = 0;
        if (isNaN(recipe.n_ratings))
            recipe.n_ratings = 0;

        let old_sum = recipe.rating * recipe.n_ratings;
        let new_sum = old_sum + rating
        let n_ratings = recipe.n_ratings + 1;
        let updated_recipe_fields = {
            rating: new_sum / n_ratings,
            n_ratings: n_ratings
        }
        await this.recipes.doc(recipe_id).update(updated_recipe_fields);
        
        // Update user's list of ratings
        //let user = await user_data.getUser(user_id);
        let new_rating = {}
        new_rating['ratings.' + recipe_id] = rating     
        await user_data.users.doc(user_id).update(new_rating);
    }
}

module.exports = new RecipeDataLoader();