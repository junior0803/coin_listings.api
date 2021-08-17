var express = require('express');
var router = express.Router();
var HomeController = require('./../controllers/HomeController');
var EntryController = require('./../controllers/EntryController');

/* GET users listing. */
router.get('/coin_listings', HomeController.loadCoinListings);
router.post('/add_entry', EntryController.addEntry);
router.get('/get_entries', EntryController.getEntries);

module.exports = router;
