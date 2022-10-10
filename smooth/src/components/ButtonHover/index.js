// react dependencies

import React from 'react';

// css dependencies

// import "./index.css";

// spotify dependencies



//components dependencies


export default function ButtonHover() {
  return (
    <button className="learn-more">
      <span className="circle" aria-hidden="true">
        <span className="icon arrow"></span>
      </span>
      <span className="button-text">
        request authorization
      </span>
    </button>
  );
}
