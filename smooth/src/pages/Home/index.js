import React from "react";

import "./../../_config/musicplayer-api";

function Home() {
  return (
    <body onLoad={onPageLoading()}>
      <button onClick={requestAuthorization()}>
        Request access to spotify
      </button>
    </body>
  );
}

export default Home;
