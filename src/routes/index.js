module.exports = (app) => {
    app.get('/accounts', require('../app/accounts'));
    app.get('/profiles', require('../app/profiles'));
}