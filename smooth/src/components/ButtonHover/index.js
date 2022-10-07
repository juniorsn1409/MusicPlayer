import React from "react";

import "./index.css";

export default function ButtonHover(text) {
  return (
    <button class="learn-more">
      <span class="circle" aria-hidden="true">
        <span class="icon arrow"></span>
      </span>
      <span class="button-text"> request access</span>
    </button>
  );
}
