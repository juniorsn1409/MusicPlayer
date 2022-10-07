// import here React Denpendencies
import {BrowserRouter, Routes, Route} from 'react-router-dom'; // npm install react-router-dom

// import here components

// import here screens

import Home from './../screens/Home';
import Error404 from './../screens/Error404';

// function below

export default function RouterApp() {
     return(
          <BrowserRouter>
               <Routes>
               <Route path="/" element={<Home/>}/>
               <Route path="*" element={<Error404/>}/>
               </Routes>
          </BrowserRouter>
     );
}