import querystring from 'querystring';

import { setCookie } from '../helpful/cookie-smooth';
import { generateRamdonString } from '../helpful/generateRamdonString';
import { AUTHORIZE, REDIRECT_URI, CLIENT_ID } from '../helpful/env-smooth';

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
