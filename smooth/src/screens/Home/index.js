// react dependencies

import React, { useState, useEffect } from "react";

import request from 'request';

// spotify dependencies
// import { defaultApi } from "./../../spotify/spotify-consumingEndpoint";

// css dependencies

import "./index.css";

//components dependencies

const token = localStorage.getItem('access_token');
const search = 'metalica';

const options = {
  url: `https://api.spotify.com/v1/search?q=${search}&type=track&include_external=audio`,
  headers: {
    'Authorization': 'Bearer ' + token,
    'content-type': 'application/json',
  },
  json: true
};

export default function Home() {

  request.get(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body);

    } else {
      console.log(error);
    }
  });

  return (
    <div className="home">
      <h1>Search Page</h1>

      <div className="search">
        <input type="text" placeholder="Search for Songs" />
        <button> Search </button>
      </div>
      <br /><br />
      <div className="search-results">

      </div>

    </div>
  );

}