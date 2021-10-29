// ==UserScript==">
// @name         D&D Beyond Content Editor
// @namespace    http://dndbeyond.com/
// @version      0.1
// @description  Adds extra content editor quality of life changes
// @author       Stormknight
// @updateURL    https://sillvva.github.io/tampermonkey/ddb.content.editor.js
// @downloadURL  https://sillvva.github.io/tampermonkey/ddb.content.editor.js
// @match        https://www.dndbeyond.com/cp/cms/pages/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    // Set the page background so we know it's working
    document.body.style.background = "#121212";

    // Note that we are using getElementsByClassName because getElementByID doesn't work (timing issue)

    // Main content area
    var TM_contentArea = document.getElementsByClassName("module cms cp page-form group")[0];
    TM_contentArea.style.backgroundColor = '#404040';
    TM_contentArea.style.color = '#ffffff';

    // Page title
    var TM_pageTitle = document.getElementsByClassName("full-width")[0];
    TM_pageTitle.style.backgroundColor = '#202020';
    TM_pageTitle.style.color = '#ffffff';

    // Page Slug
    var TM_pageSlug = document.getElementsByClassName("field-url-wrapper tabular group")[0];
    TM_pageSlug.children[3].style.backgroundColor = '#202020';
    TM_pageSlug.children[3].style.color = '#ffffff';
    TM_pageSlug.children[3].style.fontSize = 'small';
    TM_pageSlug.children[3].fontFamily = 'Source Code Pro Regular';
    TM_pageSlug.children[3].style.width = '360';

    // Change the size and format of the WYSIWYG text area - doesn't work so commented out.
    // This is the div that the iframe sits in
    // var TM_wysiwygEditor = document.getElementsByClassName("mce-edit-area mce-container mce-panel mce-stack-layout-item")[0];
    // TM_wysiwygEditor.children[0].height = '632px';

    // Change the size and format of the MARKUP text area.
    var TM_markupTextArea = document.getElementsByClassName("j-markup-editor")[0];
    TM_markupTextArea.style.backgroundColor = '#202020';
    TM_markupTextArea.style.color = '#ffffff';
    TM_markupTextArea.style.height = '632px';
    TM_markupTextArea.style.fontSize = 'small';
    TM_markupTextArea.style.fontFamily = 'Source Code Pro Regular';

    // Change the size and format of the CUSTOM CSS text area.
    var TM_cssDivArea = document.getElementsByClassName("form-field  form-field-text-area-field ")[0];
    var TM_cssTextArea = TM_cssDivArea.children[2];
    TM_cssTextArea.style.backgroundColor = '#202020';
    TM_cssTextArea.style.color = '#ffffff';
    TM_cssTextArea.style.fontSize = 'small';
    TM_cssTextArea.style.fontFamily = 'Source Code Pro Regular';

    // Top Save Button
    var TM_btnTopSave = document.getElementsByClassName("user-action b-userAction-item user-action-save-changes")[0];
    TM_btnTopSave.children[0].style.backgroundColor = '#80b080';

    // Footer Buttons
    var TM_btnSectionArea = document.getElementsByClassName("form-actions form-footer")[0];
    TM_btnSectionArea.children[0].style.backgroundColor = '#ff8080';
    TM_btnSectionArea.children[2].style.backgroundColor = '#80ff80';
})();
