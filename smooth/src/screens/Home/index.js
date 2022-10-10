// react dependencies

import React from "react";

// css dependencies

import "./index.css";

// spotify dependencies

import spotify from "./../../_spotify/spotify";

//components dependencies


export default function Home() {
  return (
    <div>
      {spotify.RefreshDevices()}
      smooth player music!
    </div>
  );
}