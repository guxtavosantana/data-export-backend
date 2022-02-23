module.exports = async (req, res) => {
    const occ = require('./helpers/occ');
    const loginOcc = await occ.login();

    if (loginOcc.error) {
        res.status(loginOcc.error.status).send(loginOcc.error);
        return;
    }

    const accountsOcc = await occ.accounts(loginOcc.access_token);

    if (accountsOcc.error) {
        res.status(accountsOcc.error.status).send(accountsOcc.error);
        return;
    }

    res.send(accountsOcc);
}