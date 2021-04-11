const express = require('express');
const router = express.Router();
const {googlelogin} = require('../controller/auth');
// router.post('/signup', signup);
// router.post('/login', login);

router.post('/googlelogin', googlelogin);
module.exports = router;