const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const trimExtension = (fileName) => {
  return fileName.split(".").slice(0, -1).join(".");
};

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "swapsies", // The name of the folder in cloudinary
  //added tags in take out if something breaks
  tags: "remote",
  allowedFormats: ["jpg", "png"],
  filename: (req, file, cb) => {
    cb(null, trimExtension(file.originalname)); // The file on cloudinary would have the same name as the original file name, and we trim the extension (because cloudinary appends it on top)
  },
});

// Cloudinary::Api.create_upload_preset(
//   :name => "my_preset",
//   :unsigned => true,
//   :tags => "remote",
//   :allowed_formats => "jpg,png")

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;
