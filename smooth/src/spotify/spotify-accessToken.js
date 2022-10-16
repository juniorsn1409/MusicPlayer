import { TOKEN, REDIRECT_URI, CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN } from './env-smooth';

import { useState, useEffect } from 'react';

import { setCookie, getCookie } from './cookie-smooth';

// import SpotifyWebApi from 'spotify-web-api-js';

import querystring from 'querystring';
import request from 'request';
import Buffer from 'Buffer';
import axios from 'axios';

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

            localStorage.setItem(ACCESS_TOKEN, body.access_token);
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
