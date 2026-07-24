import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import nodemailer from "nodemailer";
import userModel from "../models/userModel.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Helper function to send Verification OTP Email via Nodemailer
const sendVerificationEmail = async (email, otp) => {
  const emailUser = (process.env.EMAIL_USER || "").trim().replace(/^["']|["']$/g, "");
  const emailPass = (process.env.EMAIL_PASS || "").replace(/\s+/g, "").replace(/^["']|["']$/g, "");

  console.log(`\n========================================`);
  console.log(`[EMAIL VERIFICATION OTP FOR ${email}]: ${otp}`);
  console.log(`========================================\n`);

  if (emailUser && emailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      const info = await transporter.sendMail({
        from: `"Velora Store" <${emailUser}>`,
        to: email,
        subject: "Verify Your Email Address - Velora Store",
        html: `<div style="font-family: Arial, sans-serif; padding: 24px; max-width: 500px; border: 1px solid #eee; border-radius: 12px;">
          <h2 style="color: #8C7355; margin-bottom: 8px;">Velora Store</h2>
          <p style="color: #555; font-size: 14px;">Your account verification code is:</p>
          <div style="background: #FAF9F6; border: 1px solid #8C7355; padding: 14px; letter-spacing: 6px; font-size: 28px; font-weight: bold; color: #121212; display: inline-block; margin: 16px 0; border-radius: 8px;">${otp}</div>
          <p style="color: #777; font-size: 12px;">This code is valid for 15 minutes. Enter this code to verify your account.</p>
        </div>`,
      });

      console.log("Email sent successfully: ", info.messageId);
      return true;
    } catch (err) {
      console.error("Nodemailer Email Error:", err.message);
      return false;
    }
  }
  return false;
};

// Route for Google Auth (Google accounts are automatically verified by Google)
const googleAuth = async (req, res) => {
  try {
    const { token, credential } = req.body;
    const idToken = credential || token;

    if (!idToken) {
      return res.json({ success: false, message: "Google ID token is required" });
    }

    let email, name;

    try {
      if (process.env.GOOGLE_CLIENT_ID) {
        const ticket = await client.verifyIdToken({
          idToken,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        email = payload.email;
        name = payload.name;
      } else {
        const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
        const data = await response.json();
        if (data.error || !data.email) {
          throw new Error(data.error_description || "Invalid token");
        }
        email = data.email;
        name = data.name || email.split("@")[0];
      }
    } catch (verifyError) {
      try {
        const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
        const data = await response.json();
        if (data.email) {
          email = data.email;
          name = data.name || email.split("@")[0];
        } else {
          return res.json({ success: false, message: "Google verification failed. Invalid token." });
        }
      } catch (err) {
        return res.json({ success: false, message: "Google verification failed." });
      }
    }

    if (!email) {
      return res.json({ success: false, message: "Google account email not found." });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(randomPassword, salt);

      user = new userModel({
        name: name || email.split("@")[0],
        email,
        password: hashedPassword,
        isVerified: true, // Automatically verified via Google OAuth
      });

      await user.save();
    } else if (!user.isVerified) {
      user.isVerified = true;
      await user.save();
    }

    const appToken = createToken(user._id);

    res.json({
      success: true,
      token: appToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // STRICT CHECK: Verify email ownership before issuing token
    if (!user.isVerified) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.verifyOtp = otp;
      user.verifyOtpExpireAt = Date.now() + 15 * 60 * 1000;
      await user.save();
      const emailSent = await sendVerificationEmail(email, otp);

      return res.json({
        success: false,
        requireOtp: true,
        email: user.email,
        devOtp: !process.env.EMAIL_USER ? otp : undefined,
        message: emailSent
          ? "Your account is not verified yet. Verification code has been sent to your email."
          : `Account not verified! Code: ${otp}`,
      });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user registration (Generates OTP)
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking if user already exists
    const exists = await userModel.findOne({ email });
    if (exists && exists.isVerified) {
      return res.json({ success: false, message: "User already exists with this email" });
    }

    // Validating email format & password strength
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password (minimum 8 characters)",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpireAt = Date.now() + 15 * 60 * 1000;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (exists && !exists.isVerified) {
      exists.name = name;
      exists.password = hashedPassword;
      exists.verifyOtp = otp;
      exists.verifyOtpExpireAt = otpExpireAt;
      await exists.save();
    } else {
      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
        isVerified: false,
        verifyOtp: otp,
        verifyOtpExpireAt: otpExpireAt,
      });
      await newUser.save();
    }

    const emailSent = await sendVerificationEmail(email, otp);

    res.json({
      success: true,
      requireOtp: true,
      email,
      devOtp: !process.env.EMAIL_USER ? otp : undefined,
      message: emailSent
        ? "Verification OTP sent to your email! Please check your inbox."
        : `OTP generated! Check your backend server console or enter code: ${otp}`,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Route to verify Email OTP
const verifyEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.json({ success: false, message: "Email and OTP are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      const token = createToken(user._id);
      return res.json({ success: true, token, message: "Account is already verified" });
    }

    if (!user.verifyOtp || user.verifyOtp !== otp.trim()) {
      return res.json({ success: false, message: "Invalid verification OTP code" });
    }

    if (Date.now() > user.verifyOtpExpireAt) {
      return res.json({ success: false, message: "Verification OTP has expired. Please resend a new code." });
    }

    // Mark as verified
    user.isVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    const token = createToken(user._id);
    res.json({ success: true, token, message: "Email verified successfully!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Route to resend OTP
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res.json({ success: false, message: "User is already verified" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 15 * 60 * 1000;
    await user.save();

    const emailSent = await sendVerificationEmail(email, otp);

    res.json({
      success: true,
      devOtp: !process.env.EMAIL_USER ? otp : undefined,
      message: emailSent
        ? "New verification OTP code sent to your email!"
        : `New OTP generated: ${otp}`,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get logged-in user's profile
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId).select("-password -cartData");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update logged-in user's profile (name only)
const updateProfile = async (req, res) => {
  try {
    const { userId, name } = req.body;
    if (!name || name.trim().length < 2) {
      return res.json({ success: false, message: "Name must be at least 2 characters" });
    }
    await userModel.findByIdAndUpdate(userId, { name: name.trim() });
    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Change logged-in user's password
const changePassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Current password is incorrect" });
    }

    if (newPassword.length < 8) {
      return res.json({ success: false, message: "New password must be at least 8 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await userModel.findByIdAndUpdate(userId, { password: hashedPassword });

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  loginUser,
  registerUser,
  verifyEmailOtp,
  resendOtp,
  adminLogin,
  getProfile,
  updateProfile,
  changePassword,
  googleAuth,
};
