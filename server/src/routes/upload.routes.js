const express = require('express');
const router = express.Router();
const { generateToken, isAdmin, isAuthenticated } = require('../utils/auth');
const UploadController = require('../controllers/upload.controller');

router.post('/', isAuthenticated, isAdmin, UploadController.upload)


module.exports = router