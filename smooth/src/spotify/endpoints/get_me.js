import { ACCESS_TOKEN, ME } from './../helpful/env-smooth';


import request from 'request';

export const getMe = () => {

     const token = localStorage.getItem(ACCESS_TOKEN);
     const url = ME;

     const options = {
          url: url,
          headers: {
               'Authorization': 'Bearer ' + token,
               'content-type': 'application/json',
          },
          json: true
     };

     request.get(options, function (error, response, body) {
          console.log("GET-ME -> ", body.id);
          return body.id;
     });

}

// Path: src\spotify\endpoints\get_me.js