# 🔐 Secure OTP Authentication Service

A production-style OTP (One-Time Password) service built using **Node.js**, **Express**, and **MongoDB**.

This project demonstrates how to implement secure, reusable, and scalable OTP verification, going beyond the simple "send and verify" logic. The goal is to learn by doing—understanding how OTP systems work internally and how to build them correctly.

## 🚀 Features

* ✅ **Email-based OTP**
* ✅ **Purpose-based OTP** (Signup / Login / Password Reset)
* ✅ **Secure OTP hashing** (using bcrypt)
* ✅ **OTP expiry handling** (TTL index)
* ✅ **Retry limits & brute-force protection**
* ✅ **Rate-limited APIs**
* ✅ **Clean, layered architecture** (Controller-Service-Model)
* ✅ **Beginner-friendly but production-minded**

---

## 🧠 What This Project Teaches

This project is not just about sending an email. You will learn:

* The full OTP lifecycle (generate → store → verify → invalidate).
* Why OTPs must be hashed in the database.
* How to prevent OTP reuse.
* How retry limits protect against brute-force attacks.
* Why business logic belongs in the **Service** layer, not the Controller.
* How to prevent user enumeration attacks.
* How real backend authentication systems are structured.

---

## 🏗️ Project Structure

```text
src/
 ├─ controllers/     # Handles HTTP requests & responses
 ├─ services/        # Core OTP business logic
 ├─ models/          # MongoDB schemas
 ├─ utils/           # Helper utilities (OTP, mail)
 ├─ middlewares/     # Rate limiting & security
 ├─ routes/          # API routes
 ├─ app.js
 └─ server.js

 ```

## 📋 Architecture Principles

**Important rules followed:**

👉 **Controllers are thin:** They only handle input/output.

👉 **Services contain all logic:** They handle the complexity.

👉 **OTP logic never touches User logic:** Keeps concerns separated.

## ⚙️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Security:** bcrypt, express-rate-limit
- **Email:** Nodemailer
- **Config:** dotenv

## 🔐 Environment Variables Setup

Create a `.env` file in the project root.

Add the following variables (ensure no spaces around `=`):

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/otp_service

MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
```

⚠️ **Warning:** Do NOT commit `.env` to GitHub. It is already added to `.gitignore`.

## 📧 Gmail Setup (MAIL_USER & MAIL_PASS)

You cannot use your normal Gmail password. You must use an **App Password**.

**Step-by-step:**

1. Go to **Google Account → Security**.
2. Enable **2-Step Verification** (if not already enabled).
3. Search for **App Passwords** (or go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)).
4. Create a new App Password:
   - **App name:** Enter a name like "OTP Project".
   - Click **Create**.
5. You'll get a 16-character code like: `abcd efgh ijkl mnop`
6. Use it in `.env` (remove spaces): `MAIL_PASS=abcdefghijklmnop`

## ▶️ How to Run the Project

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start MongoDB:** Make sure your local MongoDB instance is running.
   ```bash
   mongod
   ```

3. **Start the server:**
   ```bash
   node server.js
   ```

The server will run on: `http://localhost:3000`

## 🔗 API Documentation

**Base URL:** `http://localhost:3000/api/otp`

### 1️⃣ Request OTP

- **Endpoint:** `POST /request`
- **Headers:** `Content-Type: application/json`
- **Description:** Generates a unique OTP, hashes it, stores it securely, and sends it via email.

**Request Body:**
```json
{
  "email": "user@example.com",
  "purpose": "SIGNUP"
}
```

**Allowed purposes:** `SIGNUP`, `LOGIN`, `RESET_PASSWORD`

**Success Response:**
```json
{
  "message": "If the account exists, OTP has been sent"
}
```

*(Note: This response is generic by design to prevent user enumeration.)*

### 2️⃣ Verify OTP

- **Endpoint:** `POST /verify`
- **Headers:** `Content-Type: application/json`
- **Description:** Verifies the OTP, checks expiry, and enforces retry limits.

**Request Body:**
```json
{
  "email": "user@example.com",
  "purpose": "SIGNUP",
  "otp": "123456"
}
```

**Success Response:**
```json
{
  "message": "OTP verified successfully"
}
```

## 🔒 Security Rules Enforced

- ✅ **Hashed Storage:** OTPs are hashed using bcrypt; they are never stored in plain text.
- ✅ **Auto-Expiry:** MongoDB TTL indexes automatically delete old OTPs.
- ✅ **Single Use:** An OTP cannot be used more than once.
- ✅ **Retry Limiting:** After 3 failed attempts, the OTP is marked as used/failed.
- ✅ **Rate Limiting:** IP-based rate limiting prevents spamming the request API.
- ✅ **Strict Binding:** An OTP is strictly bound to a specific email and purpose.

## 🔄 How the Flow Works

1. User requests an OTP.
2. Server generates a random 6-digit code.
3. The code is hashed and stored in MongoDB.
4. The original (plain) code is emailed to the user.
5. User submits the OTP for verification.
6. Server checks:
   - Is it expired?
   - Are there retry attempts left?
   - Does the hash match?
7. If successful, the OTP is marked as used.

## 🧪 Testing Checklist (Manual)

You can use **Postman** or **cURL** to test these scenarios:

- ✅ **Happy Path:** Request OTP → Receive Email → Verify successfully.
- ❌ **Reuse Attack:** Try to verify the same OTP twice (should fail).
- ❌ **Expiry Test:** Wait 3+ minutes and try to verify (should fail).
- ❌ **Brute Force:** Enter the wrong OTP 3 times. The 4th attempt (even if correct) should fail.
- ❌ **Rate Limit:** Hit the `/request` endpoint 5 times quickly (should be blocked).

## 🎯 Why This Project Exists

Most tutorials only show "Send OTP → Verify OTP". This project shows **"How to design OTP like a backend engineer"**. It focuses on security, architecture, and handling edge cases, not just making it work.

## 🧠 Who Should Use This?

- Beginners learning backend authentication.
- MERN developers looking to improve their backend architecture skills.
- Anyone preparing for backend interviews.

## 👤 Author

**Priy Mavani**

GitHub: [https://github.com/priymavani](https://github.com/priymavani)

---

⭐ If you found this project helpful, please give it a star on GitHub!