import { ACCESS_TOKEN, PAUSE } from '../helpful/env-smooth';

import request from 'request';

export default async function putPause() {

     const token = localStorage.getItem(ACCESS_TOKEN);
     const url = PAUSE;
 
     const options = {
       url: url,
       headers: {
         'Authorization': 'Bearer ' + token,
         'content-type': 'application/json',
       },
       json: true
     };
 
     request.put(options, function (error, response, body) {
 
       if (!error && response.statusCode === 200) {
         console.log("PAUSE -> ", body);
       } else {
         console.log("ERROR PAUSE -> ", error);
         console.log("ERROR PAUSE RESPONSE -> ", response.statusCode);
         console.log("ERROR PAUSE BODY -> ", body);
       }
 
     }
     );

}

// Path: src\spotify\endpoints\get_me.js