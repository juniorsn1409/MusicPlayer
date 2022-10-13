// react dependencies

import { BrowserRouter, Routes, Route } from 'react-router-dom'; // npm install react-router-dom

// spotify dependencies

import { getToken, spotifyAuth } from './../spotify/spotify'; // npm install axios querystring

//screens dependencies

import Error404 from './../screens/Error404';
import Home from './../screens/Home';
import RequestAuthorization from '../screens/ResquestAuthorization';

//components

export default function RouterApp() {
     return (

          <BrowserRouter>
               {getToken()}
               <Routes>
                    <Route path="/" element={<RequestAuthorization />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="*" element={<Error404 />} />
               </Routes>
          </BrowserRouter>
     );
}