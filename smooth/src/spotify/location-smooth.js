import {ACCESS_TOKEN, REFRESH_TOKEN } from './env-smooth';


export const getTokenFromLocation = () => {
  
     const access_token = localStorage.getItem(ACCESS_TOKEN);
     console.log("ACCESS_TOKEN -> ", access_token);

     return access_token;

 }


 export const getRefreshTokenFromLocation = () => {
  
     const refresh_token = localStorage.getItem(REFRESH_TOKEN);
     console.log("REFRESH_TOKEN -> ", refresh_token);

     return refresh_token;

 }