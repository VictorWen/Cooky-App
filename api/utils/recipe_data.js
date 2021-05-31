const fs = require('fs')

class RecipeDataLoader {
    constructor(path) {
        this.path = path;
    }

    getRecipePath(recipe_id){
        return this.path + '/' + recipe_id + '.json';
    }

    async getRecipe(recipe_id) {
        let recipe_path = this.getRecipePath(recipe_id);

        let recipe = await new Promise(function (resolve, reject) {

            // Borrowed from https://medium.com/@osiolabs/read-write-json-files-with-node-js-92d03cc82824
            fs.readFile(recipe_path, 'utf-8', function(err, jsonString){
                if (err) {
                    console.log("Error reading file from disk:", err);
                    reject("FileError");
                }
                try {
                    let data = JSON.parse(jsonString);
                    resolve(data)
                }
                catch(err){
                    console.log("Error parsing JSON string:", err);
                    reject("JSONError");
                }
            });
        });
        return recipe
    }

    hasRecipe(recipe_id) {
        let recipe_path = this.getRecipePath(recipe_id);
        return fs.existsSync(recipe_path);
    }
}

module.exports = new RecipeDataLoader("test recipes");
