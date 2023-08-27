const multer = require("multer");

const storage = multer.memoryStorage();

// For uploading single image

const singleUpload = multer({ 
    storage,
    limits: { fileSize: 4 * 1024 * 1024 }
}).single("file");

// For uploading multiple files

const multipleUpload = multer({ 
    storage,
    limits: { fileSize: 4 * 1024 * 1024 }
}).array("files");

module.exports = {
    singleUpload,
    multipleUpload
}