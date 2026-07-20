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
const normalizeOrigin = (origin) => origin.replace(/\/+$/, '')

const parseOrigins = (origins = '') =>
    origins
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean)
        .map(normalizeOrigin)

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    ...parseOrigins(process.env.CORS_ORIGINS)
]

const allowedOriginSet = new Set(allowedOrigins.map(normalizeOrigin))

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOriginSet.has(normalizeOrigin(origin))) {
            return callback(null, true)
        }

        callback(null, false)
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    optionsSuccessStatus: 204
}

app.use(cors(corsOptions))
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
