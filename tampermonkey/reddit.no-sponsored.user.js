// ==UserScript==
// @name         Hide Posts on Reddit
// @description  Hide Posts on Reddit
// @namespace    http://tampermonkey.net/
// @version      1.0
// @author       matt.dekok@gmail.com
// @match        https://www.reddit.com
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/arrive/2.4.1/arrive.min.js
// ==/UserScript==

const checkAndHide = (article) => {
    console.log('Hiding a post');
    article.style.display='none';
};

const start = async () => {
    try {
        console.log('Start TamperMonkey Script')

        document.arrive('.promotedlink', function() { checkAndHide(this); });
        document.querySelectorAll('.promotedlink').forEach((article) => { checkAndHide(article) });
    } catch (err) {
        console.error('TamperMonkey Script Error:', err);
    }
};

start();
