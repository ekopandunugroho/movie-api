const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Simpan file di folder 'uploads'
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + ' ' + Date.now() + path.extname(file.originalname)); // Nama file yang di-upload
  },
});


const filefilter = (req, file, cb) => {
    if(
        file.mimetype === 'photo/jpg' ||
        file.mimetype === 'photo/png' ||
        file.mimetype === 'photo/jpeg'
    ){
        cb(null, true);
    } else {
        cb(null, false);
    }
}



const upload = multer({ storage: storage });

module.exports = upload;