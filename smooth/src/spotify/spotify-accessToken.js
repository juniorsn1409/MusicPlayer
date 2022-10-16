import { TOKEN, REDIRECT_URI, CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN, REFRESH_TOKEN } from './env-smooth';

import request from 'request';
import Buffer from 'Buffer';

export const getAccesToken = () => {

    const code = getCode();

    var authOptions = {
        url: TOKEN,
        headers: {
            'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')),

        },
        form: {
            'grant_type': 'authorization_code',
            'redirect_uri': REDIRECT_URI,
            'code': code,
        },
        json: true
    };


    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            console.log("RESPONSE -> ", response);
            console.log("BODY -> ", body);
            console.log("ERROR -> ", error);

            localStorage.setItem(ACCESS_TOKEN, body.access_token);
            localStorage.setItem(REFRESH_TOKEN, body.refresh_token);
        }
    });



}


// helpfull functions

export const getCode = () => {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    return code;
}

export const getState = () => {
    let state = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        state = urlParams.get('state')
    }
    return state;
}
