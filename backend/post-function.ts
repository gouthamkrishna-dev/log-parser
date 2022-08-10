export {};
const fs = require("fs");
const timestamp = require("unix-timestamp");

const postFunction = (req: any, res: any) => {
    
  if (!req.file.originalname.includes("txt")) {
    res.status(400).json({
      status: "error",
    });
  }
  const textFile = fs
    .readFileSync(`upload/${req.file.originalname}`)
    .toString();
  const { transactionId } = JSON.parse(
    textFile
      .split("-")
      .slice(4, textFile.length - 1)
      .join("")
  );

  fs.writeFileSync(
    `jsonfiles/${req.file.originalname}.json`,
    JSON.stringify([
      {
        timestamp: timestamp.now().toString(),
        loglevel: textFile.split("-")[3].trim(),
        transactionId: transactionId,
        err: "not found",
      },
    ])
  );
  res.download(`jsonfiles/${req.file.originalname}.json`);
};
module.exports = {
  postFunction,
};
