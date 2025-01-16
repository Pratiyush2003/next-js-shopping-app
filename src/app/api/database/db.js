import mongoose from 'mongoose'

export const connectdb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/hrlcahuhoashoifhoi');
    } catch (error) {
        console.log(error)
    }
}