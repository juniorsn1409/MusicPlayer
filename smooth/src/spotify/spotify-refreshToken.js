import { TOKEN, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, ACCESS_TOKEN, REFRESH_TOKEN } from './env-smooth';


import request from 'request';
import Buffer from 'Buffer';

export const getRefreshToken = () => {

     const refresh_token = getToken();

     var authOptions = {
          url: 'https://accounts.spotify.com/api/token',
          headers: {
               'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
          },
          form: {
               grant_type: 'refresh_token',
               refresh_token: refresh_token
          },
          json: true
     };


     request.post(authOptions, function (error, response, body) {
          if (!error && response.statusCode === 200) {

               console.log("RT RESPONSE -> ", response);
               console.log("RT BODY -> ", body);
               console.log("RT ERROR -> ", error);

               localStorage.setItem(ACCESS_TOKEN, body.access_token);
               localStorage.setItem(REFRESH_TOKEN, body.refresh_token);
          }
     });

}


// helpfull functions

export const getToken = () => {
  
     const refresh_token = localStorage.getItem(REFRESH_TOKEN);
     console.log("REFRESH_TOKEN -> ", refresh_token);

     return refresh_token;

 }