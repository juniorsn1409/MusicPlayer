import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback"


export default function Player({acessToken, trackUri}){
    const [play, setPlay] = useState(false)

    useEffect(() => setPlay(true), [trackUri])
  
    if (!acessToken) return null
    return (
      <SpotifyPlayer
        token={acessToken}
        showSaveIcon
        callback={state => {
          if (!state.isPlaying) setPlay(false)
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
      />
    )
}