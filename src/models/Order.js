import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    username: {type: String, required: true},
    orderId: {type: String, required: true},
    orderList: [{product: mongoose.Schema.Types.ObjectId, quantity: Number}],
    deliveryAddr: {type: String, required: true},
    useReserves: {type: Number}
});

const Order = mongoose.model("Order", orderSchema);

export default Order;