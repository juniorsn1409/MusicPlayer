import React from "react";

import "./index.css";

// _spotify api

import RequestAuthorization from "../../_spotify/request_autorization";


//components

import ButtonHover from "./../../components/ButtonHover"

export default function Home() {
    return (
      <div>
        <RequestAuthorization/>
      </div>
      )
} 