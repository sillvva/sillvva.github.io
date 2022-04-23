// ==UserScript==
// @name         Hide Sponsored Posts on Facebook
// @description  Hide Sponsored Posts on Facebook
// @namespace    http://tampermonkey.net/
// @version      1.0
// @author       matt.dekok@gmail.com
// @match        https://www.facebook.com
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/arrive/2.4.1/arrive.min.js
// ==/UserScript==

const isSponsored = (article) => {
    let text = [];

    article.querySelectorAll('a[href="#"]').forEach((link) => {
        text.push(link.text.replace(/-/g,"").toLowerCase());
    });

    article.querySelectorAll('[role="button"]').forEach((link) => {
        text.push(link.innerText.replace(/-/g,"").toLowerCase());
    });

    return text.find(t => t.includes('sponsored'));
};

const checkAndHide = (article) => {
    if (isSponsored(article)) {
        console.log('Hiding a sponsored post');
        article.style.display='none';
    }
};

const start = async () => {
    try {
        console.log('Start TamperMonkey Script')

        document.arrive('[role=article]', function () { checkAndHide(this) });
        document.querySelectorAll('[role=article]').forEach((article) => { checkAndHide(article) });
    } catch (err) {
        console.error('TamperMonkey Script Error:', err);
    }
};

start();
