import { TOKEN, REDIRECT_URI, CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN, REFRESH_TOKEN, EXPIRES_IN } from './../helpful/env-smooth';

import { getExpirationTime } from './../helpful/getExpirationTime'; 

import request from 'request';
import Buffer from 'Buffer';

export const getAccesToken = () => {

    const code = getCode();
    const expirationToken = getExpirationTime();

    if (expirationToken < Date.now()) {

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

                // console.log("RESPONSE -> ", response);
                // console.log("BODY -> ", body);
                // console.log("ERROR -> ", error);

                var expirationToken = body.expires_in + Date.now();

                localStorage.setItem(ACCESS_TOKEN, body.access_token);
                localStorage.setItem(REFRESH_TOKEN, body.refresh_token);
                localStorage.setItem(EXPIRES_IN, expirationToken);
                window.history.pushState({}, null,'/home')

            } else {
                console.log(error);
            }
        });
    } else {
        console.log("Token is still valid");
        window.history.pushState({}, null,'/home')
    }
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

