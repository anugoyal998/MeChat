const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");

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
        res.status(200).json({ hash: `${hash}.${expires}`, phone, otp });
    }
    async verifyOtp(req,res){
        const { otp, hash, phone, name } = req.body;
        if (!otp || !hash || !phone || !name){
            return res.status(400).json({ msg: "error" });
        }
        const [hashedOtp, expires] = hash.split(".");
        if (Date.now() > +expires) {
            return res.status(400).json({ msg: "Session Timeout" });
        }
        const data = `${phone}.${otp}.${expires}`;
        const isValid = await otpService.verifyOtp(hashedOtp, data)
        if(!isValid) {
            return res.status(400).json({ msg: "Invalid Otp" });
        }
        let user;
        user = await userService.findUser({phone: phone})
        if(!user){
            user = await userService.createUser({phone: phone, name})
        }
        const  {accessToken, refreshToken} = tokenService.generateTokens({_id: user._id, name, phone})
        await tokenService.storeRefreshToken(refreshToken,user._id)
        // res.cookie('refreshToken',refreshToken,{maxAge: 1000*60*60*24*7, httpOnly: true})
        // res.cookie('accessToken',accessToken,{maxAge: 1000*60*60, httpOnly: true})
        res.status(200).json({user, auth: true, tokens: {at: accessToken, rt: refreshToken}})
    }
    async refresh(req, res) {
        if(!req.body.rt){
            return res.status(400).json({ msg: "error" });  
        }
        const {rt: refreshTokenFromCookie} = req.body
        const userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie)
        const token = await tokenService.findRefreshToken(userData._id,refreshTokenFromCookie)
        if(!token) {
            return res.status(400).json({ msg: "error" });  
        }
        const user = await userService.findUser({_id: userData._id})
        if(!user){
            return res.status(400).json({ msg: "error" })
        }
        const {refreshToken,accessToken} = tokenService.generateTokens({_id: userData._id, name: user.name, phone: user.phone})
        await tokenService.updateRefreshToken(userData._id,refreshToken)
        // res.cookie('refreshToken',refreshToken,{maxAge: 1000*60*60*24*7, httpOnly: true})
        // res.cookie('accessToken',accessToken,{maxAge: 1000*60*60, httpOnly: true})
        res.status(200).json({user, auth: true, tokens: {at: accessToken, rt: refreshToken}})
    }
    async updateAvatar(req, res){
        const user = req.user
        const {avatar} = req.body
        if(!user || !avatar){
            return res.status(400).json({ msg: "error" });  
        }
        await userService.updateUser(user?._id,{avatar})
        res.status(200).json({auth: true})
    }
    async updateName(req, res){
        const user = req.user
        const {name} = req.body
        if(!user || !name){
            return res.status(400).json({ msg: "error" }); 
        }
        await userService.updateUser(user?._id,{name})
        res.status(200).json({auth: true})
    }
    async logout(req, res){
        const {rt: refreshToken} = req.body
        // delte refresh token from db
        await tokenService.removeToken(refreshToken)
        res.status(200).json({auth: true})
    }
}

module.exports = new AuthController()