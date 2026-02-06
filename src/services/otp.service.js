const bcrypt = require("bcrypt");
const Otp = require("../models/otp.model");
const { generateOtp } = require("../utils/otp.util");
const { sendOtpMail } = require("../utils/mailer.util");

const OTP_EXPIREY_MINUTES = 3 ;

exports.requestOtp = async({ identifier , purpose}) => {
    await Otp.updateMany(
        { identifier , purpose , used: false },
        { used: true}
     );

     const otp = generateOtp();
     const otpHash = await bcrypt.hash(otp,10);

     const expiresAt = new Date(
        Date.now() + OTP_EXPIREY_MINUTES * 60 * 1000
     );

     await Otp.create({
        identifier,
        purpose,
        otpHash,
        expiresAt,

     });


     await sendOtpMail(identifier , otp , purpose);

};

exports.verifyOtp = async({ identifier , purpose , otp })=>{
    const record = await Otp.findOne({
        identifier,
        purpose,
        used:false,
    }).sort({ createdAt : -1});

    if(!record){
        throw new Error("Invalid or expired OTP");
    }

    if(record.expiresAt < Date.now() ) {
        record.used = true;
        await record.save();
        throw new Error("OTP expired");
    }

    if(record.attempts >= record.maxAttempts){
        record.used = true;
        await record.save();
        throw new Error("Too many attempts");
    }

    const isMatch = await bcrypt.compare(otp , record.otpHash);

    if(!isMatch){
        record.attempts +=1;
        await record.save();
        throw new Error("Invalid OTP");
    }

    record.used = true;
    await record.save();

    return true;


}