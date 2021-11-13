import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    quantity: {type: Number, required: true},
    uploadedAt: {type: Date, required: true, default: Date.now},
    imgFileUrl: {type: String, required: true},
    uploadedBy: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    meta: {
        views: {type: Number, default: 0, required: true},
        like: {type: Number, default: 0, required: true}
    }
});

const Product = mongoose.model("Product", productSchema);

export default Product;