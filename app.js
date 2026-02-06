const express = require("express");
const otpRoutes = require("./src/routes/otp.routes");

const app = express();

app.use(express.json());
app.use("/api/otp", otpRoutes);

module.exports = app;