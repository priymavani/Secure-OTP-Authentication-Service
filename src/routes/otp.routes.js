const express = require("express");
const router = express.Router();
const controller = require("../controllers/otp.controller");
const {
  otpRequestLimiter,
  otpVerifyLimiter,
} = require("../middlewares/rateLimit.middleware");

router.post("/request", otpRequestLimiter, controller.requestOtp);
router.post("/verify", otpVerifyLimiter, controller.verifyOtp);

module.exports = router;