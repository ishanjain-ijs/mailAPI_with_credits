const express = require('express');
const router = express.Router();
const mailapi = require('../controllers/mailapi');

router.post('/', mailapi.createMail);

module.exports = router;