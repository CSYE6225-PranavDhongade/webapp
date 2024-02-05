var express = require('express');
var router = express.Router();
const userController = require('../controllers/usercontroller');

router.post('/', userController.createUser);
router.get('/', userController.getUser);
router.put('/', userController.userUpdate);

module.exports = router;