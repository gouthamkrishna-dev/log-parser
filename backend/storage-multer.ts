export {};
const multer = require("multer");
type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void


const storage = multer.diskStorage({
    destination: (req:Express.Request, file:Express.Multer.File, cb:DestinationCallback) => {
      cb(null, "upload");
    },
    filename: (req:Express.Request, file:Express.Multer.File, cb:FileNameCallback) => {
      const { originalname } = file;
      cb(null, originalname);
    },
    
  });
  module.exports={
    storage
  }