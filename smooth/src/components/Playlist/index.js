// react dependencies

import React from 'react';

// other dependencies


//spotify dependencies


// css dependencies

import "./index.css";
import "./../base.css";

// =================================================================== //

export default function Plalist({desc}) {
  return (
    <div className="playlist">
      {desc}
    </div>
  );
}