import mongoose from "mongoose";
import bcrypt from "bcrypt";

const membershipLevel = {
    general: "GENERAL",
    vip: "VIP",
    admin: "Admin"
};

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    level: {type: String, default: membershipLevel.general},
    reserves: {type: Number, default: 1000},
    cart: [{product: mongoose.Schema.Types.ObjectId, quantity: Number}],
});

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);

export default User;