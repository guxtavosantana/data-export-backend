module.exports = (app) => {
    app.get('/accounts', require('../app/accounts'));
}