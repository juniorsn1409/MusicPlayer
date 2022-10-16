import { ACCESS_TOKEN } from './env-smooth';


import request from 'request';

export const getMe = () => {

     const token = localStorage.getItem(ACCESS_TOKEN);
     const url = 'https://api.spotify.com/v1/me';

     const options = {
          url: url,
          headers: {
               'Authorization': 'Bearer ' + token,
               'content-type': 'application/json',
          },
          json: true
     };

     request.get(options, function (error, response, body) {
          console.log(body);
     });

}