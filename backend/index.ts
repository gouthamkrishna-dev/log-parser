const express = require("express");
import multer, { FileFilterCallback } from "multer";
const app = express();
const cors = require("cors");
const path = require("path");
const { storage } = require("./storage-multer");

app.use(cors());


const upload = multer({
  storage,
  fileFilter: function (
    req: Express.Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) {
    if (path.extname(file.originalname) !== ".txt") {
      return cb(new Error("Only text files are allowed"));
    }

    cb(null, true);
  },
});

const { postFunction } = require("./post-function");

app.post("/upload", upload.single("files"), postFunction);

app.listen(3001, console.log("successful"));
