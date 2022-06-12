const { validationResult } = require("express-validator");

const Answer = require("../models/answer");

exports.getAnswersByQuestion = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorBuilder("validation failed", 422, errors.array(), next);
  } else {
    try {
      const questionId = req.params.questionId;
      const currentPage = req.params.page;
      const perPage = 2;
      const answers = await Answer.find({ question: questionId })
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
      await res.status(200).json({
        message: "answers fetched successfuly",
        answers: answers,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};

exports.createAnswer = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorBuilder("validation failed", 422, errors.array(), next);
  } else {
    try {
      const answer = new Answer({
        title: req.body.title,
        content: req.body.content,
        author: req.nickName,
        question: req.body.questionId,
      });
      await answer.save();
      res.status(201).json({
        message: "answered posted successfuly",
        answer: answer,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};
