import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRoter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// Middlewares
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://velora-beta-three.vercel.app',
    'https://e-commerce-nu-sand-91.vercel.app',
    ...(process.env.CORS_ORIGINS
        ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
        : [])
].map((origin) => origin.replace(/\/+$/, ''))

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin.replace(/\/+$/, ''))) {
            return callback(null, true)
        }

        callback(null, false)
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    optionsSuccessStatus: 204
}

app.use(cors(corsOptions))
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204)
    }
    next()
})
app.use(express.json())

// Api endpoints

app.use('/api/user',userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRoter)
app.use('/api/order', orderRouter)

app.get('/', (req,res)=>{
    res.send("API Working")
})

if (!process.env.VERCEL) {
    app.listen(port, ()=>console.log('Server started on PORT : ' + port))
}

export default app
