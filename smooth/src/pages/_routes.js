// react dependencies
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // npm install react-router-dom

// spotify dependencies

import { getAccesToken } from '../spotify/spotify-accessToken';
import { getRefreshToken } from '../spotify/spotify-refreshToken';  

//screens dependencies

import Error404 from './../screens/Error404';
import Home from './../screens/Home';
import RequestAuthorization from '../screens/ResquestAuthorization';

//components

export default function RouterApp() {
     return (

          <BrowserRouter>
               {getAccesToken()}
               {getRefreshToken()}
               <Routes>
                    <Route path="/" element={<RequestAuthorization />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="*" element={<Error404 />} />
               </Routes>
          </BrowserRouter>
     );
}