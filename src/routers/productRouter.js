import express from "express";
import {deleteProduct, getEdit, getUpload, postEdit, postUpload, watch} from "../controllers/productController";
import {cart} from "../controllers/orderController";
import {protectorMiddleware} from "../middlewares";

const productRouter = express.Router();

productRouter.route("/:id([0-9a-f]{24})").get(watch).post(cart);
productRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
productRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(deleteProduct);
productRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(postUpload);

export default productRouter;