# tkdl-nightmare
TikTok Video Downloader without deciphering any urls. This downloader using a headless browser.

## Installation

`$ npm install --save git+https://github.com/mh4ck/tkdl-nightmare.git`

## Usage

Start requesting the Video info
```javascript
const tkdlNightmare = require("tkdl-nightmare");
tkdlNightmare.info('[TikTok URL]').then((info) => {
// info
}).catch((err) => console.log)
```

After you got the info you can use it to download the file
```javascript
const tkdlNightmare = require("tkdl-nightmare");
tkdlNightmare.info('[YouTubeID]').then((videoUrl) => {
  // info
  tkdlNightmare.downloadFromInfo(videoUrl, __dirname).then((fileObj) => {
    console.log("The video has been downloaded to: " + fileObj.fullpath);
  }).catch((err) => console.log)
}).catch((err) => console.log)
```

### Why is there no filename parameter?
Because we are not selecting any format and just using the format loaded initialy by YouTube. 
So we are not able to set the target file extension and just work with the format YouTube offers. 
