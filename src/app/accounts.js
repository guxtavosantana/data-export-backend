module.exports = async (req, res) => {
    const occ = require('./helpers/occ');
    const loginOcc = await occ.login();
    // console.log(loginOcc.error);
    if (loginOcc.error) {
        res.status(loginOcc.error.status).send(loginOcc.error);
        return;
    }

    res.send('logado');
    console.log('logado');
}