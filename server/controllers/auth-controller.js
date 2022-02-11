const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");

class AuthController{
    async sendOtp(req, res){
        const {phone} = req.body
        if (!phone) {
            return res.status(400).json({ msg: "error" });
        }
        const otp = await otpService.generateOtp();
        const ttl = 1000 * 60 * 10; // 10 min
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);
        // await otpService.sendBySms(phone, otp);
        // res.status(200).json({ hash: `${hash}.${expires}`, phone });
        res.status(200).json({ hash: `${hash}.${expires}`, phone, otp });
    }
}

module.exports = new AuthController()