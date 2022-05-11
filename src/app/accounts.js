module.exports = async (req, res) => {
    const occ = require('./utils/occ');
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

    let accounts = [];
    console.log("Total de contas", accountsOcc.totalResults);
    
    // faz as requisições com os offsets e os armazena no array.
    for (let i = 250; i <= accountsOcc.totalResults; i += 250) {
        let { items } = await occ.accounts(loginOcc.access_token, i);
        accounts.push(...items);
        console.log("offset: " + i);
    }

    res.send(accounts);
}