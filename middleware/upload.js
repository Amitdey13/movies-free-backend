const util = require("util");
const multer = require("multer");
const path = require("path");
const GridFsStorage = require("multer-gridfs-storage");

const thumbnail = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/thumbnail");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const video = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/video')
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

let uploadThumbnail = multer({
  storage: thumbnail,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("File type not supported");
    }
  },
}).single("thumbnail");

let uploadVideo = multer({
  storage: video,
  limits: { fileSize: 1024 * 1024 * 50 },
  fileFilter: function (req, file, cb) {
    const filetypes = /mp4/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("File type not supported");
    }
  },
}).single("video");

let uploadThumbnailFile = util.promisify(uploadThumbnail);
let uploadVideoFile = util.promisify(uploadVideo);
module.exports = {
  uploadThumbnailFile,
  uploadVideoFile,
};
