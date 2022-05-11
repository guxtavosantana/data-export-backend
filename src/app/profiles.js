module.exports = async (req, res) => {
    const occ = require('./utils/occ');
    const loginOcc = await occ.login();

    if (loginOcc.error) {
        res.status(loginOcc.error.status).send(loginOcc.error);
        return;
    }
   
    const profilesOcc = await occ.profiles(loginOcc.access_token);

    if (profilesOcc.error) {
        res.status(profilesOcc.error.status).send(profilesOcc.error);
        return;
    }

    let profiles = [];
    console.log("Total de contatos", profilesOcc.totalResults);

    // faz as requisições com os offsets e os armazena no array.
    for (let i = 250; i <= 1000; i += 250) {
        let { items } = await occ.profiles(loginOcc.access_token, i);
        profiles.push(...items);
        console.log("offset: " + i);
    }    

    res.send(profiles);
}