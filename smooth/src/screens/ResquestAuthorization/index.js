// react dependencies

import React from "react";

// _spotify api

import {request} from "./../../spotify/spotify-request";

//components

import Loading from "../../components/Loading";

export default function RequestAuthorization() {
     return (
          <div>
               <Loading></Loading>
               {request()}
          </div>
     );
}