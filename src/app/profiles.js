module.exports = async (req, res) => {
    const occ = require('./helpers/occ');
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

    let profilesObj = [ profilesOcc.items ];
    console.log("Total de contatos", profilesOcc.totalResults);

    // faz as requisições com os demais offsets e os armazena em array.
    let tempProfiles;
    for (let i = 250; i <= profilesOcc.totalResults; i += 250) {
        tempProfiles = await occ.accounts(loginOcc.access_token, i);
        profilesObj.push(tempProfiles.items);
        console.log("offset: " + i);
    }    

    // estrutura o obj de forma mais adequada para ser exportado
    let profiles = [];
    for (let i = 0; i < profilesObj.length; i++) {
        for (let j = 0; j < profilesObj[i].length; j++) {
            profiles.push(profilesObj[i][j]);
        }
        
    }
    res.send(profiles);
}