// react dependencies

import React, { useEffect } from "react";

// spotify dependencies

import { useStateValue } from "../../_spotify/StateProvider";

// css dependencies

import "./index.css";


//components dependencies


export default function PlayerControl({ spotify }) {

  console.log(spotify)

  const [{ token, item, playing }, dispatch] = useStateValue();

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((response) => {
      console.log(response);

      dispatch({
        type: "SET_PLAYING",
        playing: response.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        item: response.item,
      });

      console.log(token)
      console.log(item)
      console.log(playing)
    });
  }, [spotify]);

  spotify.getTrack().then((response) => {
    dispatch({
      type: "",
      track: response.track,
    })
  })


  return (
    <div>
      player control
    </div>
  );
}