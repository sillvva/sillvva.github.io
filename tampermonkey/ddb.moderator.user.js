// ==UserScript==
// @name         D&D Beyond Homebrew Moderator
// @namespace    http://dndbeyond.com/
// @version      2.8
// @description  Adds extra moderator options and links
// @author       Stormknight (modified by Sillvva)
// @match        https://www.dndbeyond.com/homebrew/*
// @match        https://www.dndbeyond.com/magic-items/*
// @match        https://www.dndbeyond.com/spells/*
// @match        https://www.dndbeyond.com/monsters/*
// @match        https://www.dndbeyond.com/feats/*
// @match        https://www.dndbeyond.com/backgrounds/*
// @match        https://www.dndbeyond.com/races/*
// @match        https://www.dndbeyond.com/subraces/*
// @match        https://www.dndbeyond.com/subclasses/*
// @match        https://www.dndbeyond.com/equipment/*
// @grant        none
// ==/UserScript==

// example full url for homebrew rejection
// https://www.dndbeyond.com/cp/homebrew/reject?entityTypeId=112130694&id=11938
// requires two parameters:
// - entityTypeId
// - id

let itvl = [];

(function() {
    'use strict';
    // Set the page background so we know it's working - replace this later
    // document.body.style.background = "#ff0000";

    var pathArray; // Used any time we need to explode a path.

    if (window.location.pathname.startsWith("/homebrew/")) {
        var listRows = document.querySelectorAll('.list-row');
        for(let i = 0; i < listRows.length; i++) {
            listRows[i].onclick = function(ev) {
                let type = this.dataset.type;
                const slug = this.dataset.slug;
                const nodeName = `[data-slug="${slug}"] + .more-info`;
                itvl[nodeName] = setInterval(() => {
                    addRejectButton(nodeName);
                }, 200);
                setTimeout(() => {
                    if (itvl[nodeName]) {
                        clearInterval(itvl[nodeName]);
                        delete itvl[nodeName];
                    }
                }, 5000);
            };
        }
    }
    // ADD AN "EDIT BUTTON" TO THE PAGE OF ALL MUNDANE EQUIPMENT.
    else if (window.location.pathname.startsWith("/equipment/")) {
        // Mundane equipment can be any of the following types, in terms of the edit URL (examples):
        //   /armor/half-plate/edit
        //   /weapons/longsword/edit
        //   /weapons/longsword/edit
        // To determine the correct edit URL, we examine the text in the TYPE field. If it is Armor, Weapon, or Other (adventuring-gear).
        // Get the txt from that part of the page. The div is named "details-container-content-description-text"
        var editUrl;
        var equipmentTypeField = document.getElementsByClassName("details-container-content-description-text")[0].children[0].innerText;
        if (equipmentTypeField.endsWith("Weapon")) {
            // This is a weapon
            editUrl = "https://www.dndbeyond.com/weapons/";
        } else if (equipmentTypeField.endsWith("Armor")) {
            // This is armor
            editUrl = "https://www.dndbeyond.com/armor/";
        } else {
            // This is adventuring-gear
            editUrl = "https://www.dndbeyond.com/adventuring-gear/";
        }
        var itemSlugPath = document.getElementsByClassName("b-breadcrumb-wrapper")[0].children[2].children[0].href;
        pathArray = itemSlugPath.split('/');
        editUrl = editUrl + pathArray[4] + '/edit';

        var SK_Breadcrumbs = document.getElementsByClassName('b-breadcrumb-wrapper')[0];

        // Create a new LI inside the header area
        var SK_editBreadcrumb = document.createElement('LI');
        SK_editBreadcrumb.className = "b-breadcrumb-item";
        SK_Breadcrumbs.appendChild(SK_editBreadcrumb);
        // Put a link inside that LI
        var SK_editLink = document.createElement('A');
        SK_editLink.setAttribute('href',editUrl);
        SK_editLink.innerHTML = '<span style="color:red">edit</span>';
        SK_editBreadcrumb.appendChild(SK_editLink);
    } else {
        addRejectButton("");
    }
})();

