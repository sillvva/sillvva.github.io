// ==UserScript==
// @name         D&D Beyond: In-Report Reject Button
// @namespace    https://www.dndbeyond.com/
// @version      0.3
// @description  Adds extra moderator options and links
// @author       Sillvva
// @updateURL    https://sillvva.github.io/tampermonkey/ddb.in-report.reject.button.js
// @downloadURL  https://sillvva.github.io/tampermonkey/ddb.in-report.reject.button.js
// @match        https://www.dndbeyond.com/cp/reports/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const link = document.querySelector('.report-details header.h2 h2 a[target="_blank"]');
    const linkContainer = document.querySelector('.report-details header.h2 h2');

    if (link) {
        const explodedLink = link.getAttribute('href').split('/');
        const entityTypeId = ({
            'backgrounds': 1669830167,
            'classes': 789467139,
            'feats': 1088085227,
            'magic-items': 112130694,
            'monsters': 779871897,
            'races': 1743923279,
            'spells': 1118725998,
            'subclasses': 789467139,
            'subraces': 1228963568
        })[explodedLink[1]];

        if (entityTypeId) {
            const id = explodedLink[2].split('-')[0];

            var rejectButtonLink = 'https://www.dndbeyond.com/cp/homebrew/reject?entityTypeId=' + entityTypeId + '&id=' + id;


            var rejectButton = document.createElement("A");
            rejectButton.setAttribute('target', '_blank');
            rejectButton.setAttribute('href', rejectButtonLink);
            rejectButton.style = 'background-color: red; color: white; font-size: 14px; display: inline-flex; align-items: center; justify-content: center; border-radius: 4px; width: 70px; height: 35px; margin-top: -6px; float: left; margin-right: 10px; text-decoration: none;';
            rejectButton.innerHTML = 'Reject';
            linkContainer.appendChild(rejectButton);
        }
    }
})();
