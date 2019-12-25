require("@babel/register"); // For transforming javascript on the fly
const fs = require("fs");
const express = require("express");
const ViewStream = require("./src/views/ViewStream");
const log = require("./src/core/log");

const app = express();
log.initializeLogger();
app.use(log.expressMiddleware());

const port = 3000;

const baseViewText = fs.readFileSync("dist/index.html").toString();
const baseViewTextParts = baseViewText.split("not rendered");

app.get("/", (req, res) => {
  res.write(baseViewTextParts[0]);
  const viewStream = ViewStream.get();
  viewStream.pipe(res, { end: false });
  viewStream.on("end", () => {
    res.write(baseViewTextParts[1]);
    res.end();
  });
});
app.use("/dist", express.static("dist"));

app.listen(port, () =>
  console.log(`SocialList app listening on port ${port}!`)
);
