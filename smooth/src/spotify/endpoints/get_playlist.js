
import { ACCESS_TOKEN } from '../helpful/env-smooth';
import { getMe } from './get_me';

import request from 'request';

export const getPlaylist = (id) => {

     const token = localStorage.getItem(ACCESS_TOKEN);

     const url = `https://api.spotify.com/v1/users/${id}/playlists`;

     const options = {
          url: url,
          headers: {
               'Authorization': 'Bearer ' + token,
               'content-type': 'application/json',
          },
          json: true
     };

     request.get(options, function (error, response, body) {

          if (!error && response.statusCode === 200) {
               console.log("GET-PLAYLIST -> ", body);
               return body;
          } else {
               console.log("ERROR GET-PLAYLIST -> ", error);
          }

     });

}

// Path: src\spotify\endpoints\get_playlist.js