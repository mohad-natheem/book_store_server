const multer = require('multer');
const fs = require("fs")
let uploadPath = '';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        uploadPath = 'public/images/';
        } else if (file.mimetype === 'application/pdf') {
        uploadPath = 'public/books/';
        } else {
        return cb(new Error('File type not supported!'), false);
        }
        if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});
var uploadFile = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "application/pdf" || file.mimetype == "application/x-pdf") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg .jpeg and .pdf format allowed!'));
        }
    }
});

module.exports = {
    uploadFile
}