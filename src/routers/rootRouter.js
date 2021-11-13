import express from "express";
import {home} from "../controllers/productController";
import {getJoin, getLogin, logout, postJoin, postLogin} from "../controllers/userController";
import {protectorMiddleware, publicOnlyMiddleware} from "../middlewares";

const rootRouter = express.Router();


rootRouter.get("/", home); // 쇼핑몰 상품을 최신순으로 정렬
rootRouter.get("/logout", protectorMiddleware, logout);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);


export default rootRouter;