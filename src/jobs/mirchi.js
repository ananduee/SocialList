const axios = require("axios");
const cheerio = require("cheerio");

export async function getTop20Songs() {
  console.log("function invoked.")
  try {
    const response = await axios.get(
      "https://www.radiomirchi.com/more/mirchi-top-20/"
    );
    const html = response.data;
    const $ = cheerio.load(html);
    const topBlocks = $(".top01");
    var songs = [];
    topBlocks.each((_, topBlock) => {
      var song = {};
      song.title = $("h2", topBlock).text();
      const albumAndArtist = $("h3", topBlock).text();
      song.album = albumAndArtist.split("\n")[0];
      song.rank = $(".circle", topBlock).text();
      songs.push(song);
    });
    return songs;
  } catch (err) {
    console.log("failed to get data", err);
    throw err;
  }
}
