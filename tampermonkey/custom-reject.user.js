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
    }
    rejectForm.appendChild(nameBtn);

    let featBtn = document.createElement('button');
    featBtn.innerText = 'Not a Feat';
    featBtn.classList.add('button');
    featBtn.onclick = function() {
        document.querySelector('#field-homebrew-rejection').value = 2;
        document.querySelector('#field-notes').value = `Do not submit feats that are not actually feats. If your items are meant to replicate blessings, curses, race features, class features, etc. You are welcome to use these privately, but they will not be allowed as published feats.`;
    }
    rejectForm.appendChild(featBtn);

    let mistakeBtn = document.createElement('button');
    mistakeBtn.innerText = 'Not Complete';
    mistakeBtn.classList.add('button');
    mistakeBtn.onclick = function() {
        document.querySelector('#field-homebrew-rejection').value = 2;
        document.querySelector('#field-notes').value = `You can use the "Create New Version" button to fix it after it has been published. You do not need to report your homebrew to make changes.`;
        return false;
    }
    rejectForm.appendChild(mistakeBtn);

    let publishBtn = document.createElement('button');
    publishBtn.innerText = 'Didn\'t Mean to Publish';
    publishBtn.classList.add('button');
    publishBtn.onclick = function() {
        document.querySelector('#field-homebrew-rejection').value = 2;
        document.querySelector('#field-notes').value = `The confirmation box that appears when you publish is meant to be read, not ignored.`;
        return false;
    }
    rejectForm.appendChild(publishBtn);

    publishBtn = document.createElement('button');
    publishBtn.innerText = 'Unearthed Arcana';
    publishBtn.classList.add('button');
    publishBtn.onclick = function() {
        document.querySelector('#field-homebrew-rejection').value = 12;
    }
    rejectForm.appendChild(publishBtn);
})();
