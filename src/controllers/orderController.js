import User from "../models/User";
import Product from "../models/Product";

export const cart = async (req, res) => {
    const {id} = req.params;
    const username = res.locals.loggedInUser.username;
    const user = await User.findOne({username});

    user.cart.push(id);
    await User.findByIdAndUpdate(user._id, {
        cart: user.cart
    });

    return res.redirect(`/product/${id}`);
};
export const getCart = async (req, res) => {
    const username = req.session.user.username;
    const user = await User.findOne({username});
    const products = await Product.find({_id: [...user.cart]});
    return res.render("orders/cart", {pageTitle: "Cart", products});
};
export const deleteCart = async (req, res) => {

};
export const order = async (req, res) => {

};