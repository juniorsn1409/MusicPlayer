// react dependencies

import React, { useState, useEffect } from "react";

// bootstrapped dependencies

import { Container } from 'react-bootstrap';

// spotify dependencies

import { getTokenFromLocation } from './../../spotify/location-smooth'

// other dependencies

import request from 'request';

import "./index.css";

export default function Home() {

  const [searchInput, setSearchInput] = useState("");
  const token = getTokenFromLocation();

  async function search() {

    var url = `https://api.spotify.com/v1/search?q=${searchInput}&type=track,artist,album,playlist`;

    const options = {
      url: url,
      headers: {
        'Authorization': 'Bearer ' + token,
        'content-type': 'application/json',
      },
      json: true
    };

    request.get(options, function (error, response, body) {
      console.log("SEARCH -> ", body);

      console.log("SEARCH -> ", body.tracks.items[0].id);
      console.log("SEARCH -> ", body.tracks.items[0].name);
    }
    );
  }

  return (

    <Container className="home-container">
      <input type="text" placeholder="Search for Songs"

        onKeyDownCapture={event => {
          setSearchInput(inputKeyPress(event));

          if (event.key === 'Enter') {
            search();
          }

        }}

      />
    </Container>




  );

}


function inputKeyPress(event) {
  if (event.key === 'Enter') {
    console.log('inputKeyPress ->' + event.target.value);
  }

  return event.target.value;
}