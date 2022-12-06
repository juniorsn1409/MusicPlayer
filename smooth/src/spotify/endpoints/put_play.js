import { ACCESS_TOKEN } from '../helpful/env-smooth';

// import putActivePlayer from './put_activePlayer.js';


import request from 'request';

export default async function putPlay() {

     const token = localStorage.getItem(ACCESS_TOKEN);
     const url = `https://api.spotify.com/v1/me/player/play`;

     const options = {
          url: url,
          headers: {
               'Authorization': 'Bearer ' + token,
               'Content-Type': 'application/json',
               'Content-Length': '116',
          },
     }

     request.put(url, options, function (error, response, body) {

          if (!error && response.statusCode === 200) {
               console.log("PLAY -> ", body);
          } else {
               console.log("ERROR PLAY -> ", error);
               console.log("ERROR PLAY RESPONSE -> ", response.statusCode);
               console.log("ERROR PLAY BODY -> ", body);
          }

     });
}

// Path: src\spotify\endpoints\put_play.js