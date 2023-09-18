const validateDB = require("./db-validators");
const validateFields = require("./validate-fields");
const validateFile = require("./validate-file");
const validateJWT = require("./validate-jwt");
const validateRole = require("./validate-role");

module.exports = {
  ...validateDB,
  ...validateFields,
  ...validateFile,
  ...validateJWT,
  ...validateRole,
};
