const express = require('express');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const storagePref = multer.diskStorage({
    destination: 'public/uploads',
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

//middleware
const multerInfo = 
app.use(multer({
    storage: storagePref,
    dest: 'public/uploads',
    limits: {fileSize: 1000000},
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(path.extname(file.originalname));
        if (mimeType && extName) {
            return cb(null, true);
        }
        cb('Error: tipo de archivo no valido');
    }
}).single('fileImg'));

module.exports = multerInfo;