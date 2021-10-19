const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const uploadFile = require("./upload");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/upload", upload.single("file"), (req, res) => {
    const uploadParams = {
        Bucket: "node-file-upload-poc",
        Key: "bata/" + req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        ACL: "public-read",
    };

    if (uploadFile(uploadParams)) {
        res.status(200).send("OK");
    } else {
        res.status(400).send("Error");
    }
});

app.listen(8020, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected");
    }
});
