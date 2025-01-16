import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    userId : mongoose.Schema.Types.ObjectId,
    productname: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    }
})

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Product