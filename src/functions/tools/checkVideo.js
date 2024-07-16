const Parser = require('rss-parser');
const psr = new Parser();
const fs = require("fs")

module.exports = (client) => {

    client.checkVideo = async () => {
        //const data = await psr.parseURL(
       //     'https://youtube.com/feeds/videos.xml?channel_id=UC7DJBz4y9ptwlSitP72Eq5w').catch(console.error);

        //const rawData = fs.readFileSync(`${__dirname}/../../json/video.json`);
       // console.log(rawData, data)
    };
    

};