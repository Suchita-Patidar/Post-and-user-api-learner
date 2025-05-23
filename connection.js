import mongoose from 'mongoose'
export const connect = async () => {
    try {
        mongoose.connect("mongodb://localhost:27017/user")
            .then(() => { console.log("MongoDB connect successfully....") })
    }
    catch (err) { console.log("Error occured during connecting mongodb") }
}