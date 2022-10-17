import { ACCESS_TOKEN } from './env-smooth';


import request from 'request';

export const defaultApi = (endpoint) => {

     const token = localStorage.getItem(ACCESS_TOKEN);

     const options = {
          url: `https://api.spotify.com/v1/${endpoint}`,
          headers: {
               'Authorization': 'Bearer ' + token,
               'content-type': 'application/json',
          },
          json: true
     };

     request.get(options, function (error, response, body) {
          if (!error && response.statusCode === 200) {
               const date = JSON.stringify(body);
               
          } else {
               console.log(error);
          }
     });

}