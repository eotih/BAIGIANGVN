const express = require('express');
const router = express.Router();
const { login, register, loginWithGoogle } = require('../controllers/auth.controller');


router.post('/login', login);
router.post('/register', register);
router.post('/google', loginWithGoogle);

module.exports = router