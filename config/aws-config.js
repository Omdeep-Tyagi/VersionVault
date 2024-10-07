const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();

AWS.config.update({ region: "eu-north-1" });

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY, 
    secretAccessKey: process.env.SECRET_KEY
});

const S3_BUCKET = process.env.S3_BUCKET;

module.exports = { s3, S3_BUCKET };