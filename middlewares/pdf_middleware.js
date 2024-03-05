const multer = require('multer');

const DIR = './public/books/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        console.log("PDF");
        const fileName = Date.now() + file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});
var uploadPdf = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/pdf" || file.mimetype == "application/x-pdf") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .pdf format allowed!'));
        }
    }
});

module.exports = {
    uploadPdf
}