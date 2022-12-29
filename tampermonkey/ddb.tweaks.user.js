// ==UserScript==">
// @name         D&D Beyond Tweaks
// @namespace    http://dndbeyond.com/
// @version      0.31
// @description  Adds quality of life changes
// @author       Sillvva
// @updateURL    https://sillvva.github.io/tampermonkey/ddb.tweaks.user.js
// @downloadURL  https://sillvva.github.io/tampermonkey/ddb.tweaks.user.js
// @match        https://*.dndbeyond.com/*
// @grant        none
// ==/UserScript==

const ready = function() {
    var i;

    // Bulk Moderation Box Styles
    if (inPages(['/forums', '/posts', '/monsters', '/races'])) {
        const cbm = document.querySelector('.comment-bulk-moderation');
        if (cbm) cbm.style.position = 'sticky';
        if (cbm) cbm.style.width = '250px';
        if (cbm) cbm.style.marginLeft = 'auto';
        if (cbm) cbm.style.right = '0';
        if (cbm) cbm.style.bottom = '0';
        if (cbm) cbm.style.borderWidth = '0';

        const jas = document.querySelector('.comment-bulk-moderation .j-apply-selection');
        if (jas) jas.style.color = '#ffffff';

        const cbms = document.querySelector('.comment-bulk-moderation select');
        if (cbms) cbms.style.margin = '0';
        if (cbms) cbms.style.width = '100%';

        const cbmf = document.querySelector('.comment-bulk-moderation form');
        if (cbmf) cbmf.style.margin = '0';
    }

    /*if (inPages(['/sources', '/races', '/vecna', '/classes'])) {
        // For bookmarkable section headers, create a link that can be bookmarked
        const nodeList = document.querySelectorAll('.primary-content h1[id], .primary-content h2[id], .primary-content h3[id], .primary-content h4[id]');
        for (i = 0; i < nodeList.length; i++) {
            nodeList[i].innerHTML += '<a href="#'+nodeList[i].id+'" class="no-select" style="float: right;">Link</a>';
        }
    }*/

    if (inPages('/new-content')) {
        addStyle('.select2-container {' +
                 '    display: block;' +
                 '    width: 600px !important;' +
                 '}');
        setInterval(() => {
            const nodeList = document.querySelectorAll('.forum-thread-row a:not([target])');
            for (i = 0; i < nodeList.length; i++) {
                nodeList[i].setAttribute('target', '_blank');
            }
        }, 500);
    }

    if (inPages('/cp/users')) {
        const cb = document.querySelector('input#field-add-nickname-credit:not([disabled])');
        if (cb) cb.setAttribute("checked","checked");
    }

    if (!inPages(['/profile','/marketplace'])) {
        // Fixed Site Bar
        addStyle('.site-bar {' +
                 '    position: sticky;' +
                 '    z-index: 51000 !important;' +
                 '}');
        addStyle('#mega-menu-target {' +
                 '    position: sticky;' +
                 '    top: 64px;' +
                 '    z-index: 2000;' +
                 '}');
        addStyle('.sidebar-menu {' +
                 '    position: sticky !important;' +
                 '    top: 120px !important;'+
                 '    max-height: calc(100vh - 122px) !important;'+
                 '    overflow-y: auto !important;'+
                 '    overflow-x: hidden !important;'+
                 '}');
    }

    if (inPages(['/forums/d-d-beyond-general/bugs-support/65846-display-name-change-request-thread-v2'])) {
        setTimeout(() => {
            const posts = Array.from(document.querySelectorAll('li.p-comments'));
            const unread = posts.filter(post => !post.querySelectorAll('.comment-deleted').length && !post.querySelectorAll('.comment-deleted-with-note').length && !post.querySelectorAll('.public-message').length);
            if (unread[0]) {
                const id = unread[0].querySelector('.forum-post').id;
                jump(id);
            }
            else {
                const nextExists = !!document.querySelector('.b-pagination-item-next');
                if (nextExists && confirm('No unread found. Jump to next page?')) {
                    const urlParams = new URLSearchParams(location.search.slice(1));
                    const currPage = urlParams.get('page');
                    const nextPage = parseInt(currPage) + 1;
                    location.href = location.href.replace(location.search, '?page='+nextPage);
                }
                else {
                    window.scrollTo(0,document.body.scrollHeight - 1600);
                }
            }
        }, 1000);
    }

    /*setTimeout(function() {
        document.querySelectorAll('body:not(.body-rpgcharacter-sheet) img').forEach(img => {
            let match = false;
            if (img.width <= 5 && img.height <= 5) match = true;
            else if (img.style.display == "none") match = true;
            else if (img.style.visibility == "hidden") match = true;

            if (!match) return;
            img.style.display = "block";
            img.style.visibility = "relative";
            img.style.position = "static";
            img.style.minWidth = "100px";
            img.style.minHeight = "100px";
            img.style.border = "5px solid #f00";
        });
    }, 500);*/

    if (inPages(['/forum'])) {
        document.querySelectorAll('.forum-post.comment-user').forEach(post => {
            const container = document.createElement('span');
            container.classList.add('p-comment-actions');
            container.style = 'float: right;'

            const actions = document.createElement('span');
            actions.classList.add('user-actions');
            actions.style = 'background: transparent !important;';
            container.appendChild(actions);

            const usernameLink = post.querySelector('.j-comment-username a');
            const username = usernameLink.innerText;

            let user;
            if (user = usernameLink.querySelector('.user')) {
                user.style = 'max-width: 85%';
            }

            const manageUserLink = document.createElement('a');
            manageUserLink.href = `/cp/users/${post.dataset.surrogateId}/edit#t1:moderate`;
            manageUserLink.target = '_blank';
            manageUserLink.innerHTML = '<i class="u-icon u-icon-edit"></i>';
            manageUserLink.style = 'display: inline-flex;';
            manageUserLink.classList.add('user-action');
            manageUserLink.title = 'Manage User';
            actions.appendChild(manageUserLink);

            insertAfter(usernameLink, container);
        });
    }

    document.querySelectorAll('.magic-item-tooltip').forEach(mi => {
        mi.after(" (magic item)");
    });

    document.body.onhashchange = ev => {
        const id = window.location.hash.slice(1);
        const header = document.getElementById(id);
        const headerPosition = header.getBoundingClientRect().top;
        if (headerPosition < 120) {
            window.scrollTo(0, window.pageYOffset - 120);
        }
    };
};

var parseURL = function(url) {
    var parser = document.createElement('a'),
        searchObject = {},
        queries, split, i;
    // Let the browser do the work
    parser.href = url;
    // Convert query string to object
    queries = parser.search.replace(/^\?/, '').split('&');
    if (parser.search.length > 0) {
        for (i = 0; i < queries.length; i++) {
            split = queries[i].split('=');
            searchObject[split[0]] = split[1];
        }
    }
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash
    };
};

const addStyle = function(newStyle) {
    var styleElement = document.getElementById('styles_js');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'styles_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
};

const inPages = function(pages) {
    var url = parseURL(window.location.href);
    if (pages instanceof Array) {
        for(var i = 0; i < pages.length; i++) {
            if (url.pathname.indexOf(pages[i]) === 0) return true;
        }
        return false;
    }
    else if (typeof pages === 'string') {
        return url.pathname.indexOf(pages) === 0;
    }
};

const insertAfter = function(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

const jump = function(h) {
    location.href = "#"+h;
}

ready();
