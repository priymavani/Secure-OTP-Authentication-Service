const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
    {
        identifier: {
            type: String,
            required: true,
            index: true,
        },
        purpose: {
            type: String,
            enum: ["LOGIN", "SIGNUP", "RESET_PASSWORD"],
            required: true,
        },
        otpHash: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
            index: { expires: 0 },
        },
        attempts: {
            type: Number,
            default: 0
        },
        maxAttempts: {
            type: Number,
            default: 3,
        },
        used: {
            type: Boolean,
            default: false,

        },

    },
    { timestamps: true }
);

module.exports = mongoose.model('Otp', otpSchema);


