var express = require('express');
var router = express.Router();
const healthControl = require('../controllers/healthzcontroller');

router.get('/', healthControl.healthz_get);

router.put('/', healthControl.healthz_put);

router.post('/', healthControl.healthz_post);

router.patch('/', healthControl.healthz_delete);

module.exports = router;