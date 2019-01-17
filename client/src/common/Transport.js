import axios from 'axios'
import BluebirdPromise from "./BluebirdPromise";

export default class Transport {
    http;

    constructor() {
        this.http = axios.create({
            header: {
                'Accept'      : 'application/json',
                'Content-Type': 'application/json'
            }
        });

    }

    get(url, query) {
        return this.buildRequest(this.http.get(url, {
            params: query
        })).then(res => {
            return res.data;
        });
    }

    post(url, data = null) {
        return this.buildRequest(this.http.post(url, data));
    }

    patch(url, data = null) {
        return this.buildRequest(this.http.patch(url, data));
    }


    buildRequest(request) {
        request.catch(err => {
            // valid if we forgot our token, or token expired. will set our
            // user to require a LoginForm and handle elsewhere
            if (!err.response) {
                return {error: err.toString(), status: 410};
            }


            if (err.response.status) {
                // if it's a 3, 4 or 500, report - we shouldn't get too many
                // of these legitimately
                let statusPre = err.response.status.toString().substr(0, 1);
                if (statusPre === '3'
                    || statusPre === '4'
                    || statusPre === '5') {

                    return {error: err.response.data, status: err.response.status};
                }
            }
            return err;
        });


        return new BluebirdPromise(function (resolve, reject) {
            request
                .then((res, err) => {
                    return (err) ? reject(err) : resolve(res);
                })
                .catch((error) => {
                    return reject(error);
                });
        });
    }
}

