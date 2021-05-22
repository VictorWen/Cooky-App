const user_database = require("../utils/user_database");

let test_add_user = new Promise(async function(resolve, reject) {
    let test_user = {
        "username": "TestSubject100",
        "password": "123secure",
        "fake_prop": "this should not be here"
    };

    let key = await user_database.addUser(test_user);
    if (user_database.hasUser(key)) {
        console.log(await user_database.getUser(key));
        resolve(key);
    }
    else
        reject("Key not in database");
})
.then(passed => console.log("Test Add Recipe Passed: " + passed))
.catch(failed => console.log("Test Add Recipe Failed: " + failed));