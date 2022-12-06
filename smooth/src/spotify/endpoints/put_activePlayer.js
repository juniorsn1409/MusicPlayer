import { ACCESS_TOKEN } from '../helpful/env-smooth';


import request from 'request';

export function putActivePlayer() {

    //  const token = localStorage.getItem(ACCESS_TOKEN);
     const url = `https://api.spotify.com/v1/me/player`;
 
 
     const devices_id = {
 
       "id": " ",
       "is_active": true,
       "is_private_session": false,
       "is_restricted": false,
       "name": "My fridge",
       "type": "Computer",
       "volume_percent": 50
     };
 
 
     const options = {
       url: url,
      //  body: devices_id,
       headers: {
        
       },
     }
 
     request.put(url, options, function (error, response, body) {
 
       if (!error && response.statusCode === 200) {
           console.log("ACTIVE -> ", body);
       } else {
           console.log("ERROR ACTIVE -> ", error);
           console.log("ERROR ACTIVE RESPONSE -> ", response);
           console.log("ERROR ACTIVE BODY -> ", body);
       }
 
     }
       ,
     );
}

// Path: src\spotify\endpoints\put_activePlayer.js