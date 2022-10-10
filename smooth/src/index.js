// react dependencies

import React from "react";
import ReactDOM from "react-dom/client";

// spotify dependencies

import reducer, { initialState } from './_spotify/Reducer';
import { StateProvider } from "./_spotify/StateProvider";

//pages dependencies

import App from "./pages/_app";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
     <React.StrictMode>
          <StateProvider initialState={initialState} reducer={reducer}>
               <App />
          </StateProvider>
     </React.StrictMode>
);
