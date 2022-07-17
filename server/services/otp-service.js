const crypto = require('crypto');
const nodemailer = require('nodemailer')
const smssid = process.env.SMS_SID
const smsAuthToken = process.env.SMS_AUTH_TOKEN
const twilio = require('twilio')(smssid,smsAuthToken,{lazyLoading: true})
const hashService = require('./hash-service')

class OtpService{
    async generateOtp(){
        const otp = crypto.randomInt(1000,9999)
        return otp
    }
    async sendBySms(phone,otp){
        return await  twilio.messages.create({
            to: phone,
            from: process.env.SMS_FROM_NUMBER,
            body: `Your otp for ChatApp is ${otp}`
        })
    }
    async sendByEmail(email,otp){
        //initalize nodemailer client
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_SENDER_ID,
                pass: process.env.NODEMAILER_SENDER_ID_PASSWORD
            }
        })
        const mailOptions = {
            from: process.env.NODEMAILER_SENDER_ID,
            to: email,
            text: `Your otp for ChatApp verification is ${otp}. Valid for 10 minutes`
        } 
        return await transport.sendMail(mailOptions)
    }
    async verifyOtp(hashedOtp,data){
        let computedHash = hashService.hashOtp(data)
        return hashedOtp === computedHash
    }
}

module.exports = new OtpService()