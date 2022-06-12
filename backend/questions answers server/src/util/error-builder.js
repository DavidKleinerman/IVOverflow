module.exports = errorBuilder = (message, code, data, next) => {
  const error = new Error(message);
  error.statusCode = code;
  error.data = data;
  next(error);
};
