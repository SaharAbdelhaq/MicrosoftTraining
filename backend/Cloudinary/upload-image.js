const cloudinary = require('./CloudinaryConnection');

function uploadImage(imagePath) {
    return new Promise(function (resolve, reject) {
        cloudinary.uploader.upload(imagePath, function (error, result) {
            if (error) {
                console.log("Error uploading image:");
                reject(error);
            } else {
                console.log("Image uploaded successfully:");
                resolve({ result, url: result.url });
            }
        });
    });
}
module.exports = {
    uploadImage: uploadImage
};
