const { validationResult } = require("express-validator");

const Question = require("../models/question");

exports.getQuestions = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorBuilder("validation failed", 422, errors.array(), next);
  } else {
    try {
      const currentPage = req.params.page;
      const perPage = 2;
      const totalQuestions = await Question.find().countDocuments();
      const questions = await Question.find()
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
      await res.status(200).json({
        message: "questions fetched successfuly",
        questions: questions,
        totalQuestions: totalQuestions,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};

exports.getQuestion = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorBuilder("validation failed", 422, errors.array(), next);
  } else {
    try {
      const question = await Question.findById(req.params.questionId);
      await res.status(200).json({
        message: "question fetched successfuly",
        question: question,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};

exports.createQuestion = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorBuilder("validation failed", 422, errors.array(), next);
  } else {
    try {
      const question = new Question({
        title: req.body.title,
        content: req.body.content,
        author: req.nickName,
        tags: req.body.tags,
      });
      await question.save();
      res.status(201).json({
        message: "question posted successfuly",
        question: question,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};
