const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudConfig');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', 
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'], 
    },
});

const upload = multer({ 
    storage: storage 
}).fields([{ name: 'growth_images', maxCount: 10 }]); 

module.exports = { upload };
