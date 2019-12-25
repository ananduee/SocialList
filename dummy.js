require("@babel/register"); // For transforming javascript on the fly
const mirchi = require("./src/jobs/mirchi");

async function doWork() {
  const songs = await mirchi.getTop20Songs();
  console.log("songs", JSON.stringify(songs));
  return null;
}

doWork();
