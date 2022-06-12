const express = require("express");
const router = express.Router();
//const validations = require("../validations/auth-validations");
const answersController = require("../controllers/answers");
const verifyToken = require("../middlewares/verifyToken");
const qaValidator = require("../validations/qa-validations");
const answerValidator = require("../validations/answer-validations");

router.get(
  "/get-question-answer/:questionId/:page",
  verifyToken,
  qaValidator.questionIdParam,
  qaValidator.pageParam,
  answersController.getAnswersByQuestion
);
router.post(
  "/answer",
  verifyToken,
  qaValidator.title,
  qaValidator.content,
  answerValidator.questionIdBodyField,
  answersController.createAnswer
);

module.exports = router;
