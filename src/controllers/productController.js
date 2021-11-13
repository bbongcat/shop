import Product from "../models/Product";

export const home = async (req, res) => {
    const products = await Product.find({}).sort({uploadedAt: "desc"});
    return res.render("products/home", {pageTitle: "Home", products});
};

export const watch = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).render("404", {pageTitle: "상품이 존재하지 않습니다."});
    }
    return res.render("products/watch", {pageTitle: `${product.productName}`, product});
};

export const getUpload = (req, res) => {
    return res.render("products/upload", {pageTitle: "상품 업로드"});
};
export const postUpload = async (req, res) => {
    const {productName, description, price, quantity, category, imgFileUrl} = req.body;
    try {
        await Product.create({
            productName, description, price, quantity, category, imgFileUrl
        });
        return res.redirect("/");
    } catch (error) {
        return res.status(400).render("upload", {pageTitle: "상품 업로드", errorMessage: error._message});
    }
};

export const getEdit = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).render("404", {pageTitle: "상품이 존재하지 않습니다."});
    }
    return res.render("products/edit", {pageTitle: `Edit ⇢ ${product.productName}`, product});
};
export const postEdit = async (req, res) => {
    const {id} = req.params;
    const {productName, description, price, quantity, category, productImg} = req.body;
    if (!await Product.exists({_id: id})) {
        return res.render("404", {pageTitle: "상품이 존재하지 않습니다."});
    }
    await Product.findByIdAndUpdate(id, {
        productName, description, price, quantity, category, productImg
    });
    return res.redirect(`/shop/${id}`);
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    return res.redirect("/");
};