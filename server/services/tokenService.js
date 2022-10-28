const jwt = require("jsonwebtoken")
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET
const refreshModel = require("../model/refresh")

class TokenService{
    generateTokens(payload){
        let accessToken;
        let refreshToken;
        jwt.sign(payload,accessTokenSecret,{expiresIn: '1d'},(err,token)=> {
            if(err)return null;
            accessToken = token;
        })
        jwt.sign(payload,refreshTokenSecret,{expiresIn: '7d'},(err,token)=> {
            if(err)return null;
            refreshToken = token;
        })
        return {accessToken, refreshToken}
    }
    async storeRefreshToken(token,userId){
        const res = await refreshModel.findOne({userId})
        if(res){
            return await refreshModel.updateOne({userId},{token})
        }
        return await refreshModel.create({token,userId})
    }
    verifyAccessToken(token){
        let data;
        jwt.verify(token,accessTokenSecret,(err,decoded)=> {
            if(err)return null;
            data = decoded;
        })
        return data;
    }
    verifyRefreshToken(refreshToken){
        let data;
        jwt.verify(refreshToken,refreshTokenSecret,(err,decoded)=> {
            if(err)return null;
            data = decoded;
        })
        return data;
    }
    async findRefreshToken(userId){
        return await refreshModel.findOne({userId: userId})
    }
    async updateRefreshToken(userId,refreshToken){
        return await refreshModel.updateOne({userId: userId},{token: refreshToken})
    }
    async removeToken(refreshToken){
        return await refreshModel.deleteOne({token: refreshToken})
    }
}

module.exports = new TokenService()