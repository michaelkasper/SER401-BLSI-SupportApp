/**
 * Created by Michael Kasper - mkasper
 */
class JsonModel {
    constructor(response) {
        this.response = response;
    }

    render(res) {
        res.status(200);
        res.send(JSON.stringify(this.response));
    }
}

module.exports = JsonModel;
