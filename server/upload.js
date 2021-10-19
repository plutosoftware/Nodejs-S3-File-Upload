require("dotenv").config();
const aws = require("aws-sdk");

const s3Config = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    Bucket: "node-file-upload-poc",
});

const uploadFile = (uploadParams) =>
    s3Config.upload(uploadParams, (err, data) => {
        if (err) {
            return false;
        }
        return true;
    });

module.exports = uploadFile;
