const generateJWT = require("./generate-jwt");
const googleVerify = require("./google.verify");
const uploadFile = require("./upload-file");

module.exports = {
  ...generateJWT,
  ...googleVerify,
  ...uploadFile,
};
