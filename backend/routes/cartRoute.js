import express from 'express'
import { addToCart, getUsercart, updateCart } from '../controllers/cartController.js'
import authuser from '../middleware/auth.js'

const cartRouter = express.Router()

cartRouter.post('/get',authuser, getUsercart)
cartRouter.post('/add', authuser, addToCart)
cartRouter.post('/update',authuser, updateCart)

export default cartRouter

