const express = require('express');
const authController = require('./controllers/auth-controller');
const router = express.Router();

const use = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

router.post('/api/send-otp',use(authController.sendOtp))

module.exports = router