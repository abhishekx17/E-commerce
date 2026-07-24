import express from 'express'
import {
  loginUser,
  registerUser,
  verifyEmailOtp,
  resendOtp,
  adminLogin,
  getProfile,
  updateProfile,
  changePassword,
  googleAuth
} from '../controllers/userController.js'
import authUser from '../middleware/auth.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/verify-otp', verifyEmailOtp)
userRouter.post('/resend-otp', resendOtp)
userRouter.post('/google-auth', googleAuth)
userRouter.post('/admin', adminLogin)
userRouter.post('/profile', authUser, getProfile)
userRouter.post('/update-profile', authUser, updateProfile)
userRouter.post('/change-password', authUser, changePassword)


export default userRouter