const {Router} = require("express");
const { saveProgress, getProgress } = require("../controllers/progress.controller");
const isAuth = require("../middlewares/auth.middleware");

const progressRoute = Router();
progressRoute.post('/save',isAuth, saveProgress);
progressRoute.get('/get',isAuth, getProgress)

module.exports = progressRoute;