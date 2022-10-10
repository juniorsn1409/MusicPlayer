import React from "react"

// _spotify api

import spotify from'./../../_spotify/spotify';

//components

import Loading from "./../../components/Loading";

//functions

export default function RequestAuthorization() { 
     return (
          <div>
               <Loading></Loading>
               {spotify.RequestAuthorization()}
          </div>
     );
}