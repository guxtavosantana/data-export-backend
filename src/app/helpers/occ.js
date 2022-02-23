const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

module.exports.login = () => {
    const  data = qs.stringify({
        'grant_type': 'client_credentials' 
    });

    const loginRequest = {
        method: 'post',
        url: process.env.ADMIN_URL + '/ccadmin/v1/login',
        headers: {
            'Authorization': `Bearer ${process.env.APP_KEY}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    }

    return doRequest(loginRequest)
}


module.exports.accounts = (token, offset = 0, totalResults = 0) => {

    const accountsRequest = {
        method: 'get',
        url: process.env.ADMIN_URL + '/ccadmin/v1/organizations?offset=' + offset + '&fields=id,name,active',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    return doRequest(accountsRequest)
}

const doRequest = (request) => {
    
    return axios(request)
    .then((response) => {
        return response.data;
    }).catch((error) => {
        return {error: error.response.data}
    });
}