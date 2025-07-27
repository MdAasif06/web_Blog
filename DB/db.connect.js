const mongoose=require('mongoose')

const connectDB=async()=>{
    try {
        mongoose.connection.on('connected',()=> console.log("connected Database"))
        await mongoose.connect(`${process.env.MONGO_URI}/taskOne`)
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = connectDB