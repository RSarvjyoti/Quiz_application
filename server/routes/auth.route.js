const {Router} = require("express");

const {body} = require("express-validator");
const { signup, signin, logout } = require("../controllers/auth.controller");
const isAuth = require("../middlewares/auth.middleware");

const authRoute = Router();

authRoute.post('/signup',[
    body("name").isLength({min:2,max:60}).withMessage("Name must be 20-60 chars."),
    body("email").isEmail().withMessage("Enter a valid email."),
    body('address').optional().isLength({max:400}).withMessage("address to long,"),
    body("password").isLength({min:8, max:16}).withMessage("Password must be 8-16 chars.")
], signup);

authRoute.post('/signin', [
    body("email").isEmail().withMessage("Enter a valid email."),
    body("password").isLength({min:8, max:16}).withMessage("Password must be 8-16 chars.")
],signin);

authRoute.post('/logout', isAuth, logout);
module.exports = authRoute;