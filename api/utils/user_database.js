// User database access
let firebase = require("firebase-admin");
const recipe_database = require("./recipe_database");

const user_properties = ["username", "password", "recipes", "following"]

class UserDataLoader {

    constructor() {
        let firebase_app = firebase.app(); // Get default app

        this.database = firebase_app.firestore();
        this.users = this.database.collection('users');
    }

    filterUserProperties(user_data) {
        // Filters out properties from user_data that are not needed
        // Taken from https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
        let filtered_data = Object.keys(user_data)
            .filter((key) => user_properties.includes(key))
            .reduce(function(obj, key) {
                obj[key] = user_data[key];
                return obj;
            }, {});

        return filtered_data;
    }

    async hasUser(user_id) {
        let users = this.users;
        return await new Promise(function (resolve) {
            users.doc(user_id).get().then(function(snapshot){
                resolve(snapshot.exists);
            });
        });
    }

    async getUser(user_id) {
        let users = this.users;
        return await new Promise(function (resolve) {
            users.doc(user_id).get().then(function(snapshot) {
                resolve(snapshot.data());
            });
        });
    }

    async addUser(user_data) {
        let user = this.filterUserProperties(user_data);
        let new_user = await this.users.add(user);
        return new_user.id;
    }

    async updateUser(user_id, user_data) {
        let filtered_data = this.filterUserProperties(user_data);
        await this.users.doc(user_id).update(filtered_data);
    }

    async deleteUser(user_id) {
        await this.users.doc(user_id).delete();
    }

    async addRecipe(user_id, recipe_id) {
        let updated_user = {
            recipes: firebase.firestore.FieldValue.arrayUnion(recipe_id)
        }
        await this.users.doc(user_id).update(updated_user);
    }
}

module.exports = new UserDataLoader();
