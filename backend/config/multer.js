const multer = require("multer");
const path = require("path");

// Storage Configuration
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "backend/uploads/");
    },

    filename: function (req, file, cb) {

        const uniqueName = Date.now() + path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

// File Filter
const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpeg|jpg|png|webp/;

    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Only Images Allowed"));
    }

};

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;