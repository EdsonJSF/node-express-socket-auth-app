const { response, request } = require("express");

const validateFile = (req = request, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      msg: "No files were uploaded.",
      errors: [],
    });
  }

  if (!req.files.file) {
    return res.status(400).json({
      msg: "You have some request errors",
      errors: [
        {
          type: "field",
          msg: "Invalid file",
          path: "file",
          location: "body",
        },
      ],
    });
  }

  next();
};

module.exports = {
  validateFile
}