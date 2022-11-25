// react dependencies

import React from 'react';

// css dependencies

import "./index.css";

// spotify dependencies



//components dependencies


export default function Loading() {
  return (
    <div>
      <ui-loader></ui-loader>
    </div>
  );
}

// jet:#333232

// ligth cyan:#DEFFFC

// medium state blue: #707CEB

// cornflower blue orange red crayola: #EF767A

const template = `
	<style>
		:host {
			--size: 40px;
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background-color: #333232;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.isometric {
			position: relative;
			transform: rotateX(55deg) rotateZ(-45deg) translate(calc(var(--size) * -2), 0);
			margin-bottom: calc(3 * var(--size));
		}
		.box {
			position: absolute;
			width: var(--size);
			height: var(--size);
			background: #707CEB;
			animation: slide .9s cubic-bezier(.65,.53,.59,.93) infinite;
		}
		.box:before, .box:after {
			content: "";
			position: absolute;
			width: 100%;
			height: 100%;
		}
		.box:before {
			background: #889DFC;
			transform: skew(0deg, -45deg);
			right: 100%;
			top: 50%;
		}
		.box:after {
			background: #DEFFFC;
			transform: skew(-45deg, 0deg);
			top: 100%;
			right: 50%;
		}
		.box:nth-child(1) {
			--sx: 50%;
			--sy: -50%;
			--ex: 150%;
			--ey: 50%;
		}
		.box:nth-child(2) {
			--sx: -50%;
			--sy: -50%;
			--ex: 50%;
			--ey: -50%;
		}
		.box:nth-child(3) {
			--sx: 150%;
			--sy: 50%;
			--ex: 50%;
			--ey: 50%;
		}
		.box:nth-child(4) {
			--sx: 50%;
			--sy: 50%;
			--ex: -50%;
			--ey: -50%;
		}
		h1 {
			color: #DEFFFC;
		}
		span {
			color: transparent;
			position: relative;
		}
		span:before {
			content: ".";
			position: absolute;
			bottom: -2px;
			color: #DEFFFC;
			margin-left: 1px;
			animation: load 1.5s linear infinite;
			display: inline-block;
		}
		@keyframes slide {
			0% {
				transform: translate(var(--sx), var(--sy));
			}
			65% {
				transform: translate(var(--ex), var(--sy));
			}
			95%, 100% {
				transform: translate(var(--ex), var(--ey));
			}
		}
		@keyframes load {
			20% {
				content: ".";
			}
			40% {
				content: "..";
			}
			80%, 100% {
				content: "...";
			}
		}
	</style>
	<div class="isometric">
		<div class="box"></div>
		<div class="box"></div>
		<div class="box"></div>
		<div class="box"></div>
	</div>
	<h1>Loading<span>...</span></h1>
`;

customElements.define(
	"ui-loader",
	class extends HTMLElement {
		connectedCallback() {
			this.attachShadow({ mode: "open" });
			this.shadowRoot.innerHTML = template;
		}
	}
);