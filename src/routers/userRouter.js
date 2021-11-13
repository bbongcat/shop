import express from "express";
import {getCart} from "../controllers/orderController";
import {protectorMiddleware} from "../middlewares";

const userRouter = express.Router();

userRouter.route("/cart").all(protectorMiddleware).get(getCart).post();

export default userRouter;