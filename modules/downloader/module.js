const path = require('path');
const fs = require('fs');
const got = require('got');
const moment = require('moment');

exports.run = (url, directory) => {
    return new Promise((resolve, reject) => {
        let filename = moment().format('YYYY-MM-DD_HH-mm-ss') + '.mp4';
        let filepath = path.join(directory, filename);
        let writeStream = fs.createWriteStream(filepath);
        got
        .stream(url, {
            headers: {
                'referer': 'https://www.tiktok.com/',
                'user-agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36'
            }
        })
        .pipe(writeStream);
        resolve({
            fullpath: filepath,
            filename: filename
        });
    }); 
}