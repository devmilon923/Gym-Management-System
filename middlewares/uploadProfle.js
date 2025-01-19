const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/profile/");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const fileName = `${
      file.originalname.split(".")[0]
    }.${Date.now()}${extension}`;
    cb(null, fileName);
  },
});

const uploadProfile = multer({
  storage: storage,
  limits: {
    fileSize: 2000000, // size 2MB
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file!"));
    }
  },
});
module.exports = uploadProfile;