// ADD A "REJECT BUTTON" TO THE PAGE OF ALL PUBLISHED HOMEBREW
// Find the report button - this will only show on homebrew, so this is how we determine if homebrew!
function addRejectButton(nodeName) {
    if (nodeName) {
        const moreInfo = document.querySelector(nodeName);
        if (!moreInfo) return;
    }

    var reportButtonContainer = document.querySelector(`${nodeName} .report-button`);
    var rejectButtonExists = document.querySelector(`${nodeName} .reject-button`);

    if (reportButtonContainer && !rejectButtonExists) {
        if (nodeName.trim().length && itvl[nodeName]) {
            clearInterval(itvl[nodeName]);
            delete itvl[nodeName];
        }

        // and the parent footer container
        var FooterContainer = reportButtonContainer.parentNode;

        // Extract the data from the report button.
        // The elements of the explodedLink should be: 0:NULL / 3:reports / 4:create / 5:longID / 6:shortID
        var reportButtonLink = reportButtonContainer.children[0].href;
        var explodedLink = reportButtonLink.split('/');
        var rejectButtonLink = 'https://www.dndbeyond.com/cp/homebrew/reject?entityTypeId=' + explodedLink[5] + '&id=' + explodedLink[6];

        // Create a new DIV container to put the new button in
        var rejectButtonDiv = document.createElement("DIV");
        rejectButtonDiv.setAttribute('class', 'report-button');
        rejectButtonDiv.style = 'margin-left:10px;';
        FooterContainer.insertBefore(rejectButtonDiv, reportButtonContainer.nextSibling);

        // Create the new "Reject" button
        var rejectButton = document.createElement("A");
        rejectButton.setAttribute('class', 'reject-button');
        rejectButton.setAttribute('data-title', 'Reject this homebrew');
        rejectButton.setAttribute('target', '_blank');
        rejectButton.setAttribute('data-modal-width', 500);
        rejectButton.setAttribute('href', rejectButtonLink);
        rejectButton.style = 'background-color:red;';
        rejectButtonDiv.appendChild(rejectButton);

        // Add the div inside the link
        var rejectDiv = document.createElement("DIV");
        rejectDiv.setAttribute('class', 'report-button-inner');
        rejectButton.appendChild(rejectDiv);

        // Add the I and span into the div
        var rejectDivI = document.createElement("I");
        rejectDivI.setAttribute('class', 'fa-flag');
        rejectDiv.appendChild(rejectDivI);
        var rejectDivSpan = document.createElement("SPAN");
        rejectDivSpan.innerText = 'Reject';
        rejectDiv.appendChild(rejectDivSpan);

        // New bit - gonna make the username into a hyperlink.

        //Get the user-id number from this: <div class="rating-up " data-user-id="101850578">
        var userIdTag = document.querySelector(`${nodeName} .rating-up`);
        var userID = userIdTag.getAttribute("data-user-id");
        // Extract the user-id from that tag.
        var userNameTag = document.querySelector(`${nodeName} .source-description`);
        var userName = userNameTag.innerText;
        var userProfileURL = "https://www.dndbeyond.com/members/" + userName;
        var userCPURL = "https://www.dndbeyond.com/cp/users/"+userID+"-"+userName+"/edit";

        // Now we want a link to view all homebrew from this user.
        var userHomebrewURL = "https://www.dndbeyond.com/cp/homebrew/approved?filter-author=" + userName + "&filter-author-previous=" + userName + "&filter-author-symbol=" + userID + "&filter-type=&filter-name=";
        // Change the contents of the userNameTag
        userNameTag.innerHTML = "<a href=\"" + userProfileURL + "\" target=\"_blank\">" + userName + "'s profile</a> [<a href=\""+userCPURL+"\" target=\"_blank\">CP</a>]<br /><a href=\"" + userHomebrewURL + "\" target=\"_blank\">View user's other homebrew</a>";
        userNameTag.children[0].style.color = "#47D18C";
        userNameTag.children[1].style.color = "#F1474C";
        userNameTag.children[3].style.color = "#23b5e1";
        userNameTag.style.textAlign = "right";
    }
}
