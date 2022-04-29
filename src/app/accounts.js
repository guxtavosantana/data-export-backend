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

    let accountsObj = [ accountsOcc.items ];
    console.log("Total de contas", accountsOcc.totalResults);
    
    // faz as requisições com os demais offsets e os armazena em array.
    let tempAccounts;
    for (let i = 250; i <= accountsOcc.totalResults; i += 250) {
        tempAccounts = await occ.accounts(loginOcc.access_token, i);
        accountsObj.push(tempAccounts.items);
        console.log("offset: " + i);
    }

    // estrutura o obj de forma mais adequada para ser exportado
    let accounts = [];
    for (let i = 0; i < accountsObj.length; i++) {
        for (let j = 0; j < accountsObj[i].length; j++) {
            accounts.push(accountsObj[i][j]);
        }
        
    }
    res.send(accounts);
}