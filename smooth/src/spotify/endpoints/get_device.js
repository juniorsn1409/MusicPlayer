import { ACCESS_TOKEN, DEVICES } from '../helpful/env-smooth';


import request from 'request';

export function getDevices() {

     const token = localStorage.getItem(ACCESS_TOKEN);
     const url = DEVICES;
 
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
           return body.devices;
       } else {
         console.log("ERROR GET-DEVICES -> ", error);
       }
 
     });
}

// Path: src\spotify\endpoints\get_device.js