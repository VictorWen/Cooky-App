// Get User info from id
let express = require('express')
let user_data = require('../utils/user_database');
let router = express.Router()

// Access user from the database
router.get('/:id', async function(req, res){
    let id = req.params.id;
    console.log(id);
    if (await user_data.hasUser(id)) {
        let user = await user_data.getUser(id);
        res.json(user);
    }
    else{
        res.status(404).send("User not found");
    }
});

//Update user in the database
router.post('/:id', async function(req, res){
    let id = req.params.id;
    let user = req.body;
    await user_data.updateUser(id, user);
    res.json(await user_data.getUser(id));
});

module.exports = router