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
      paths: {
        userData: `${__dirname}/sessions`,
      },
      webPreferences: {
        partition: 'persist:tiktok',
        contextIsolation: false,
      },
    };

    config = { ...config, ...initialconfig };

    let nightmare = new Nightmare(config);

    nightmare
        .goto(url)
        .wait('div[data-e2e="feed-video"]')
        .evaluate(() => {
          let videoUrl = document.querySelector('div[data-e2e="feed-video"] video').getAttribute('src');
          let anchor = document.createElement('a');
          anchor.href = videoUrl;
          anchor.download = '';
          anchor.id = 'download-anchor';
          document.querySelector('body').appendChild(anchor);
          return videoUrl;
        })
        .then((videoUrl) => {
          if (typeof videoUrl == 'undefined' || videoUrl == null) {
            reject(new Error(`No video url found.`))
            nightmare
              .end()
              .then(() => {})
              .catch(() => {});
            return;
          }

          resolve(videoUrl)
          nightmare
            .end()
            .then(() => {})
            .catch(() => {});
        }).catch(reject);
    });
}