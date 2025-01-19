const multer = require("multer");

const errorHandler = (err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res
        .status(500)
        .send({ success: false, message: err.message, errorDetails: err });
    } else {
      res
        .status(500)
        .send({ success: false, message: err.message, errorDetails: err });
    }
  } else {
    res.send("Somthing want worng");
  }
};
module.exports = errorHandler;
