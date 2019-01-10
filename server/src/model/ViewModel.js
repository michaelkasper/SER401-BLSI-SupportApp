/**
 * Created by Michael Kasper - mkasper
 */
class ViewModel {
    constructor(view, data) {
        this.view = view;
        this.data = data;
    }

    render(res) {
        res.status(200);
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate');
        res.render(this.view, this.data);
    }
}

module.exports = ViewModel;
