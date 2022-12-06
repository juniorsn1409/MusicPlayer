import querystring from 'querystring';

import { setCookie } from '../helpful/cookie-smooth';
import { generateRamdonString } from '../helpful/generateRamdonString';
import { AUTHORIZE, REDIRECT_URI, CLIENT_ID } from '../helpful/env-smooth';

const stateKey = 'spotify_auth_state';

export const getRequest = () => {

     const state = generateRamdonString(16);
     setCookie(stateKey, state, 7);

     const scope = 'ugc-image-upload user-read-playback-state app-remote-control user-modify-playback-state playlist-read-private user-follow-modify playlist-read-collaborative user-follow-read user-read-currently-playing user-read-playback-position user-library-modify playlist-modify-private playlist-modify-public user-read-email user-top-read streaming user-read-recently-played user-read-private user-library-read';

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
