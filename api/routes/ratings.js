let express = require('express')
let recipe_data = require('../utils/recipe_database');
let router = express.Router()

router.put('/', async function(req, res) {
    let rating_request = req.body;
    await recipe_data.addRating(rating_request.recipe_id, rating_request.user_id, parseInt(rating_request.rating));
    res.end();
});

module.exports = router;