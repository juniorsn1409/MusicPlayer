
import { ACCESS_TOKEN } from '../helpful/env-smooth';


import request from 'request';

export const getSearch = (input) => {

     const token = localStorage.getItem(ACCESS_TOKEN);
     const url = `https://api.spotify.com/v1/search?q=${input}&type=track,artist,album,playlist`;

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
               console.log("GET-SEARCH -> ", body);
               return body.tracks.items;
          } else {
               console.log("ERROR GET-SEARCH -> ", error);
          }
          
     });

}

// Path: src\spotify\endpoints\get_search.js