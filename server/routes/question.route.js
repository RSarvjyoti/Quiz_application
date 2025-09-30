const {Router} = require("express");
const { addQuestion, getCategories, getQuestions, getQuestionsBycategory } = require("../controllers/question.controller");
const isAuth = require("../middlewares/auth.middleware");
const checkRole = require("../middlewares/role");

const questionRoute = Router();

questionRoute.post('/add-question', isAuth, checkRole("admin"), addQuestion);
questionRoute.get('/categories',isAuth, getCategories);
questionRoute.get('/questions', isAuth, getQuestions);
questionRoute.get('/questions/:category', isAuth, getQuestionsBycategory);

module.exports = questionRoute;