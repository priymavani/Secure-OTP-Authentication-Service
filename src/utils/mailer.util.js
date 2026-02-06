const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS,
    },
});

exports.sendOtpMail = async (to , otp , purpose) => {
    await transporter.sendMail({
        from:` "Security" <${process.env.MAIL_USER}>`,
        to,
        subject:`Your OTP for ${purpose}`,
        text: `Your OTP is ${otp} , IT expires in 3 minutes. `,
    });
};

