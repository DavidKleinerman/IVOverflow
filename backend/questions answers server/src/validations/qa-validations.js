const { body, param } = require("express-validator");

exports.pageParam = param("page")
  .trim()
  .notEmpty()
  .isNumeric()
  .withMessage("Page parameter must be included and numeric");

exports.questionIdParam = param("questionId")
  .trim()
  .notEmpty()
  .isMongoId()
  .withMessage("questionId is invalid");

exports.title = body("title")
  .trim()
  .notEmpty()
  .withMessage("Question title must be included");

exports.content = body("content")
  .trim()
  .notEmpty()
  .withMessage("Question content must be included");
