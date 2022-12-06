// react dependencies
import React, { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom'; // npm install react-router-dom

// spotify dependencies
// import { ACCESS_TOKEN } from '../spotify/helpful/env-smooth';

// import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";

import { getAccesToken } from '../spotify/authorization/accessToken';

//components dependencies


//screens dependencies

import Error404 from './../screens/Error404';
import Home from './../screens/Home';
import SuasMusicas from '../screens/SuasMusicas';
import RequestAuthorization from './../screens/ResquestAuthorization';

export default function RouterApp() {

     useEffect(() => {
          getAccesToken();
     }, []);

     return (

          <BrowserRouter>
               <Routes>
                    <Route path="/" element={<RequestAuthorization />} />
                    <Route path="/Buscar" element={<Home />} />
                    <Route path="/SuasMusicas" element={<SuasMusicas />} />
                    <Route path="*" element={<Error404 />} />
               </Routes>
          </BrowserRouter>
     );
}