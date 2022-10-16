// react dependencies

import React from "react";

// css dependencies

import "./index.css";

// spotify dependencies

import { getMe } from "./../../spotify/endpoint_me";

//components dependencies


export default function Home() {
  return (
    
      getMe()
    
  );
}