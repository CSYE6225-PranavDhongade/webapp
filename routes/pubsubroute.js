var express = require('express');
var router = express.Router();
const pubsubController = require('../controllers/dummycontroller');

router.post('/', pubsubController.createUser);

module.exports = router;