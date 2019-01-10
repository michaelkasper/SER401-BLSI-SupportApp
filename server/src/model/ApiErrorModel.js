/**
 * Created by Michael Kasper - mkasper
 */
class ApiErrorModel {
    constructor(code, message) {
        this.code    = code;
        this.message = message;
    }

    render(res) {
        res.statusMessage = this.message;
        res.status(this.code);
        res.end();
    }
}

module.exports = ApiErrorModel;
