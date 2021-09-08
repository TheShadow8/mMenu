const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const fileFilter = (req, file, cb) => {
  const isValid = MIME_TYPE_MAP[file.mimetype];
  if (!isValid) {
    let error = new Error("Invalid mime type");
    cb(error, false);
  }
  cb(null, true);
};

// TODO: add other storage for user avatars
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    // cb(null, name + '-' + Date.now() + '.' + ext);
    cb(null, Date.now().toString() + "-" + name);
  },
});

module.exports = multer({
  fileFilter,
  storage,
}).single("image");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const isValid = MIME_TYPE_MAP[file.mimetype];
//     let error = new Error('Invalid mime type');
//     if (isValid) {
//       error = null;
//     }
//     cb(error, 'images');
//   },
//   filename: (req, file, cb) => {
//     const name = file.originalname
//       .toLowerCase()
//       .split(' ')
//       .join('-');
//     console.log(req);
//     const ext = MIME_TYPE_MAP[file.mimetype];
//     // cb(null, name + '-' + Date.now() + '.' + ext);
//     cb(null, Date.now() + '-' + name);
//   },
// });
