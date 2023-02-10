// ==UserScript==
// @name         D&D Beyond: Homebrew Reject: Other Reasons
// @description
// @namespace    https://www.dndbeyond.com/
// @version      0.1
// @match        https://www.dndbeyond.com/cp/homebrew/reject*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const rejectForm = document.querySelector('#rejection-form');

    let nameBtn = document.createElement('button');
    nameBtn.innerText = 'Bad Name';
    nameBtn.classList.add('button');
    nameBtn.onclick = function() {
        document.querySelector('#field-homebrew-rejection').value = 2;
        document.querySelector('#field-notes').value = `Do not publish homebrew content with titles that contain non-English words, begin with a symbol, number, or "A [something]", contain offensive or inappropriate language, or consists of gibberish or random characters. You are welcome to use this privately.`;
        return false;
    }
    rejectForm.appendChild(nameBtn);

    let featBtn = document.createElement('button');
    featBtn.innerText = 'Not a Feat';
    featBtn.classList.add('button');
    featBtn.onclick = function() {
        document.querySelector('#field-homebrew-rejection').value = 2;
        document.querySelector('#field-notes').value = `Do not submit feats that are not actually feats. If your items are meant to replicate blessings, curses, race features, class features, etc. You are welcome to use these privately, but they will not be allowed as published feats.`;
        return false;
    }
    rejectForm.appendChild(featBtn);

    let mistakeBtn = document.createElement('button');
    mistakeBtn.innerText = 'Not Complete';
    mistakeBtn.classList.add('button');
    mistakeBtn.onclick = function() {
        document.querySelector('#field-homebrew-rejection').value = 2;
        document.querySelector('#field-notes').value = `If it is not complete, do not publish. If it is complete, you can use the "Create New Version" button to fix it after it has been published. You do not need to publish your homebrew to share with your campaigns.`;
        return false;
    }
    rejectForm.appendChild(mistakeBtn);
})();
