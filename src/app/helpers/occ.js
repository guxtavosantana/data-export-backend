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

    return axios(loginRequest)
    .then((response) => {
        return response.data;
    }).catch((error) => {
        return {error: error.response.data}
    });
}