import { AUTHORIZE, REDIRECT_URI, CLIENT_ID } from './env-smooth';

import { setCookie } from './cookie-smooth';

import querystring from 'querystring'; // npm install querystring

const stateKey = 'spotify_auth_state';


export const getRequest = () => {

     const state = generateRamdonString(16);
     setCookie(stateKey, state, 7);

     const scope = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played user-top-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private';

     const queryParams = querystring.stringify({
          client_id: CLIENT_ID,
          response_type: 'code',
          redirect_uri: REDIRECT_URI,
          state: state,
          scope: scope,
     });

     const url = AUTHORIZE + '?' + queryParams;

     console.log(url);

     window.location.href = url;
}

// helpfull functions

const generateRamdonString = (length) => {
     let text = '';
     const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

     for (let i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
     }
     return text;
}