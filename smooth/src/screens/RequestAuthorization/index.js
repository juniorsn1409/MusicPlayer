import React from "react"

// _spotify api

import spotify from'./../../_spotify/server';

//components


//functions

export default function RequestAuthorization() { 
     return (
          <div>
               {spotify.RequestAuthorization() }
          </div>
     )
}