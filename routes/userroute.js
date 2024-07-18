var express = require('express');
var router = express.Router();
const userController = require('../controllers/usercontroller');

router.post('/', userController.createUser);
router.get('/', userController.getUser);
// router.get('/', userController.getUsers);
router.put('/', userController.userUpdate);
router.get('/verify_email', userController.verifyEmail);

module.exports = router;