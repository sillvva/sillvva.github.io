// ==UserScript==
// @name         D&D Beyond Tweaks
// @namespace    http://dndbeyond.com/
// @version      1.0.3
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

if (inPages(/\/characters\/\d+/)) {
  addStyle(`
    [data-testid="inspiration"][aria-checked="true"] {
      box-shadow: 0px 0px 57px 3px rgba(255, 246, 145, 0.9), 0px 0px 13px -3px rgba(255, 247, 247, 0.9);
    }
  `);
}