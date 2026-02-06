const otpService = require("../services/otp.service");

exports.requestOtp = async(req,res) => {
    const {email , purpose} = req.body;

    await otpService.requestOtp({
        identifier: email ,
        purpose,
    });

    res.status(200).json({
        message : "If the account exists , OTP has beed sent",
    });
    
};

exports.verifyOtp = async(req,res) => {
    const {email , purpose , otp} = req.body;

    await otpService.verifyOtp({
        identifier: email,
        purpose,
        otp
    });

    res.status(200).json({
        message: " OTP verified sucessfully",
    });
};

