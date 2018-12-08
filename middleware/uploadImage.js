const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const keys = require('../config/dev_keys');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

const s3 = new aws.S3({
  accessKeyId: keys.awsIdKey,
  secretAccessKey: keys.awsSecretKey,
  region: keys.awsRegion,
});

const fileFilter = (req, file, cb) => {
  const isValid = MIME_TYPE_MAP[file.mimetype];
  if (!isValid) {
    let error = new Error('Invalid mime type');
    cb(error, false);
  }
  cb(null, true);
};

// TODO: add other storage for user avatars
const storage = multerS3({
  s3,
  bucket: keys.awsBucket,
  metadata: function(req, file, cb) {
    cb(null, {fieldName: file.fieldname});
  },
  key: function(req, file, cb) {
    const name = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-');
    // cb(null, name + '-' + Date.now() + '.' + ext);
    cb(null, Date.now().toString() + '-' + name);
  },
});

module.exports = multer({
  fileFilter,
  storage,
}).single('image');

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
