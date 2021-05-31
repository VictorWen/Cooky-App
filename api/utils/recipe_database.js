let firebase = require("firebase-admin");
let user_data = require("../utils/user_database");

const key_path = "../cs-35l-cooking-app-firebase-adminsdk-pfw6m-00878e5a37.json";
const db_url = "https://cs-35l-cooking-app-default-rtdb.firebaseio.com";

const recipe_properties = ['name', 'description', 'ingredients', 'steps', 'cooktime', 'preptime', 'servings', 'equipment', 'images', 'author', 'n_ratings', 'total_rating']

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

    filterRecipeProperties(recipe_data) {
    async getPopularRecipes() {
        let recipes = this.recipes;
        return await new Promise(function(resolve) {
            recipes.orderBy("n_ratings", "desc").get().then(function(snapshot) {
                resolve(snapshot.docs.map(doc => {
                    let data = doc.data();
                    return (data.total_rating / data.n_ratings) >= 4 ? data : undefined
                }).filter(data => data != undefined));
            });
        });
    }

    #filterRecipeProperties(recipe_data) {
>>>>>>> c00600d6bc4a961e18db4c892a42f91d293f0c22
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
        let filtered_recipe = this.filterRecipeProperties(recipe_data);
        let new_recipe = await this.recipes.add(filtered_recipe);
        return new_recipe.id;
    }

    async updateRecipe(recipe_id, recipe_data) {
        let filtered_recipe = this.filterRecipeProperties(recipe_data);
        await this.recipes.doc(recipe_id).update(filtered_recipe);
    }

    async deleteRecipe(recipe_id) {
        await this.recipes.doc(recipe_id).delete();
    }

    async addRating(recipe_id, user_id, rating) {
        // Update recipe's average rating
        let updated_recipe_fields = {
            total_rating: firebase.firestore.FieldValue.increment(rating),
            n_ratings: firebase.firestore.FieldValue.increment(1)
        }
        await this.recipes.doc(recipe_id).update(updated_recipe_fields);

        // Update user's list of ratings
        let new_rating = {}
        new_rating['ratings.' + recipe_id] = rating
        await user_data.users.doc(user_id).update(new_rating);
    }
}

module.exports = new RecipeDataLoader();
