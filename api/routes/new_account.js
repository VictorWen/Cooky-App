// Create new user account
let express = require('express')
let router = express.Router()
let user_database = require('../utils/user_database')

router.put('/', async function(req, res) {
    let user_data = req.body;
    let key = await user_database.addUser(user_data);
    res.send(key);
});

module.exports = router;