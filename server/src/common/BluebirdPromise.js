var BluebirdPromise = require('bluebird');


BluebirdPromise.config({cancellation: true});

module.exports = BluebirdPromise;