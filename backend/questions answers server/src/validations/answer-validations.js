const { body } = require("express-validator");

exports.questionIdBodyField = body("questionId")
  .trim()
  .notEmpty()
  .isMongoId()
  .withMessage("questionID invalid");
