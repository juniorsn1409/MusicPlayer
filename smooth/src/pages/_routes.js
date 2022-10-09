//react denpendencies

import {BrowserRouter, Routes, Route} from 'react-router-dom'; // npm install react-router-dom

// spotify dependencies

import spotify from'./../_spotify/server';

//components



//screens

import RequestAuthorization from '../screens/RequestAuthorization';
import Home from './../screens/Home';
import Error404 from './../screens/Error404';

// function below

export default function RouterApp() {
     return(
          <BrowserRouter>
               {spotify.OnPageLoading()}
               <Routes>
               <Route path="/" element={<RequestAuthorization/>}/>
               <Route path="/home" element={<Home/>}/>
               <Route path="*" element={<Error404/>}/>
               </Routes>
          </BrowserRouter>
     );
}