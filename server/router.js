const express = require('express');
const authController = require('./controllers/auth-controller');
const authMiddleware = require('./middlewares/auth-middleware')
const router = express.Router();

const use = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

router.post('/api/send-otp',use(authController.sendOtp))
router.post('/api/verify-otp',use(authController.verifyOtp))
router.get('/api/refresh',use(authController.refresh))
router.post('/api/update-avatar',authMiddleware,use(authController.updateAvatar))

module.exports = router