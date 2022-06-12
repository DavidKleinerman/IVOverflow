const express = require("express");
const router = express.Router();
const questionsController = require("../controllers/questions");
const verifyToken = require("../middlewares/verifyToken");
const qaValidator = require("../validations/qa-validations");

router.get(
  "/get-questions/:page",
  verifyToken,
  qaValidator.pageParam,
  questionsController.getQuestions
);
router.get(
  "/get-question/:questionId",
  verifyToken,
  qaValidator.questionIdParam,
  questionsController.getQuestion
);
router.post(
  "/create-question",
  verifyToken,
  qaValidator.title,
  qaValidator.content,
  questionsController.createQuestion
);

module.exports = router;
