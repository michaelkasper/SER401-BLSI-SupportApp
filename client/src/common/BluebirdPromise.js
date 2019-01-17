import BluebirdPromise from "bluebird";

BluebirdPromise.config({cancellation: true});

export default BluebirdPromise;