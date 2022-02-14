const express = require('express');
const authController = require('./controllers/auth-controller');
const chatController = require('./controllers/chat-controller');
const authMiddleware = require('./middlewares/auth-middleware')
const router = express.Router();

const use = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

router.post('/api/send-otp',use(authController.sendOtp))
router.post('/api/verify-otp',use(authController.verifyOtp))
router.get('/api/refresh',use(authController.refresh))
router.post('/api/update-avatar',authMiddleware,use(authController.updateAvatar))
router.get('/api/all-users',authMiddleware,use(chatController.getAllUsers))
router.post('/api/send-msg',authMiddleware,use(chatController.sendMsg))
router.post('/api/get-msgs',authMiddleware,use(chatController.getMsgs))

module.exports = router