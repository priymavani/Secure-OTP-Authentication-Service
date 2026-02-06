const rateLimit = require("express-rate-limit");

exports.otpRequestLimiter = rateLimit({
    windowMs : 10 * 60 * 1000, // 10 min
    max : 3, // 3 otp request
    message: "Too many OTP requests. Try again later. ",
});

exports.otpVerifyLimiter = rateLimit({
    windowMs : 10*60 * 1000,
    max: 10,
    message: "Too many verification attempts.",
});

