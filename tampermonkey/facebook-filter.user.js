// ==UserScript==
// @name         Hide Posts on Facebook
// @description  Hide Posts on Facebook
// @namespace    http://tampermonkey.net/
// @version      1.1
// @author       matt.dekok@gmail.com
// @match        https://www.facebook.com
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/arrive/2.4.1/arrive.min.js
// ==/UserScript==

const filters = [
    /sponsored/g,
    /\b(nfl|nhl|nba)\b/g,
    /football|basketball|baseball|hockey/g
];

const isFiltered = (article) => {
    let text = [];

    article.querySelectorAll('a[href="#"]').forEach((link) => {
        text.push(link.text.replace(/-/g,"").toLowerCase());
    });

    article.querySelectorAll('[role="button"]').forEach((link) => {
        text.push(link.innerText.replace(/-/g,"").toLowerCase());
    });

    article.querySelectorAll('[role="link"]').forEach((link) => {
        text.push(link.text.toLowerCase());
    });

    article.querySelectorAll('[data-ad-preview="message"]').forEach((link) => {
        text.push(link.innerText.toLowerCase());
    });

    return !!text.find(t => !!filters.find(f => f.test(t)));
};

const checkAndHide = (article) => {
    if (isFiltered(article)) {
        console.log('Hiding a post');
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
