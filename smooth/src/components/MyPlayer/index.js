import React from "react";

import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";

import { ACCESS_TOKEN  } from '../../spotify/helpful/env-smooth';

export default function MyPlayer() {
  const getOAuthToken = localStorage.getItem(ACCESS_TOKEN);

  return (
    <WebPlaybackSDK
      deviceName="My Smooth App"
      getOAuthToken={getOAuthToken}
      volume={0.5}
      connectOnInitialized={true}>
    </WebPlaybackSDK>
  );
};