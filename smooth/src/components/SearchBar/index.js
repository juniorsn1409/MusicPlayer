// react dependencies

import React, {useState} from 'react';

// other dependencies

import request from 'request';

//spotify dependencies

import { getTokenFromLocation } from './../../spotify/location-smooth'

// css dependencies

import "./index.css";
import "./../base.css";

// =================================================================== //

export default function SearchBar() {

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

      if (!error && response.statusCode === 200) {

        console.log("SEARCH -> ", body);
        console.log("SEARCH -> ", body.tracks.items[0].id);
        console.log("SEARCH -> ", body.tracks.items[0].name);

        response.body.tracks.items.forEach(element => {
          console.log("MUSICA -> ", element.name);
        });
      } else {
        console.log(error);
      }
    }
    );
  }

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search"

        onKeyDownCapture={event => {
          setSearchInput(inputKeyPress(event));

          if (event.key === 'Enter') {
            search();
          }

        }}

      />
    </div>
  );
}


function inputKeyPress(event) {
  if (event.key === 'Enter') {
    console.log('inputKeyPress ->' + event.target.value);
  }

  return event.target.value;
}