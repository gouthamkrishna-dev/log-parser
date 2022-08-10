const express = require("express");
const multer = require("multer");
const app = express();
const fs = require("fs");
const cors = require("cors");
const timestamp = require("unix-timestamp");
const { storage } = require("./storage-multer");

app.use(cors());

const upload = multer({ storage });

const { postFunction } = require("./post-function");

app.post("/upload", upload.single("files"), postFunction);

app.listen(3001, console.log("successful"));
