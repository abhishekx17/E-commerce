import mongoose from 'mongoose'


const connectDB = async ()=>{
    if (mongoose.connection.readyState) {
        return
    }

    mongoose.connection.on('connected',()=>{
        console.log('DB connected')
    })
    
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerse`)
}


export default connectDB
