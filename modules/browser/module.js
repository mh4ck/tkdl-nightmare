const Nightmare = require('nightmare');
let config = {};

/**
 * Set the config for the nightmare instances
 * @param {Object} cfg
 */
exports.config = (cfg) => {
  config = { ...config, ...cfg };
};

exports.get = (url) => {

  return new Promise((resolve, reject) => {

    let initialconfig = {
      show: false,
      switches: {
        "ignore-certificate-errors": true,
      },
      openDevTools: false,
      // paths: {
      //   userData: `${__dirname}/sessions`,
      // },
      // webPreferences: {
      //   partition: 'persist:tiktok',
      //   contextIsolation: false,
      // },
    };

    config = { ...config, ...initialconfig };

    let nightmare = new Nightmare(config);

    nightmare
        .goto(url)
        .wait('div[data-e2e="feed-video"]')
        .wait(3000)
        .evaluate(() => {
          let videoElm = document.querySelector('div[data-e2e="feed-video"] video');
          if(videoElm == null) {
            return {};
          }
          let videoUrl = videoElm.getAttribute('src');
          let anchor = document.createElement('a');
          anchor.href = videoUrl;
          anchor.download = '';
          anchor.id = 'download-anchor';
          document.querySelector('body').appendChild(anchor);
          let title = document.querySelector('title').innerText;
          let ogImageMeta = document.querySelector('meta[property="og:image"]');
          let ogImage = (ogImageMeta)?document.querySelector('meta[property="og:image"]').getAttribute('content'): null;
          return {
            title: title,
            image: ogImage,
            video: videoUrl
          };
        })
        .then((info) => {
          if (typeof info.video == 'undefined' || info.video == null) {
            reject(new Error(`No video url found.`))
            nightmare
              .end()
              .then(() => {})
              .catch(() => {});
            return;
          }

          resolve(info)
          nightmare
            .end()
            .then(() => {})
            .catch(() => {});
        }).catch(reject);
    });
}