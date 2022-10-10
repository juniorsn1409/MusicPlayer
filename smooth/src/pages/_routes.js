// react dependencies

import { BrowserRouter, Routes, Route } from 'react-router-dom'; // npm install react-router-dom

// spotify dependencies

import spotify from './../_spotify/spotify';

//screens dependencies

import Home from './../screens/Home';
import Error404 from './../screens/Error404';
import RequestAuthorization from '../screens/RequestAuthorization';

//components

export default function RouterApp() {   
     return (
          
          <BrowserRouter>
               <Routes>
                    {spotify.RequesToken()}
                    {spotify.OnPageLoading()}
                    <Route path="/" element={<RequestAuthorization />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="*" element={<Error404 />} />
               </Routes>
          </BrowserRouter>
     );
}