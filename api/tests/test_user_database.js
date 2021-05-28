const user_database = require("../utils/user_database");

let test_user_database = new Promise(async function(resolve, reject) {
    let test_user = {
        "username": "TestSubject5000",
        "password": "123SUPERsecure",
        "fake_prop": "this should not be here"
    };

    // Test add user
    let key = await user_database.addUser(test_user);
    if (await user_database.hasUser(key))
        console.log("Test Add User Passed: " + key);
    else
        reject("key " + key + " not in database");


    // Test get user
    let user = await user_database.getUser(key);
    if ('fake_prop' in user)
        reject("Fake Prop found in database");
    
    // Compare properties
    if (user.username != test_user.username)
        reject("Wrong username property!");
    if (user.password != test_user.password)
        reject("Wrong password property!");


    // Test delete user
    await user_database.deleteUser(key);
    if (await user_database.hasUser(key))
        reject("Test Delete User Failed")
    else
        console.log("Test Delete User Passed")
    
    resolve()
})
.then(() => console.log("USER TESTS PASSED!"))
.catch(failed => console.log("User Tests Failed: " + failed));