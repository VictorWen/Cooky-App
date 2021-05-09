firebase = require("firebase-admin");

const key_path = "../cs-35l-cooking-app-firebase-adminsdk-pfw6m-00878e5a37.json";
const db_url = "https://cs-35l-cooking-app-default-rtdb.firebaseio.com";

class RecipeDataLoader {

    constructor(key_path, db_url) {
        let serviceAccount = require(key_path);

        let firebase_app = firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount),
            databaseURL: db_url
        });

        this.database = firebase_app.database();
        this.recipe_ids = this.database.ref("recipe-ids");
        this.recipes = this.database.ref('recipes');
    }

    async getRecipe(recipe_id) {
        let recipes = this.recipes;
        return await new Promise(function (resolve, reject){
            recipes.child(recipe_id).get().then(function(snapshot) {
                resolve(snapshot.val());
            });
        });
    }

    async hasRecipe(recipe_id) {
        let recipe_ids = this.recipe_ids;
        return await new Promise(function (resolve) {
            recipe_ids.get().then(function(snapshot) {
                resolve(snapshot.val().includes(recipe_id));
            });
        });
    }

    async updateRecipe(recipe_data) {
        await this.recipes.update(recipe_data);
    }
}

module.exports = new RecipeDataLoader(key_path, db_url);