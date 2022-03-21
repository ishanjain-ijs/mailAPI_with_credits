const express = require('express');
const router = express.Router();
const mailapi = require('../controllers/sendmail');

router.post('/', mailapi.sendMail);

module.exports = router;