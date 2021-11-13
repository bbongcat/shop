import User from "../models/User";
import bcrypt from "bcrypt";


export const getJoin = (req, res) => {
    return res.render("users/join", {pageTitle: "Join Us!"});
};
export const postJoin = async (req, res) => {
    const {username, password, password2, email, name, address, phone} = req.body;
    const pageTitle = "Join Us!";

    if (password !== password2) {
        return res.status(400).render("users/join", {pageTitle, errorMessage: "비밀번호가 일치하지 않습니다."});
    }

    const exist = await User.exists({$or: [{username}, {email}]});
    if (exist) {
        return res.status(400).render("users/join", {pageTitle, errorMessage: "이미 존재하는 아이디/이메일입니다."});
    }

    try {
        await User.create({
            username, password, email, name, address, phone
        });
        res.redirect("/");
    } catch (error) {
        return res.status(400).render("users/join", {pageTitle, errorMessage: error._message});
    }
};

export const getLogin = (req, res) => res.render("users/login", {pageTitle: "Login!"});
export const postLogin = async (req, res) => {
    const {username, password} = req.body;
    const pageTitle = "Login!";

    const user = await User.findOne({username});
    if (!user) {
        return res.status(400).render("users/login", {pageTitle, errorMessage: "존재하지 않는 아이디입니다."});
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("users/login", {pageTitle, errorMessage: "잘못된 패스워드입니다."});
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};

export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};

