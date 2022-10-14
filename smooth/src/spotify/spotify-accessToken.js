
import { TOKEN, REDIRECT_URI, CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN, REFRESH_TOKEN } from './env-smooth';

import { useState, useEffect } from 'react';

import { setCookie, getCookie } from './cookie-smooth';

const stateKey = 'spotify_auth_state';

export const getAccesToken = () => {

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