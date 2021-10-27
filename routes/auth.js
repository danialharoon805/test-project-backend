const express = require('express');

const AuthCtrl = require('../app/auth/AuthCtrl');

const router = express.Router();

router.post('/', AuthCtrl.signup);

router.post('/authenticate', AuthCtrl.login);

module.exports = router;
