import { AUTHORIZE, TOKEN, PLAYLISTS, DEVICES, PLAY, PAUSE, NEXT, PREVIOUS, PLAYER, TRACKS, CURRENTLYPLAYING, SHUFFLE } from './env-smooth';
import { REDIRECT_URI, CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN, REFRESH_TOKEN } from './env-smooth';

import { useState, useEffect } from 'react';

import axios from 'axios';
import buffer from 'Buffer';
import querystring from 'querystring';

import { setCookie } from './cookie-smooth';

const stateKey = 'spotify_auth_state';

// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const request = () => {

     const state = generateRamdonString(16);
     setCookie(stateKey, state, 7);

     const scope = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played user-top-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private';

     const queryParams = querystring.stringify({
          client_id: CLIENT_ID,
          response_type: 'code',
          redirect_uri: REDIRECT_URI,
          state: state,
          scope: scope,
     });

     window.location.href = `${AUTHORIZE}?${queryParams}`;
}

// export const getToken = () => {

//      const code = getCode();
//      const state = getState();

//      console.log("code -> ", code);
//      console.log("state -> ", state);


//      if (code && state) {
//           const queryParams = querystring.stringify({
//                grant_type: 'authorization_code',
//                code: code,
//                redirect_uri: REDIRECT_URI,
//           });

//           // const authorization = `Basic ${buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`;

//           axios({
//                method: 'post',
//                url: TOKEN,
//                data: queryParams,
//                headers: {
//                     'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                }
//           }).then((response) => {
//                ACCESS_TOKEN = response.data.access_token;
//                REFRESH_TOKEN = response.data.refresh_token;

//                setCookie('access_token', ACCESS_TOKEN, 7);
//                setCookie('refresh_token', REFRESH_TOKEN, 7);

//                window.location.href = '/home';
//           }).catch((error) => {
//                console.log(error);
//                // alert('Error: ' + error);
//           });
//      }
// }

export const getToken = () => {
     const code = getCode();

     axios({

          method: 'post',
          url: TOKEN,
          data: querystring.stringify({
               grant_type: 'authorization_code',
               code: code,
               redirect_uri: REDIRECT_URI,
          }),
          headers: {
               'content-type': 'application/x-www-form-urlencoded',
               Authorization: `Basic ${buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
               'Access-Control-Allow-Origin': '*',
               'Access-Control-Allow-Headers': '*',
               'Access-Control-Allow-Credentials': 'true',
          },

     }).then((response) => {
          if (response.status === 200) {
               setCookie(ACCESS_TOKEN, response.data.access_token, 7);
               setCookie(REFRESH_TOKEN, response.data.refresh_token, 7);
               // window.location.href = '/home';
               console.log(response.data);
          } else {
               // window.location.href = '/';
               console.log(response.data);
          }
     }).catch((error) => {
          console.log(error);
          // alert('Error: ' + error);
     });

     window.history.pushState("", "", REDIRECT_URI);
}

// helpfull functions

const generateRamdonString = (length) => {
     let text = '';
     const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

     for (let i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
     }
     return text;
}

export const getCode = () => {
     let code = null;
     const queryString = window.location.search;
     if (queryString.length > 0) {
          const urlParams = new URLSearchParams(queryString);
          code = urlParams.get('code')
     }
     return code;
}

export const getState = () => {
     let state = null;
     const queryString = window.location.search;
     if (queryString.length > 0) {
          const urlParams = new URLSearchParams(queryString);
          state = urlParams.get('state')
     }
     return state;
}

export const spotifyAuth = () => {
     var headers = {
          'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
     }

     var body = new URLSearchParams({
          "code": getCode(),
          "redirect_uri": REDIRECT_URI,
          "grant_type": "authorization_code"
     }).toString();

     ajax("POST", TOKEN, headers, body)
          .then(function (resp) {
               console.log(resp);
          })
}

function ajax(request, url, headers, data) {
     var promise = new Promise((resolve, reject) => {
          var xmlHttp = new XMLHttpRequest();
          xmlHttp.withCredentials = true;
          xmlHttp.onreadystatechange = function () {
               if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    resolve(xmlHttp.responseText);
               } else {
                    reject(xmlHttp.responseText);
               }
          }
          xmlHttp.open(request, url);
          for (var key in headers) {
               if (headers.hasOwnProperty(key)) {
                    xmlHttp.setRequestHeader(key, headers[key]);
               }
          }
          xmlHttp.send(data);
     });
     return promise;
}