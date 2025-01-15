// ==UserScript==
// @name         D&D Beyond Tweaks
// @namespace    http://dndbeyond.com/
// @version      1.0.1
// @description  Adds extra tweaks for D&D Beyond
// @supportURL   https://github.com/sillvva/sillvva.github.io/tree/main/tampermonkey
// @downloadURL  https://sillvva.github.io/tampermonkey/ddbtweaks.user.js
// @updateURL  	 https://sillvva.github.io/tampermonkey/ddbtweaks.user.js
// @require      https://sillvva.github.io/tampermonkey/shared.js
// @run-at       document-body
// @author       Sillvva
// @match        https://www.dndbeyond.com/*
// @grant        none
// ==/UserScript==

document.querySelectorAll(".magic-item-tooltip").forEach((mi) => {
  mi.after(" (magic item)");
});