import { ACCESS_TOKEN, CURRENTPLAYING } from './../helpful/env-smooth';


import request from 'request';

export function getCurrentTrack() {

     const token = localStorage.getItem(ACCESS_TOKEN);
     const url = CURRENTPLAYING;

     const options = {
          url: url,
          headers: {
               'Authorization': 'Bearer ' + token,
               'content-type': 'application/json',
          },
          json: true
     };

     request.get(options, function (error, response, body) {
          console.log("CURRENT PLAYING -> ", body);
          return body.id;
     });

}

// Path: src\spotify\endpoints\get_current_track.js