import { ACCESS_TOKEN, CURRENTPLAYING } from '../helpful/env-smooth';

import request from 'request';

export default function getPlayerState() {

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

          if (!error && response.statusCode === 200) {
               // console.log("PLAYER STATE -> ", body.is_playing);
   
               return body.is_playing;
          } else {
               console.log("ERROR PLAYER STATE -> ", error);
          }

     });

}

// Path: src\spotify\endpoints\get_current_track.js