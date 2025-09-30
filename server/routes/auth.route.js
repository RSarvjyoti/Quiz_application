const {Router} = require("express");

const {body} = require("express-validator");
const { signup, signin, logout, getUserDetails } = require("../controllers/auth.controller");
const isAuth = require("../middlewares/auth.middleware");
const { upload } = require("../utils/cloudinary");


const authRoute = Router();

authRoute.post('/signup', upload.single("photo"),[
    body("name").isLength({min:2,max:20}).withMessage("Name must be 2-20 chars."),
    body("email").isEmail().withMessage("Enter a valid email."),
    body('address').optional().isLength({max:400}).withMessage("address to long,"),
    body("password").isLength({min:8, max:16}).withMessage("Password must be 8-16 chars.")
], signup);

authRoute.post('/signin', [
    body("email").isEmail().withMessage("Enter a valid email."),
    body("password").isLength({min:8, max:16}).withMessage("Password must be 8-16 chars.")
],signin);

authRoute.post('/logout', isAuth, logout);
authRoute.get('/me',isAuth, getUserDetails);

module.exports = authRoute;