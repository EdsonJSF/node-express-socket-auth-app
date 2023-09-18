const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (
  files,
  validExtensions = ["gif", "jpeg", "jpg", "png", "svg", "webp"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const cutName = file.name.split(".");
    const fileExtension = cutName.at(-1).toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      return reject(`incorrect file extension ${fileExtension}`);
    }

    const temporalName = uuidv4() + "." + fileExtension;
    const uploadPath = path.join(
      __dirname,
      "../uploads/",
      folder,
      temporalName
    );

    file.mv(uploadPath, (err) => {
      if (err) return reject(err);

      return resolve(temporalName);
    });
  });
};

module.exports = {
  uploadFile,
};
