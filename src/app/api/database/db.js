import mongoose from 'mongoose'

export const connectdb = async () => {
    try {
        await mongoose.connect('mongodb+srv://pratiyushs37:Ij2R44iBdIR5kvcJ@cluster0.6a1i6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    } catch (error) {
        console.log(error)
    }
}