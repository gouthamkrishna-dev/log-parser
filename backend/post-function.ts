export {};
const fs = require("fs");
const timestamp = require("unix-timestamp");
let array = [];
const postFunction = (req: any, res: any) => {
  if (!req.file.originalname.includes("txt")) {
    res.status(400).json({
      status: "error",
    });
  }

  const textFile = fs
    .readFileSync(`upload/${req.file.originalname}`)
    .toString();
  textFile.split("}").map((textFiles) => {
    const data = textFiles + "}";
    if (!(data === "}")) {
      const { transactionId, details } = JSON.parse(
        ` ${data
          .split("-")
          .slice(4, textFile.length - 1)
          .join("")}
       `
      );
      textFiles = textFiles.toString("");
      array.push({
        timestamp: timestamp.now().toString(),
        loglevel: textFile.split("-")[3].trim(),
        transactionId: transactionId,
        err: details,
      });
    }
  });

  fs.writeFileSync(
    `jsonfiles/${req.file.originalname}.json`,
    JSON.stringify(array)
  );
  res.download(`jsonfiles/${req.file.originalname}.json`);
};
module.exports = {
  postFunction,
};
